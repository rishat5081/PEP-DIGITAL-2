const router = require("express").Router(),
  fs = require("fs"),
  { Op } = require("sequelize"),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  { sequelize } = require("../../Configuration Files/Sequelize/Sequelize"),
  {
    multerFile_Upload_Function
  } = require("../../Configuration Files/Multer Js/multer"),
  { isManagerAuthentic } = require("../../routes/Manager/managerRoutes");

/**
 * setting all the controllers here
 */

router
  .route("/manager/upload/:man_uuid")
  .put(isManagerAuthentic, async (req, res) => {
    const userProfileImage = await Database.Managers.findOne({
      attributes: ["man_userProfilePic"],
      where: {
        man_uuid: req.session.profileData.man_uuid,
        login_id: req.session.passport.user.userInfo.login_id
      }
    });
    if (userProfileImage.dataValues.man_userProfilePic !== null) {
      fs.unlink(
        `./public/${userProfileImage.dataValues.man_userProfilePic}`,
        (err) => {
          if (err) console.error("There is no such file");
          else console.error("Successfully Deleted Pic");
        }
      );
    }

    multerFile_Upload_Function(req, res, (err) => {
      if (err) {
        return res.send({ messages: err, type: "danger" });
      } else {
        let filename = req.files[0].filename;
        let filePath = req.files[0].destination.split("./public");

        Database.Managers.update(
          {
            man_userProfilePic: filePath[1] + filename
          },
          {
            where: {
              man_uuid: req.session.profileData.man_uuid,
              login_id: req.session.passport.user.userInfo.login_id
            }
          }
        ).then((response) => {
          if (response) {
            req.session.profileData.man_userProfilePic = filePath[1] + filename;
            res.send({
              type: "success",
              messages: "Profile Image Uploaded",
              ProfilePic: filePath[1] + filename
            });
          } else {
            res.send({
              type: "danger",
              messages: "Error! in Uploading Image! "
            });
          }
        });
      }
    });
  });

/**
 * Update information
 * like full name, contact and username
 */
router
  .route("/manager/updateProfileInfo/:man_uuid")
  .put(isManagerAuthentic, async (req, res) => {
    const dbResponse = await Database.Role_ExtraInfo.findOne({
      attributes: ["target", "commission", "salary"],
      include: {
        model: Database.User_Role,
        where: {
          type_name: req.session.passport.user.userRole.type_name
        }
      },
      where: {
        paused: 0,
        deleted: 0
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error) {
          console.error("Error! Can not Fetch Commissions and Target from DB");
          console.trace(error);
          return null;
        }
      });

    if (dbResponse === null) {
      res
        .status(500)
        .send({
          type: "danger",
          messages: "Error! Please try Again! "
        })
        .end();
    } else {
      await Database.Managers.update(
        {
          man_name: req.body.name,
          man_DOB: req.body.dob,
          man_contact: req.body.contact,
          man_username: req.body.username,
          man_target: dbResponse.dataValues.target,
          man_salary: dbResponse.dataValues.salary,
          man_commission: dbResponse.dataValues.commission
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id
          }
        }
      )
        .then((response) => {
          if (response) {
            res.status(200).send({
              type: "success",
              messages: "Updated",
              uuid: req.session.profileData.man_uuid
            });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({
            type: "danger",
            messages: "Error! Can not update the Profile. Please Try Again! "
          });
        });
    }
  });

/**
 * updaing the profile information
 *
 */
router
  .route("/updateManagerProfile/:man_uuid")
  .put(isManagerAuthentic, async (req, res) => {
    let userReqBody = { ...req.body };
    let lengthofUser_Req = Object.keys(userReqBody).length;

    if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {
      /**
       * Updating the email if the user entered the new email address
       */
      const emailUpdate = await Database.User_Login_Information.update(
        {
          login_email: userReqBody.email
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id,
            paused: 0,
            deleted: 0
          }
        }
      );

      const updateExecutiveInfo = await Database.Managers.update(
        {
          man_name: userReqBody.fullname,
          man_contact: userReqBody.contact,
          man_username: userReqBody.username
        },
        {
          where: {
            man_uuid: req.session.profileData.man_uuid
          }
        }
      );
      if (emailUpdate && updateExecutiveInfo) {
        res.status(200).send({ status: "Information Updated" });
      } else {
        console.trace(
          "There is an error while updating the Information of User @ Line"
        );
        res.status(404).send({
          error: "error",
          details: "Error! while updating your information."
        });
      }
    } else
      res.status(404).send({ error: "error", details: "Invalid entered data" });
  });

/**
 * Controller for sending message to all the team member
 */
router
  .route("/getCityAgencies/:man_uuid")
  .post(isManagerAuthentic, async (req, res) => {
    /**
     * checking if the req.body
     *
     */
    if (req.body) {
      let agencies = await Database.City_Areas.findOne({
        attributes: ["city_area_id"],
        where: {
          city_area_uuid: req.body.cityAreaUUID,
          deleted: 0,
          paused: 0
        }
      })
        .then((cityData) =>
          Database.Team_Lead.findAll({
            attributes: ["team_L_id"],
            where: {
              team_L_isDeleted: 0,
              team_L_isPaused: 0,
              city_area_id: cityData.city_area_id
            },
            include: {
              model: Database.Field_Executive,
              required: true,
              attributes: ["field_id"],
              where: {
                field_isDeleted: 0,
                field_isPaused: 0
              }
            }
          })
        )
        .then((teamLead) => teamLead.map((team) => team.Field_Executives))
        .then((teamLead) => {
          let fieldExecutive = [];
          teamLead.forEach((team) => {
            team.forEach((field) => {
              fieldExecutive.push(field.field_id);
            });
          });
          return fieldExecutive;
          fieldExecutive = null;
        })
        .then((fieldExecutive) =>
          Database.Agency_Info.findAll({
            attributes: {
              exclude: ["updateTimestamp", "field_id"]
            },
            where: {
              field_id: fieldExecutive
            }
          })
        )
        .catch((error) => {
          if (error) {
            console.error("Error Fetching the Data of Agencies Information");
            console.trace(error);
            return null;
          }
        });
      // checking if the response of database is null or not
      if (agencies === null) {
        res.status(500).send({ error: "Please try again" });
        agencies = null;
        res.end();
      } else {
        res
          .status(200)
          .send({ status: "Successfully, Fetched Agencies", agencies });
        agencies = null;
        res.end();
      }
    } else {
      res.status(500).send({ error: "Please try again" });
      res.end();
    }
  });

/**
 * Controller for pausing the agency
 */
router
  .route("/pauseAgencyByManager/:man_uuid")
  .put(isManagerAuthentic, async (req, res) => {
    /**
     * checking if the req.body
     *
     */
    let agencies = await Database.Agency_Info.findOne({
      where: {
        agency_uuid: req.body.agencyUUID
      }
    })
      .then((agency) => {
        agency.update(
          {
            isPaused: agency.dataValues.isPaused === true ? false : true
          },
          {
            sup_id: 0,
            man_id: req.session.profileData.man_id,
            individualHooks: true
          }
        );
      })
      .catch((error) => {
        if (error) {
          console.error("Error Fetching the Data of Agencies Information");
          console.trace(error);
          return null;
        }
      });
    // checking if the response of database is null or not
    if (agencies === null) {
      res.status(500).send({ error: "Please try again" });
      agencies = null;
      res.end();
    } else {
      res
        .status(200)
        .send({ status: "Successfully, Action Done Against Agency" });
      agencies = null;
      res.end();
    }
  });

/**
 * Controller for deleting the agency
 */
router
  .route("/managerDeleteAgency/:man_uuid")
  .put(isManagerAuthentic, async (req, res) => {
    /**
     * checking if the req.body
     *
     */
    let agencies = await Database.Agency_Info.findOne({
      where: {
        agency_uuid: req.body.agencyUUID
      }
    })
      .then((agency) => {
        agency.update(
          {
            deleted: agency.dataValues.deleted === true ? false : true
          },
          {
            sup_id: 0,
            man_id: req.session.profileData.man_id,
            individualHooks: true
          }
        );
      })
      .catch((error) => {
        if (error) {
          console.error("Error Fetching the Data of Agencies Information");
          console.trace(error);
          return null;
        }
      });
    // checking if the response of database is null or not
    if (agencies === null) {
      res.status(500).send({ error: "Please try again" });
      agencies = null;
      res.end();
    } else {
      res
        .status(200)
        .send({ status: "Successfully, Action Done Against Agency" });
      agencies = null;
      res.end();
    }
  });

/**
 * Allocating the area to the Supervisor
 */
/**
 * allocating the area to the team lead
 */
router
  .route("/allocateAreaToTeamLead/:sup_uuid")
  .post(isManagerAuthentic, async (req, res) => {
    //getting the sector ID from the database
    let sectorID = await Database.City.findOne({
      attributes: ["city_id"],
      where: {
        city_uuid: req.body.selectedArea,
        deleted: 0,
        paused: 0
      }
    }).catch((error) => {
      console.error("Error in getting city");
      console.trace(error);
      return error ? null : true;
    });

    //getting the supervisor information from the database
    let supervisorID = await Database.Supervisor.findAll({
      attributes: ["sup_id"],
      where: {
        sup_uuid: selectedEmployee.map((uuid) => uuid),
        sup_isDeleted: 0,
        sup_isPaused: 0
      }
    }).catch((error) => {
      console.error("Error in getting Supervisor");
      console.trace(error);
      return error ? null : true;
    });

    let assignArea = await Database.City_and_Supervisor_associate.bulkCreate(
      supervisorID.map((supervisor) => {
        return {
          sup_id: supervisor.sup_id,
          city_id: sectorID.city_id
        };
      })
    ).catch((error) => {
      console.error("Error in creating the Supervisor and City associate");
      console.trace(error);
      return error ? null : true;
    });

    if ((sectorID, supervisorID, assignArea !== null)) {
      sectorID = executiveID = null;
      res.status(200).send({ status: "Area Assigned Successfully" });
      res.end();
    } else {
      sectorID = executiveID = null;
      res.status(500).send({ error: "Please try again" });
      res.end();
    }
    ////console.(req.body);
  });
/**
 * sending the message to the specific team member
 */
router
  .route("/conveyMessageToSpecificSupervisor/:man_uuid")
  .post(isManagerAuthentic, async (req, res) => {
    /**
     * getting the team memebers from the database
     */
    let superVisors = await Database.Supervisor.findAll({
      attributes: ["sup_id"],
      where: {
        man_id: req.session.profileData.man_id,
        sup_isDeleted: 0,
        sup_isPaused: 0,
        sup_uuid: JSON.parse(req.body.employeeList).map((employee) => employee)
      }
    }).catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Supervisor");
        console.trace(error);
        return null;
      }
    });

    let notificationID = await Database.NotificationText.findOne({
      attributes: ["notification_id"],
      where: {
        [Op.or]: [
          {
            notification_title: {
              [Op.like]: "%Manager%"
            }
          },
          {
            notification_title: {
              [Op.like]: "%Message from your Manager%"
            }
          }
        ]
      }
    }).catch((error) => {
      console.error("Error in finding Notification Text");
      console.trace(error);
      return null;
    });

    let messageConveyed = await Database.SuperVisorNotification.bulkCreate(
      superVisors.map((member) => {
        return {
          sup_id: member.dataValues.sup_id,
          notification_text: req.body.messageText,
          notification_id: notificationID.dataValues.notification_id
        };
      })
    ).catch((error) => {
      console.error("Error in creating ExecutiveNotifications");
      console.trace(error);
      return null;
    });

    if ((superVisors, notificationID, messageConveyed === null)) {
      res.status(500).send({ error: "Please try again" });
      superVisors = notificationID = messageConveyed = null;
      res.end();
    } else {
      res.status(200).send({ status: "Successfully, Message has been send" });
      superVisors = notificationID = messageConveyed = null;
      res.end();
    }
  });

/**
 * Controller for sending message to all the team member
 */
router
  .route("/conveyMessageToAllSupervisor/:man_uuid")
  .post(isManagerAuthentic, async (req, res) => {
    //getting all the supervisorssuperVisors
    let superVisors = await Database.Supervisor.findAll({
      attributes: ["sup_id"],
      where: {
        man_id: req.session.profileData.man_id,
        sup_isDeleted: 0,
        sup_isPaused: 0
      }
    }).catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Supervisor");
        console.trace(error);
        return null;
      }
    });

    let notificationID = await Database.NotificationText.findOne({
      attributes: ["notification_id"],
      where: {
        [Op.or]: [
          {
            notification_title: {
              [Op.like]: "%Manager%"
            }
          },
          {
            notification_title: {
              [Op.like]: "%Message from your Manager%"
            }
          }
        ]
      }
    }).catch((error) => {
      console.error("Error in finding Notification Text");
      console.trace(error);
      return null;
    });

    /**
     * creating the notificaiton text for the supervisor
     */
    let messageConveyed = await Database.SuperVisorNotification.bulkCreate(
      superVisors.map((member) => {
        return {
          sup_id: member.dataValues.sup_id,
          notification_text: req.body.messageText,
          notification_id: notificationID.dataValues.notification_id
        };
      })
    ).catch((error) => {
      console.error("Error in creating SuperVisors Notifications");
      console.trace(error);
      return null;
    });

    if ((superVisors, notificationID, messageConveyed === null)) {
      res.status(500).send({ error: "Please try again" });
      superVisors = notificationID = messageConveyed = null;
      res.end();
    } else {
      res.status(200).send({ status: "Successfully, Message has been send" });
      superVisors = messageConveyed = notificationID = null;
      res.end();
    }
  });

/**
 * reading all the notification to isRead to true
 * so it will make the notification is read
 */
router.route("/readAllManagerNotifications").post(async (req, res) => {
  const Notifications = await Database.ManagerNotifications.update(
    {
      isRead: true
    },
    {
      where: {
        man_id: req.session.profileData.man_id,
        isRead: false
      }
    }
  ).then((response) => {
    if (response) return response;
  });

  if (Notifications) res.status(200).send({ status: "Updated" });
});

module.exports = { router };
