module.exports = (app) => {
  const { Op } = require("sequelize"),
    fs = require("fs"),
    Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
    {
      multerFile_Upload_Function,
    } = require("../../Configuration Files/Multer Js/multer");
  /**
   * Upload image of the user at the starting of the new user login
   */

  app.post("/teamlead/uploadProfilePhoto", async (req, res) => {
    multerFile_Upload_Function(req, res, (err) => {
      if (err) {
        return res.send({ messages: err, type: "danger" });
      } else {
        let filename = req.files[0].filename;
        let filePath = req.files[0].destination.split("./public");

        Database.Team_Lead.update(
          {
            team_L_userProfilePic: filePath[1] + filename,
          },
          {
            where: {
              login_id: req.session.passport.user.userInfo.login_id,
            },
          }
        ).then((response) => {
          if (response) {
            res.send({
              type: "success",
              messages: "Profile Image Uploaded",
              profileImage: filePath[1] + filename,
            });
          } else {
            res.send({
              type: "danger",
              messages: "Error! in Uploading Image! ",
            });
          }
        });
      }
    });
  });

  app.route("/teamlead/updateProfileInfo").post(async (req, res) => {
    const dbResponse = await Database.Role_ExtraInfo.findOne({
      include: {
        model: Database.User_Role,
        attributes: [],
        where: {
          type_name: {
            [Op.like]: "%Team Lead%",
            [Op.like]: "%Team%",
          },
        },
      },
      attributes: ["target", "commission", "salary"],
      where: {
        paused: 0,
        deleted: 0,
      },
    })
      .then((response) => {
        if (response) return response;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error("Error! Can not Fetch Commissions and Target from DB");
          console.trace(error);
          return null;
        }
      });

    if (dbResponse !== null) {
      const updateStatus = await Database.Team_Lead.update(
        {
          team_L_name: req.body.name,
          team_L_contact: req.body.contact,
          team_L_username: req.body.username,
          team_L_target: dbResponse.dataValues.target,
          team_L_salary: dbResponse.dataValues.salary,
          team_L_commission: dbResponse.dataValues.commission,
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id,
          },
        }
      )
        .then((response) => {
          //console.(response);
          if (response) {
            return response;
          } else {
            return null;
          }
        })
        .catch((error) => {
          if (error) {
            console.error("Error Updating the Team lead Info");
            console.trace(error);
            return null;
          }
        });

      if (updateStatus !== null) {
        res.status(200).send({
          type: "success",
          messages: "Updated",
          uuid: req.session.passport.user.userInfo.login_uuid,
        });
        res.end();
      } else {
        res.status(503).send({
          type: "danger",
          messages: "Error! Internal Error! ",
        });
        res.end();
      }
    } else {
      res.status(503).send({
        type: "danger",
        messages: "Error! Internal Error! ",
      });
    }
  });

  /**
   * updaing the team lead profile information
   *
   */
  app.route("/updateTeamLeadProfile").post(async (req, res) => {
    let userReqBody = { ...req.body };
    let lengthofUser_Req = Object.keys(userReqBody).length;

    if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {
      /**
       * Updating the email if the user entered the new email address
       */
      const emailUpdate = await Database.User_Login_Information.update(
        {
          login_email: userReqBody.email,
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id,
            paused: 0,
            deleted: 0,
          },
        }
      );

      const updateExecutiveInfo = await Database.Team_Lead.update(
        {
          team_L_name: userReqBody.fullname,
          team_L_contact: userReqBody.contact,
          team_L_username: userReqBody.username,
        },
        {
          where: {
            team_L_uuid: req.session.profileData.team_L_uuid,
          },
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
          details: "Error! while updating your information.",
        });
      }
    } else
      res.status(404).send({ error: "error", details: "Invalid entered data" });
  });

  /**
   * adding a member to the team
   */

  app.route("/addMembertoTeam").post(async (req, res) => {
    //checking the user inofrmation from the database and also getting the role and field id
    const fieldExecutive = await Database.User_Login_Information.findOne({
      attributes: ["login_id", "user_role_id"],
      include: {
        model: Database.Field_Executive,
        required: true,
        attributes: ["field_id"],
        where: {
          //using the UUID from the front end
          field_uuid: req.body.id,
          field_isDeleted: false,
          field_isPaused: false,
        },
      },
      where: {
        deleted: false,
        paused: false,
      },
    });

    //getting the role id of the field executive  from the database so i may not be static
    //it should be dynamic but the type must mathces Field Executive

    const userRole = await Database.User_Role.findOne({
      attributes: ["user_role_id"],
      where: {
        deleted: false,
        paused: false,
        type_name: {
          [Op.like]: [`Field Executive`],
          [Op.like]: [`%Field Executive%`],
        },
      },
    });

    //update the role of the user to Field Executive

    const updateRole = await Database.User_Login_Information.update(
      {
        user_role_id: userRole.dataValues.user_role_id,
      },
      {
        where: {
          login_id: fieldExecutive.dataValues.login_id,
          deleted: false,
          paused: false,
        },
      }
    );
    //and adding the Field Executive to the Team lead

    const updateExecutiveToTeam = await Database.Field_Executive.update(
      {
        team_L_id: req.session.profileData.team_L_id,
      },
      {
        where: {
          field_uuid: req.body.id,
          field_id:
            fieldExecutive.dataValues.Field_Executive.dataValues.field_id,
        },
      }
    );

    // adding the role information into the roleChanged table
    const roleChanged = await Database.changeRoleLogs.create({
      previousRole: fieldExecutive.dataValues.user_role_id,
      newRole: userRole.dataValues.user_role_id,
      field_id: fieldExecutive.dataValues.Field_Executive.dataValues.field_id,
      team_L_id: req.session.profileData.team_L_id,
    });

    //sending the response to the user
    if ((fieldExecutive, userRole, updateExecutiveToTeam, roleChanged)) {
      res.status(200).send({
        status: "Done",
      });
    } else {
      res.status(400).send({
        error: "error",
      });
    }
  });

  /**
   * assigning the area to the field executive
   * first find the the city area sector and then find the employees from the database
   * then update the City_Sector_Assosiate
   */
  app.route("/allocateSectorToExecutive").post(async (req, res) => {
    //getting the sector ID from the database
    let sectorID = await Database.City_Sectors.findOne({
      attributes: ["city_sector_id"],
      where: {
        city_sector_uuid: req.body.selectedArea,
        deleted: 0,
        paused: 0,
      },
    });
    let selectedEmployee = JSON.parse(req.body.employees);

    let executiveID = await Database.Field_Executive.findAll({
      attributes: ["field_id"],
      where: {
        field_uuid: selectedEmployee.map((uuid) => uuid),
        field_isDeleted: 0,
        field_isPaused: 0,
      },
    });

    //console.(sectorID);
    //console.(selectedEmployee);
    //console.(executiveID);

    let assignArea = await Database.City_Sector_Assosiate.bulkCreate(
      executiveID.map((employee) => {
        return {
          field_id: employee.field_id,
          city_sector_id: sectorID.city_sector_id,
        };
      })
    );

    if ((sectorID, selectedEmployee, executiveID, assignArea !== null)) {
      sectorID = selectedEmployee = executiveID = assignArea = null;
      res.status(200).send({ status: "Area Assigned Successfully" });
      res.end();
    } else {
      sectorID = selectedEmployee = executiveID = assignArea = null;
      res.status(500).send({ error: "Please try again" });
      res.end();
    }
    ////console.(req.body);
  });

  /**
   * here is the removing the area from the executive
   */

  app.route("/teamlead/removeSectorToExecutive").put(async (req, res) => {
    //getting the sector ID from the database
    let sectorID = await Database.City_Sectors.findOne({
      include: {
        model: Database.Field_Executive,
        required: true,
        through: {
          attributes: ["city_sector_assos_uuid"],
        },
        where: {
          field_uuid: req.body.executiveUUID,
          field_isDeleted: 0,
          field_isPaused: 0,
          team_L_id: req.session.profileData.team_L_id,
        },
      },
      where: {
        city_sector_uuid: req.body.selectedArea,
        deleted: 0,
        paused: 0,
      },
    })
      .then((result) => {
        if (result) {
          return result.dataValues.Field_Executives[0].City_Sector_Assosiate
            .dataValues;
        }
      })
      .catch((err) => {
        if (err) {
          console.error("Error Fetching Remove Sector Information");
          console.trace(err);
          return null;
        }
      });

    if (sectorID) {
      let executiveID = await Database.City_Sector_Assosiate.update(
        {
          paused: 1,
        },
        {
          where: {
            city_sector_assos_uuid: sectorID.city_sector_assos_uuid,
            deleted: 0,
            paused: 0,
          },
        }
      )
        .then((result) => {
          return result;
        })
        .catch((err) => {
          if (err) {
            console.error("Error Fetching Remove Sector Information");
            console.trace(err);
            return null;
          }
        });

      if (executiveID) {
        res.status(200).send({
          status: "success",
          message: "Area Removed Successfully",
          executiveID,
        });
        sectorID = executiveID = null;
        res.end();
      } else {
        sectorID = executiveID = null;
        res.status(500).send({ error: "Please try again" });
        res.end();
      }
    } else {
      res
        .status(200)
        .send({ status: "Marked Already", message: "Area is Already Deleted" });
      res.end();
    }
  });

  /**
   * sending the message to the specific team member
   */
  app.route("/conveyMessageToSpecific").post(async (req, res) => {
    /**
     * getting the team memebers from the database
     */
    let teamMember = await Database.Field_Executive.findAll({
      attributes: ["field_id"],
      where: {
        team_L_id: req.session.profileData.team_L_id,
        field_isDeleted: 0,
        field_isPaused: 0,
        field_uuid: JSON.parse(req.body.employeeList).map(
          (employee) => employee
        ),
      },
    }).catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Executive");
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
              [Op.like]: "%Team%",
            },
          },
          {
            notification_title: {
              [Op.like]: "%Team Member%",
            },
          },
        ],
      },
    }).catch((error) => {
      console.error("Error in creating ExecutiveNotifications");
      console.trace(error);
      return null;
    });

    let messageConveyed = await Database.ExecutiveNotifications.bulkCreate(
      teamMember.map((member) => {
        return {
          field_id: member.dataValues.field_id,
          notification_text: req.body.messageText,
          notification_id: notificationID.dataValues.notification_id,
        };
      })
    ).catch((error) => {
      console.error("Error in creating ExecutiveNotifications");
      console.trace(error);
      return null;
    });

    if ((teamMember, notificationID, messageConveyed === null)) {
      res.status(500).send({ error: "Please try again" });
      res.end();
    } else {
      res.status(200).send({ status: "Successfully, Message has been send" });
    }
  });

  /**
   * Controller for sending message to all the team member
   */
  app.route("/conveyMessageToAll").post(async (req, res) => {
    let teamMember = await Database.Field_Executive.findAll({
      attributes: ["field_id"],
      where: {
        team_L_id: req.session.profileData.team_L_id,
        field_isDeleted: 0,
        field_isPaused: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Executive");
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
              [Op.like]: "%Team%",
            },
          },
          {
            notification_title: {
              [Op.like]: "%Team Member%",
            },
          },
        ],
      },
    }).catch((error) => {
      console.error("Error in creating ExecutiveNotifications");
      console.trace(error);
      return null;
    });

    let messageConveyed = await Database.ExecutiveNotifications.bulkCreate(
      teamMember.map((member) => {
        return {
          field_id: member.dataValues.field_id,
          notification_text: req.body.messageText,
          notification_id: notificationID.dataValues.notification_id,
        };
      })
    ).catch((error) => {
      console.error("Error in creating ExecutiveNotifications");
      console.trace(error);
      return null;
    });

    if ((teamMember, notificationID, messageConveyed === null)) {
      res.status(500).send({ error: "Please try again" });
      res.end();
    } else {
      res.status(200).send({ status: "Successfully, Message has been send" });
      teamMember = messageConveyed = notificationID = null;
    }
  });

  /**
   * Unread all team lead notification
   */

  app.route("/unreadTeamAllNotifications").post(async (req, res) => {
    const Notifications = await Database.TeamLead_Notifications.update(
      {
        isRead: true,
      },
      {
        where: {
          team_L_id: req.session.profileData.team_L_id,
          isRead: false,
        },
      }
    ).then((response) => {
      if (response) return response;
    });

    if (Notifications) res.send({ status: "Updated" });
  });

  //submitting the recommendation to
  app.route("/submitRecommendation").post(async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Executive_Recommendation.findOne({
      attributes: ["exec_recomm_id"],
      where: {
        exec_recomm_uuid: req.body.selectedRecommendation,
        deleted: 0,
        paused: 0,
      },
    });
    let selectedEmployee = JSON.parse(req.body.employeeList);

    let executiveID = await Database.Field_Executive.findAll({
      attributes: ["field_id"],
      where: {
        field_uuid: selectedEmployee.map((uuid) => uuid),
        field_isDeleted: 0,
        field_isPaused: 0,
      },
    });

    let addRecommendation =
      await Database.Recommendation_for_Executive.bulkCreate(
        executiveID.map((employee) => {
          return {
            field_id: employee.field_id,
            team_L_id: req.session.profileData.team_L_id,
            exec_recomm_id: recommendationID.exec_recomm_id,
            recommendationDetails: req.body.recommendationText,
            recommendationTitle: req.body.title,
          };
        })
      );

    if (
      (recommendationID,
      selectedEmployee,
      executiveID,
      addRecommendation !== null)
    ) {
      recommendationID =
        selectedEmployee =
        executiveID =
        addRecommendation =
          null;
      res.status(200).send({ status: "Recommendation Added Successfully" });
      res.end();
    } else {
      recommendationID =
        selectedEmployee =
        executiveID =
        addRecommendation =
          null;
      res.status(500).send({ error: "Please try again" });
      res.end();
    }
    ////console.(req.body);
  });

  //pause the field executive  recommendation to
  app.route("/teamlead/declineRecommendation").put(async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Advertisement_Recommendation.findOne({
      where: {
        advert_recom_uuid: req.body.declineRecommendationUUID,
        deleted: false,
        paused: false,
        status: false,
        team_L_id: null,
        team_lead_dateTime: null,
      },
    })
      .then((result) => {
        if (result) {
          result.update({
            team_L_id: req.session.profileData.team_L_id,
            team_lead_dateTime: new Date().toUTCString(),
            status: true,
            team_lead_decline_status: true,
            team_lead_decline_descr: req.body.reason,
          });
        } else {
          return null;
        }
      })
      .catch((err) => {
        if (err) {
          console.log("Error Getting all the recommendation");
          console.trace(err);
          return null;
        }
      });

    if (recommendationID !== null) {
      recommendationID = null;
      res.status(200).send({
        status: "Updated",
        message: "Recommendation Marked Successfully",
      });
      res.end();
    } else {
      res.status(500).send({
        status: "Already Updated",
        message: "Recommendation is already marked. Try Again",
        recommendationID,
      });
      res.end();
    }
  });

  //pause the field executive  recommendation to
  app.route("/teamlead/approveRecommendation").put(async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Advertisement_Recommendation.findOne({
      where: {
        advert_recom_uuid: req.body.uuid,
        deleted: false,
        paused: false,
        status: false,
        team_L_id: null,
        team_lead_dateTime: null,
      },
    })
      .then((result) => {
        if (result) {
          result.update({
            team_L_id: req.session.profileData.team_L_id,
            team_lead_dateTime: new Date().toUTCString(),
            status: true,
            team_lead_forward_status: true,
          });
        } else {
          return null;
        }
      })
      .catch((err) => {
        if (err) {
          console.log("Error Getting all the recommendation");
          console.trace(err);
          return null;
        }
      });

    if (recommendationID !== null) {
      recommendationID = null;
      res.status(200).send({
        status: "Updated",
        message: "Recommendation Marked Successfully",
      });
      res.end();
    } else {
      res.status(500).send({
        status: "Already Updated",
        message: "Recommendation is already marked. Try Again",
        recommendationID,
      });
      res.end();
    }
    ////console.(req.body);
  });

  /**
   * remove a member to the team
   */

  app.route("/removeMembertoTeam").put(async (req, res) => {
    // checking the user inofrmation from the database and also getting the role and field id
    const fieldExecutive = await Database.User_Login_Information.findOne({
      attributes: ["login_id", "user_role_id"],
      include: {
        model: Database.Field_Executive,
        required: true,
        attributes: ["field_id"],
        where: {
          //using the UUID from the front end
          field_uuid: req.body.id,
          field_isDeleted: false,
          field_isPaused: false,
        },
      },
      where: {
        deleted: false,
        paused: false,
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        if (err) {
          console.log("Error Getting the Field Executive Info");
          console.trace(err);
          return null;
        }
      });

    //getting the role id of the field executive  from the database so i may not be static
    //it should be dynamic but the type must mathces Field Executive

    const userRole = await Database.User_Role.findOne({
      attributes: ["user_role_id"],
      where: {
        deleted: false,
        paused: false,
        type_name: {
          [Op.like]: [`Freelance Field Executive`],
          [Op.like]: [`%Freelance%`],
        },
      },
    }).catch((err) => {
      if (err) {
        console.log("Error Getting the User Role Info");
        console.trace(err);
        return null;
      }
    });
    //  and adding the Field Executive to the NULL
    const updateExecutiveToTeam = await sequelize
      .query(
        `UPDATE field_executive SET team_L_id = NULL WHERE field_uuid = '${req.body.id}';`,
        null,
        { raw: true }
      )
      .then((response) => {
        console.log("Creating Database.... Please Wait");
        console.log(response);
      })

      .catch((err) => {
        if (err) {
          console.log("Error Updating the Team Lead Info");
          console.trace(err);
          return null;
        }
      });

    //update the role of the user to Field Executive

    const updateRole = await Database.User_Login_Information.update(
      {
        user_role_id: userRole.dataValues.user_role_id,
      },
      {
        where: {
          login_id: fieldExecutive.dataValues.login_id,
          deleted: false,
          paused: false,
        },
      }
    ).catch((err) => {
      if (err) {
        console.log("Error Updating the User Role Info");
        console.trace(err);
        return null;
      }
    });

    // adding the role information into the roleChanged table
    const roleChanged = await Database.changeRoleLogs
      .create({
        previousRole: fieldExecutive.dataValues.user_role_id,
        newRole: userRole.dataValues.user_role_id,
        field_id: fieldExecutive.dataValues.Field_Executive.dataValues.field_id,
        team_L_id: req.session.profileData.team_L_id,
      })
      .catch((err) => {
        if (err) {
          console.log("Error Creating the User Role Change Info");
          console.trace(err);
          return null;
        }
      });

    //sending the response to the user
    if ((fieldExecutive, userRole, updateExecutiveToTeam, roleChanged)) {
      res.status(200).send({
        status: "Done",
      });
    } else {
      res.status(400).send({
        error: "error",
      });
    }
  });
};

getAuthenticateJSON = (userReqBody) => {
  Object.keys(userReqBody).forEach((key) => {
    if (
      userReqBody[key] === "select" ||
      userReqBody[key] === "update" ||
      userReqBody[key] === "insert"
    ) {
      delete userReqBody[key];
    }
  });
  return Object.keys(userReqBody).length;
};

// async function name() {
//   let teamMember = await Database.Field_Executive.findAll({
//     attributes: ["field_id"],
//     where: {
//       team_L_id: 1,
//       field_isDeleted: 0,
//       field_isPaused: 0
//     }
//   }).catch((error) => {
//     if (error) {
//       console.error("Error Fetching the Data of Executive");
//       console.trace(error);
//       res.send({ error: "Please try again" });
//       res.end();
//     }
//   });

//   let notificationID = await Database.NotificationText.findOne({
//     attributes: ["notification_id"],
//     where: {
//       [Op.or]: [
//         {
//           notification_title: {
//             [Op.like]: "%Team%"
//           }
//         },
//         {
//           notification_title: {
//             [Op.like]: "%Team Member%"
//           }
//         }
//       ]
//     }
//   });
//   // let createBulkNotification = teamMember.map((member) => {
//   //   return {
//   //     field_id: member.dataValues.field_id,
//   //     notification_text: "req.body.messageText",
//   //     notification_id: notificationID.dataValues.notification_id
//   //   };
//   // });

//   // //console.(createBulkNotification);
//   let messageConveyed = await Database.ExecutiveNotifications.bulkCreate(
//     teamMember.map((member) => {
//       return {
//         field_id: member.dataValues.field_id,
//         notification_text: "req.body.messageText",
//         notification_id: notificationID.dataValues.notification_id
//       };
//     })
//   )
//     .then((notification) => //console.(notification))
//     .catch((error) => console.error(error));
// }

// name();
