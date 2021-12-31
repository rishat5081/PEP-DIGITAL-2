const router = require("express").Router(),
  fs = require("fs"),
  Sequelize = require("sequelize"),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  {
    multerFile_Upload_Function,
  } = require("../../Configuration Files/Multer Js/multer"),
  { isUserAuthentic } = require("../../routes/SuperVisor/superVisor_route");

/**
 * Uploading the user profile image to the server
 * Updating the user profile image
 * in to the data base
 * and also using the Multer
 */

router
  .route("/supervisor/upload/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    const userProfileImage = await Database.Supervisor.findOne({
      attributes: ["sup_userProfilePic"],

      where: {
        login_id: req.session.passport.user.userInfo.login_id,
      },
    });
    if (userProfileImage.dataValues.sup_userProfilePic !== null) {
      fs.unlink(
        `./public/${userProfileImage.dataValues.sup_userProfilePic}`,
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

        Database.Supervisor.update(
          {
            sup_userProfilePic: filePath[1] + filename,
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
              ProfilePic: filePath[1] + filename,
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

/**
 * Update information
 * like full name, contact and username
 */
router
  .route("/supervisor/updateProfileInfo/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    const dbResponse = await Database.Role_ExtraInfo.findOne({
      attributes: ["target", "commission", "salary"],
      include: {
        model: Database.User_Role,
        where: {
          type_name: req.session.passport.user.userRole.type_name,
        },
      },
      where: {
        paused: 0,
        deleted: 0,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error) {
          console.error(
            "Error! Can not Fetch Commissions and Target from DB" + error
          );
          console.trace(error);
          return null;
        }
      });

    if (dbResponse === null) {
      res
        .status(500)
        .send({
          type: "danger",
          messages: "Error! Please try Again! ",
        })
        .end();
    } else {
      Database.Supervisor.update(
        {
          sup_name: req.body.name,
          sup_DOB: req.body.dob,
          sup_contact: req.body.contact,
          sup_username: req.body.username,
          sup_target: dbResponse.dataValues.target,
          sup_salary: dbResponse.dataValues.salary,
          sup_commission: dbResponse.dataValues.commission,
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id,
          },
        }
      )
        .then((response) => {
          if (response) {
            res.status(200).send({
              type: "success",
              messages: "Updated",
              uuid: req.session.profileData.sup_uuid,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({
            type: "danger",
            messages: "Error! Can not update the Profile. Please Try Again! ",
          });
        });
    }
  });

/**
 * updaing the profile information
 *
 */
router
  .route("/updateSupervisorProfile/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
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

      const updateExecutiveInfo = await Database.Supervisor.update(
        {
          sup_name: userReqBody.fullname,
          sup_contact: userReqBody.contact,
          sup_username: userReqBody.username,
        },
        {
          where: {
            sup_uuid: req.session.profileData.sup_uuid,
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
 * allocating the area to the team lead
 */
router
  .route("/allocateAreaToTeamLead/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    //getting the sector ID from the database
    let sectorID = await Database.City_Areas.findOne({
      attributes: ["city_area_id"],
      where: {
        city_area_uuid: req.body.selectedArea,
        deleted: 0,
        paused: 0,
      },
    });
    let executiveID = await Database.Team_Lead.update(
      {
        city_area_id: sectorID.dataValues.city_area_id,
      },
      {
        where: {
          team_L_uuid: req.body.employees,
          team_L_isDeleted: 0,
          team_L_isPaused: 0,
        },
      }
    );

    if ((sectorID, executiveID !== null)) {
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
 * getting the analytics from the data base for the specific city
 */
router
  .route("/getCityAnalytics/:cityUUID/:sup_uuid")
  .get(isUserAuthentic, async (req, res) => {
    //getting the teams from the city UUID
    //getting the City id from City table
    let teamLeadID = await Database.City.findAll({
      attributes: ["city_id"],
      where: {
        city_uuid: req.params.cityUUID,
        deleted: 0,
        paused: 0,
      },
    })
      //getting the city id which is recieved from the prarmeter
      .then((cityID) => cityID.map((city) => city.city_id))
      .then((cityAssosiate) =>
        //finding the city id from the assosiate and also validating the sup id from the session
        Database.City_and_Supervisor_associate.findAll({
          where: {
            city_id: cityAssosiate,
            sup_id: req.session.profileData.sup_id,
            deleted: 0,
            paused: 0,
          },
        })
      )
      //making an array from the previous promise city supervisor assosiate id
      .then((cityAssosiate) =>
        cityAssosiate.map(
          (cityAssosiate_id) => cityAssosiate_id.city_supp_assos_id
        )
      )
      //getting the
      .then((cityAssosiate) =>
        Database.City_Areas.findAll({
          where: {
            city_supp_assos_id: cityAssosiate,
            deleted: 0,
            paused: 0,
          },
        })
      )
      .then((cityAreas) => cityAreas.map((area) => area.city_area_id))
      .then((cityAreas_id) =>
        Database.Team_Lead.findAll({
          attributes: ["team_L_id", "team_L_uuid", "team_L_name"],
          where: {
            city_area_id: cityAreas_id,
            team_L_isDeleted: 0,
            team_L_isPaused: 0,
          },
        })
      );

    /**
     * getting the members from the database
     */

    let teamMember = await Database.Field_Executive.findAll({
      attributes: ["field_id", "field_uuid", "field_name"],
      where: {
        team_L_id: teamLeadID.map((team) => team.team_L_id),
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

    /**
     * getting the activities per month from the db
     */
    let activitiesPerMonth = await Database.Activities.findAll({
      attributes: [
        [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
        [Sequelize.fn("COUNT", Sequelize.col("*")), "activitiesPerMonth"],
        // [
        //   Sequelize.fn("COUNT", Sequelize.col("cancelled")),
        //   "cancelledactivitiesPerMonth"
        // ]
      ],
      group: ["moonth", "Year"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        paused: false,
      },
    })
      .then((dbResponse) => {
        if (dbResponse.length > 0) return dbResponse;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error(
            "There is an error which fetching activities per month " + error
          );
          return null;
        }
      });

    /**
     * getting the cancelled activities from the db
     */

    let cancelledactivitiesPerMonth = await Database.Activities.findAll({
      attributes: [
        [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
        [
          Sequelize.fn("COUNT", Sequelize.col("cancelled")),
          "cancelledactivitiesPerMonth",
        ],
      ],
      group: ["moonth", "Year"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        paused: false,
        cancelled: true,
      },
    })
      .then((dbResponse) => {
        if (dbResponse.length > 0) return dbResponse;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error(
            "There is an error which fetching activities per month " + error
          );
          return null;
        }
      });

    /**
     * getting the agency per month from the db
     */
    let agencyCount = await Database.Agency_Info.findAll({
      attributes: [
        [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
        [Sequelize.fn("COUNT", Sequelize.col("*")), "agencyCount"],
      ],
      group: ["moonth", "Year"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        isPaused: false,
      },
    })
      .then((dbResponse) => {
        if (dbResponse.length > 0) return dbResponse;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.trace(error);
          console.error(
            "There is an error which fetching activities per month"
          );
          return null;
        }
      });

    if (
      (teamLeadID,
      teamMember,
      activitiesPerMonth,
      cancelledactivitiesPerMonth,
      agencyCount)
    ) {
      res.status(200).send({
        status: "Displaying the Data",
        activitiesPerMonth,
        cancelledactivitiesPerMonth,
        agencyCount,
        teamLeadID,
      });
      teamLeadID =
        teamMember =
        activitiesPerMonth =
        cancelledactivitiesPerMonth =
        agencyCount =
          null;
      res.end();
    } else {
      res.status(200).send({
        status: "Not Found",
        message: "No Record Found",
        teamLeadID,
        teamMember,
        activitiesPerMonth,
        cancelledactivitiesPerMonth,
        agencyCount,
      });
      res.end();
      teamLeadID =
        teamMember =
        activitiesPerMonth =
        cancelledactivitiesPerMonth =
        agencyCount =
          null;
    }
    ////console.(req.body);
  });

/**
 * getting the team lead analytics
 */

router
  .route("/getTeamLeadAnalytics/:teamLeadUUID/:sup_uuid")
  .get(isUserAuthentic, async (req, res) => {
    //getting the teams from the req.param teamLeadUUID

    let teamLeadID = await Database.Team_Lead.findAll({
      attributes: ["team_L_id", "team_L_uuid", "team_L_name"],
      where: {
        team_L_uuid: req.params.teamLeadUUID,
        team_L_isDeleted: 0,
        team_L_isPaused: 0,
      },
    });

    /**
     * getting the members from the database
     */

    let teamMember = await Database.Field_Executive.findAll({
      attributes: ["field_id", "field_uuid", "field_name"],
      where: {
        team_L_id: teamLeadID.map((team) => team.team_L_id),
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

    /**
     * getting the activities per month from the db
     */

    if (teamMember.length > 0) {
      let activitiesPerMonth = await Database.Activities.findAll({
        attributes: [
          [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
          [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
          [Sequelize.fn("COUNT", Sequelize.col("*")), "activitiesPerMonth"],
          // [
          //   Sequelize.fn("COUNT", Sequelize.col("cancelled")),
          //   "cancelledactivitiesPerMonth"
          // ]
        ],
        group: ["moonth", "Year"],
        where: {
          field_id: teamMember.map((member) => member.field_id),
          deleted: false,
          paused: false,
        },
      })
        .then((dbResponse) => {
          if (dbResponse.length > 0) return dbResponse;
          else return null;
        })
        .catch((error) => {
          if (error) {
            console.error(
              "There is an error which fetching activities per month " + error
            );
            return null;
          }
        });

      /**
       * getting the cancelled activities from the db
       */

      let cancelledactivitiesPerMonth = await Database.Activities.findAll({
        attributes: [
          [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
          [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
          [
            Sequelize.fn("COUNT", Sequelize.col("cancelled")),
            "cancelledactivitiesPerMonth",
          ],
        ],
        group: ["moonth", "Year"],
        where: {
          field_id: teamMember.map((member) => member.field_id),
          deleted: false,
          paused: false,
          cancelled: true,
        },
      })
        .then((dbResponse) => {
          if (dbResponse.length > 0) return dbResponse;
          else return null;
        })
        .catch((error) => {
          if (error) {
            console.error(
              "There is an error which fetching activities per month " + error
            );
            return null;
          }
        });

      /**
       * getting the agency per month from the db
       */
      let agencyCount = await Database.Agency_Info.findAll({
        attributes: [
          [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
          [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
          [Sequelize.fn("COUNT", Sequelize.col("*")), "agencyCount"],
        ],
        group: ["moonth", "Year"],
        where: {
          field_id: teamMember.map((member) => member.field_id),
          deleted: false,
          isPaused: false,
        },
      })
        .then((dbResponse) => {
          if (dbResponse.length > 0) return dbResponse;
          else return null;
        })
        .catch((error) => {
          if (error) {
            console.trace(error);
            console.error(
              "There is an error which fetching activities per month"
            );
            return null;
          }
        });
      if (
        (teamLeadID,
        teamMember,
        activitiesPerMonth,
        cancelledactivitiesPerMonth,
        agencyCount)
      ) {
        res.status(200).send({
          status: "Displaying the Data",
          activitiesPerMonth,
          cancelledactivitiesPerMonth,
          agencyCount,
        });
        teamLeadID =
          teamMember =
          activitiesPerMonth =
          cancelledactivitiesPerMonth =
          agencyCount =
            null;
        res.end();
      } else {
        res.status(200).send({
          error: "No Activities Found",
          activitiesPerMonth,
          cancelledactivitiesPerMonth,
          agencyCount,
        });
        res.end();
        teamLeadID =
          teamMember =
          activitiesPerMonth =
          cancelledactivitiesPerMonth =
          agencyCount =
            null;
      }
    } else {
      teamLeadID =
        teamMember =
        activitiesPerMonth =
        cancelledactivitiesPerMonth =
        agencyCount =
          null;
      res.status(404).send({ error: "No Record Found" });
      res.end();
    }

    ////console.(req.body);
  });

router
  .route("/getTeamLead/:cityUUID/:sup_uuid")
  .get(isUserAuthentic, async (req, res) => {
    //getting the teams from the req.param teamLeadUUID

    let teamLeadCityAreas = await Database.City.findAll({
      attributes: ["city_id"],
      where: {
        city_uuid: req.params.cityUUID,
        deleted: 0,
        paused: 0,
      },
    })
      //getting the city id which is recieved from the prarmeter
      .then((cityID) => cityID.map((city) => city.city_id))
      .then((cityAssosiate) =>
        //finding the city id from the assosiate and also validating the sup id from the session
        Database.City_and_Supervisor_associate.findAll({
          attributes: ["city_supp_assos_id"],
          where: {
            city_id: cityAssosiate,
            sup_id: req.session.profileData.sup_id,
            deleted: 0,
            paused: 0,
          },
        })
      )
      //making an array from the previous promise city supervisor assosiate id
      .then((cityAssosiate) =>
        cityAssosiate.map(
          (cityAssosiate_id) => cityAssosiate_id.city_supp_assos_id
        )
      )
      //getting the
      .then((cityAssosiate) =>
        Database.City_Areas.findAll({
          attributes: ["city_area_id", "city_area_uuid", "city_name"],
          where: {
            city_supp_assos_id: cityAssosiate,
            deleted: 0,
            paused: 0,
          },
        })
      );

    let teamLeads = await Database.Team_Lead.findAll({
      attributes: ["team_L_id", "team_L_uuid", "team_L_name", "city_area_id"],
      where: {
        city_area_id: teamLeadCityAreas.map((area) => area.city_area_id),
        team_L_isDeleted: 0,
        team_L_isPaused: 0,
      },
    });

    if ((teamLeadCityAreas, teamLeads)) {
      res.status(200).send({
        status: "Displaying team lead",
        teamLeadCityAreas,
        teamLeads,
      });
      teamLeadCityAreas = teamLeads = null;
      res.end();
    } else {
      teamLeadCityAreas = teamLeads = null;
      res.status(404).send({ error: "No Record Found" });
      res.end();
    }

    ////console.(req.body);
  });

router
  .route("/assignGiftToSelective/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    //getting the teams from the req.param teamLeadUUID

    console.log(req.body);

    let teamLeadInfo = await Database.City_Areas.findOne({
      attributes: ["city_area_id"],
      where: {
        city_area_uuid: req.body.cityArea,
        deleted: 0,
        paused: 0,
      },
    })
      //getting the city id which is recieved from the prarmeter
      .then((cityID) => cityID.city_area_id)
      .then((cityAssosiate) =>
        //finding the city id from the assosiate and also validating the sup id from the session
        Database.Team_Lead.findOne({
          attributes: ["team_L_id"],
          where: {
            team_L_uuid: req.body.teamLead,
            city_area_id: cityAssosiate,
            sup_id: req.session.profileData.sup_id,
            team_L_isDeleted: 0,
            team_L_isPaused: 0,
          },
        })
      )
      .catch((error) => {
        if (error) {
          console.error(
            "Error Fetching the Data of Team Lead for Assigning Gift"
          );
          console.trace(error);
          return null;
        }
      });

    let getGiftData = await Database.Advertising_Stock_Allocation.findAll({
      attributes: [
        "adver_stock_act_id",
        "adver_stock_id",
        "adver_stock_allocated_Quantity",
        "used",
      ],
      include: {
        model: Database.Advertisement_Stock,
        required: true,
        attributes: ["adver_stock_name"],
        where: {
          advert_stock_uuid: req.body.gift,
          paused: 0,
          deleted: 0,
        },
      },
      where: {
        isConsumed: 0,
        paused: 0,
        deleted: 0,
        sup_id: req.session.profileData.sup_id,
      },
    });

    /**
     * here is the critical code for the assigning the gift..
     * here if the user ask to allocate the gift
     * the  total sum of the gift is taken care of
     * first if the user enter the
     */
    let newObject = [];
    if (getGiftData.length > 0) {
      let sum = 0,
        temp = 0;
      getGiftData.some((data) => {
        if (data.adver_stock_allocated_Quantity > +req.body.giftAssigned) {
          temp = data.adver_stock_allocated_Quantity - req.body.giftAssigned;
          data.adver_stock_allocated_Quantity = temp;
          data.used = req.body.giftAssigned;
          newObject.push({
            quantity: data.adver_stock_allocated_Quantity,
            used: +data.used,
            isConsumed:
              data.adver_stock_allocated_Quantity === 0 ? true : false, // : true ? false,
            adver_stock_act_id: data.adver_stock_act_id,
          });

          return true;
        } else {
          if (sum !== +req.body.giftAssigned) {
            if (temp === 0) {
              temp =
                data.adver_stock_allocated_Quantity - req.body.giftAssigned;
              sum += data.adver_stock_allocated_Quantity;

              data.adver_stock_allocated_Quantity -= sum;
              data.used = data.adver_stock_allocated_Quantity;

              newObject.push({
                quantity: data.adver_stock_allocated_Quantity,
                used: sum,
                isConsumed:
                  data.adver_stock_allocated_Quantity === 0 ? true : false, // : true ? false,
                adver_stock_act_id: data.adver_stock_act_id,
              });
            } else {
              sum += -temp;
              data.used = -temp;
              temp = data.adver_stock_allocated_Quantity - -temp;
              data.adver_stock_allocated_Quantity = temp;

              newObject.push({
                quantity: data.adver_stock_allocated_Quantity,
                used: +data.used,
                isConsumed:
                  data.adver_stock_allocated_Quantity === 0 ? true : false, // : true ? false,
                adver_stock_act_id: data.adver_stock_act_id,
              });
            }
          }
        }
      });

      /**
       * now updating and allocating the record to the team lead
       */

      let allocateGift_ToTeamLead =
        await Database.Team_Lead_Adver_Stock.bulkCreate(
          newObject.map((data) => {
            return {
              team_L_id: teamLeadInfo.team_L_id,
              sup_id: req.session.profileData.sup_id,
              adver_stock_act_id: data.adver_stock_act_id,
              total_Quantity: data.used,
            };
          })
        );

      /**
       * and now updating the advertisment record
       */

      newObject.forEach(async (data) => {
        await Database.Advertising_Stock_Allocation.update(
          {
            adver_stock_allocated_Quantity: data.quantity,
            isConsumed: data.isConsumed,
            used: Sequelize.literal(`used + ${data.used}`),
          },
          {
            where: {
              sup_id: req.session.profileData.sup_id,
              adver_stock_act_id: data.adver_stock_act_id,
            },
          }
        );
      });

      if (allocateGift_ToTeamLead) {
        res
          .status(200)
          .send({ status: "Successfully Gift Allocated to Team Lead" });
        sum =
          temp =
          newObject =
          teamLeadInfo =
          getGiftData =
          allocateGift_ToTeamLead =
            0;
        res.end();
      }
    } else {
      res
        .status(400)
        .send({ error: "There is error getting Advertising Stock" });
      res.end();
    }
  });

/**
 * sending the message to the specific team member
 */
router
  .route("/conveyMessageToSpecificTeamLead/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    /**
     * getting the team memebers from the database
     */
    let teamMember = await Database.Team_Lead.findAll({
      attributes: ["team_L_id"],
      where: {
        sup_id: req.session.profileData.sup_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0,
        team_L_uuid: JSON.parse(req.body.employeeList).map(
          (employee) => employee
        ),
      },
    }).catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Team Lead");
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
              [Op.like]: "%Supervisor%",
            },
          },
          {
            notification_title: {
              [Op.like]: "%Message from your Supervisor%",
            },
          },
        ],
      },
    }).catch((error) => {
      console.error("Error in finding Notification Text");
      console.trace(error);
      return null;
    });

    let messageConveyed = await Database.TeamLead_Notifications.bulkCreate(
      teamMember.map((member) => {
        return {
          team_L_id: member.dataValues.team_L_id,
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
      teamMember = notificationID = messageConveyed = null;
      res.end();
    } else {
      res.status(200).send({ status: "Successfully, Message has been send" });
      teamMember = notificationID = messageConveyed = null;
      res.end();
    }
  });

/**
 * Controller for sending message to all the team member
 */
router
  .route("/conveyMessageToAllTeamLead/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    let teamMember = await Database.Team_Lead.findAll({
      attributes: ["team_L_id"],
      where: {
        sup_id: req.session.profileData.sup_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Team Lead");
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
              [Op.like]: "%Supervisor%",
            },
          },
          {
            notification_title: {
              [Op.like]: "%Message from your Supervisor%",
            },
          },
        ],
      },
    }).catch((error) => {
      console.error("Error in finding Notification Text");
      console.trace(error);
      return null;
    });

    let messageConveyed = await Database.TeamLead_Notifications.bulkCreate(
      teamMember.map((member) => {
        return {
          team_L_id: member.dataValues.team_L_id,
          notification_text: req.body.messageText,
          notification_id: notificationID.dataValues.notification_id,
        };
      })
    ).catch((error) => {
      console.error("Error in creating TeamLead Notifications");
      console.trace(error);
      return null;
    });

    if ((teamMember, notificationID, messageConveyed === null)) {
      res.status(500).send({ error: "Please try again" });
      teamMember = notificationID = messageConveyed = null;
      res.end();
    } else {
      res.status(200).send({ status: "Successfully, Message has been send" });
      teamMember = messageConveyed = notificationID = null;
      res.end();
    }
  });

/**
 * Controller for sending message to all the team member
 */
router
  .route("/getAgenciesFromCityArea/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
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
          paused: 0,
        },
      })
        .then((cityData) =>
          Database.Team_Lead.findAll({
            attributes: ["team_L_id"],
            where: {
              sup_id: req.session.profileData.sup_id,
              team_L_isDeleted: 0,
              team_L_isPaused: 0,
              city_area_id: cityData.city_area_id,
            },
            include: {
              model: Database.Field_Executive,
              required: true,
              attributes: ["field_id"],
              where: {
                field_isDeleted: 0,
                field_isPaused: 0,
              },
            },
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
              exclude: ["updateTimestamp", "field_id"],
            },
            where: {
              field_id: fieldExecutive,
            },
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
  .route("/pauseAgency/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    /**
     * checking if the req.body
     *
     */
    let agencies = await Database.Agency_Info.findOne({
      where: {
        agency_uuid: req.body.agencyUUID,
      },
    })
      .then((agency) => {
        agency.update(
          {
            isPaused: agency.dataValues.isPaused === true ? false : true,
          },
          {
            sup_id: req.session.profileData.sup_id,
            man_id: 0,
            individualHooks: true,
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
  .route("/deleteAgency/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    /**
     * checking if the req.body
     *
     */
    let agencies = await Database.Agency_Info.findOne({
      where: {
        agency_uuid: req.body.agencyUUID,
      },
    })
      .then((agency) => {
        agency.update(
          {
            deleted: agency.dataValues.deleted === true ? false : true,
          },
          {
            sup_id: req.session.profileData.sup_id,
            man_id: 0,
            individualHooks: true,
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
 * reading all the notification to isRead to true
 * so it will make the notification is read
 */
router.route("/readAllSupervisorNotifications").post(async (req, res) => {
  const Notifications = await Database.SuperVisorNotification.update(
    {
      isRead: true,
    },
    {
      where: {
        sup_id: req.session.profileData.sup_id,
        isRead: false,
      },
    }
  ).then((response) => {
    if (response) return response;
  });

  if (Notifications) res.send({ status: "Updated" });
});

//pause the field executive  recommendation to
router
  .route("/supervisor/declineRecommendation/:sup_uuid")
  .put(isUserAuthentic, async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Advertisement_Recommendation.findOne({
      where: {
        advert_recom_uuid: req.body.uuid,
        deleted: false,
        paused: false,
        status: true,
        team_lead_forward_status: true,
      },
    })
      .then((result) => {
        if (result) {
          result.update({
            sup_id: req.session.profileData.sup_id,
            sup_dateTime: new Date().toUTCString(),
            sup_decline_status: true,
            sup_decline_descr: req.body.reason,
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
router
  .route("/supervisor/approveRecommendation/:sup_uuid")
  .put(isUserAuthentic, async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Advertisement_Recommendation.findOne({
      where: {
        advert_recom_uuid: req.body.uuid,
        deleted: false,
        paused: false,
        status: true,
        team_lead_forward_status: true,
      },
    })
      .then((result) => {
        if (result) {
          result.update({
            sup_id: req.session.profileData.sup_id,
            sup_dateTime: new Date().toUTCString(),
            sup_forward_status: true,
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

router.route("/removeTeamLeadfromteamm").put(async (req, res) => {
  // checking the user inofrmation from the database and also getting the role and field id
  const teamleadInfo = await Database.User_Login_Information.findOne({
    attributes: ["login_id", "user_role_id"],
    include: {
      model: Database.Team_Lead,
      required: true,
      attributes: ["team_L_id"],
      where: {
        //using the UUID from the front end
        team_L_uuid: req.body.id,
        team_L_isDeleted: false,
        team_L_isPaused: false,
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

  //  and adding the Field Executive to the NULL
  const updateExecutiveToTeam = await sequelize
    .query(
      `UPDATE team_lead SET sup_id = NULL WHERE team_L_uuid = '${req.body.id}';`,
      null,
      { raw: true }
    )
    .then((response) => {
      return response;
    })

    .catch((err) => {
      if (err) {
        console.log("Error Updating the Supervisor Info");
        console.trace(err);
        return null;
      }
    });

  //update the role of the user to Field Executive

  // adding the role information into the roleChanged table
  const roleChanged = await Database.ChangeTeamLeadRoleLogs.create({
    previousRole: teamleadInfo.dataValues.user_role_id,
    newRole: 0,
    team_L_id: teamleadInfo.dataValues.Team_Lead.dataValues.team_L_id,
    sup_id: req.session.profileData.sup_id,
  }).catch((err) => {
    if (err) {
      console.log("Error Creating the User Role Change Info");
      console.trace(err);
      return null;
    }
  });

  //sending the response to the user
  if ((teamleadInfo, updateExecutiveToTeam, roleChanged)) {
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
 * here is the removing the area from the executive
 */

router.route("/supervisor/removeAreaofTeamLead").put(async (req, res) => {
  //getting the sector ID from the database
  let sectorID = await Database.City_Areas.findOne({
    attributes: ["city_area_id"],
    include: {
      model: Database.Team_Lead,
      required: true,
      attributes: [],
      where: {
        team_L_uuid: req.body.executiveUUID,
        team_L_isDeleted: 0,
        team_L_isPaused: 0,
        sup_id: req.session.profileData.sup_id,
      },
    },
    where: {
      city_area_uuid: req.body.selectedArea,
      deleted: 0,
      paused: 0,
    },
  })
    .then((result) => {
      if (result) return result;
    })
    .catch((err) => {
      if (err) {
        console.error("Error Fetching Remove Area Information");
        console.trace(err);
        return null;
      }
    });

  if (sectorID) {
    let updateTeamLeadStatus = await sequelize
      .query(
        `UPDATE team_lead SET city_area_id = NULL WHERE team_L_uuid = '${req.body.executiveUUID}';`,
        null,
        { raw: true }
      )
      .then((response) => {
        console.log(response);
        if (response) return response;
      })

      .catch((err) => {
        if (err) {
          console.log("Error Updating the Team Lead Info");
          console.trace(err);
          return null;
        }
      });

    if (updateTeamLeadStatus) {
      res.status(200).send({
        status: "success",
        message: "Area Removed Successfully",
        updateTeamLeadStatus,
      });
      sectorID = updateTeamLeadStatus = null;
      res.end();
    } else {
      sectorID = updateTeamLeadStatus = null;
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

module.exports = { router };

// Database.Role_ExtraInfo()()()().create({
//   target: "150",
//   salary: "85100",
//   commission: "1.5%",
//   user_role_id: 4
// }).then((d) => {
//   console.log("Hello", d);
// });

// (async function () {

//   let teamLeadID = await Database.City.findAll({
//     attributes: ["city_id"],
//     where: {
//       city_uuid: "415b3e45-9dde-432c-b453-b139a7ec6705",
//       deleted: 0,
//       paused: 0
//     }
//   })
//     .then(
//       (cityAssosiate) => cityAssosiate.map((city) => city.city_id)
//       // .map(
//       //   (supervisor) => supervisor.City_and_Supervisor_associate
//       // )
//     )
//     .then((data) =>
//       Database.City_and_Supervisor_associate.findAll({
//         where: {
//           city_id: data
//         }
//       })
//     )
//     .then((data) => data.map((assos) => assos.city_supp_assos_id))
//     .then((data) =>
//       Database.City_Areas.findAll({
//         where: {
//           city_supp_assos_id: data
//         }
//       })
//     )
//     .then((data) => data.map((areas) => areas.city_area_id))
//     .then((data) =>
//       Database.Team_Lead.findAll({
//         where: {
//           city_area_id: data
//         }
//       })
//     )
//     .then((data) => data.map((team) => team.team_L_id))

//     /**
//      * getting the members from the database
//      */

//      let teamMember = await Database.Field_Executive.findAll({
//       attributes: ["field_id", "field_uuid", "field_name"],
//       where: {
//         team_L_id: teamLeadID,
//         field_isDeleted: 0,
//         field_isPaused: 0
//       }
//     }).catch((error) => {
//       if (error) {
//         console.error("Error Fetching the Data of Executive");
//         console.trace(error);
//         return null;
//       }
//     });

//     /**
//      * getting the activities per month from the db
//      */
//     const activitiesPerMonth = await Database.Activities.findAll({
//       attributes: [
//         [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
//         [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
//         [sequelize.fn("COUNT", sequelize.col("*")), "activitiesPerMonth"]
//         // [
//         //   sequelize.fn("COUNT", sequelize.col("cancelled")),
//         //   "cancelledactivitiesPerMonth"
//         // ]
//       ],
//       group: ["moonth", "Year"],
//       where: {
//         field_id: teamMember.map((member) => member.field_id),
//         deleted: false,
//         paused: false
//       }
//     })
//       .then((dbResponse) => {
//         if (dbResponse.length > 0) return dbResponse;
//         else return null;
//       })
//       .catch((error) => {
//         if (error) {
//           console.error(
//             "There is an error which fetching activities per month " + error
//           );
//           return null;
//         }
//       });

//     /**
//      * getting the cancelled activities from the db
//      */

//     const cancelledactivitiesPerMonth = await Database.Activities.findAll({
//       attributes: [
//         [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
//         [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
//         [
//           sequelize.fn("COUNT", sequelize.col("cancelled")),
//           "cancelledactivitiesPerMonth"
//         ]
//       ],
//       group: ["moonth", "Year"],
//       where: {
//         field_id: teamMember.map((member) => member.field_id),
//         deleted: false,
//         paused: false,
//         cancelled: true
//       }
//     })
//       .then((dbResponse) => {
//         if (dbResponse.length > 0) return dbResponse;
//         else return null;
//       })
//       .catch((error) => {
//         if (error) {
//           console.error(
//             "There is an error which fetching activities per month " + error
//           );
//           return null;
//         }
//       });

//     /**
//      * getting the agency per month from the db
//      */
//     const agencyCount = await Database.Agency_Info.findAll({
//       attributes: [
//         [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
//         [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
//         [sequelize.fn("COUNT", sequelize.col("*")), "agencyCount"]
//       ],
//       group: ["moonth", "Year"],
//       where: {
//         field_id: teamMember.map((member) => member.field_id),
//         deleted: false,
//         isPaused: false
//       }
//     })
//       .then((dbResponse) => {
//         if (dbResponse.length > 0) return dbResponse;
//         else return null;
//       })
//       .catch((error) => {
//         if (error) {
//           console.trace(error);
//           console.error(
//             "There is an error which fetching activities per month"
//           );
//           return null;
//         }
//       });

//   // console.log("Team Leads: " , teamLeadID);
//   // console.log("Team Member: " , teamMember);
//   console.log("Activities : " , activitiesPerMonth);
//   // console.log("Cancel: " , cancelledactivitiesPerMonth);
//   // console.log("agencyCount: " , agencyCount);

// })();
// (async function () {
//   Database.Agency_Info.update(
//     {
//       agency_name: "Testing_____1444777"
//     },
//     {
//       where: {
//         agency_uuid: "058541a2-0931-4856-8090-ab217534edb8"
//       },
//       sup_id: 1,
//       individualHooks: true
//       // plain: true
//     }
//   );
// .then((status) => {
//    console.log(status[1]);
// });

// Database.Agency_Info()()().create({
//   field_id: 4
// }).then((status) => {
//   console.log(status);
// });
// })();
// (async function () {
//   let agencies = await Database.City_Areas.findOne({
//     attributes: ["city_area_id"],
//     where: {
//       city_area_uuid: "8c27807b-a7ac-40b5-a58f-24b9eb3bfa93",
//       deleted: 0,
//       paused: 0
//     }
//   })
//     .then((cityData) =>
//       Database.Team_Lead.findAll({
//         attributes: ["team_L_id"],
//         where: {
//           sup_id: 1,
//           team_L_isDeleted: 0,
//           team_L_isPaused: 0,
//           city_area_id: cityData.city_area_id
//         },
//         include: {
//           model: Database.Field_Executive,
//           required: true,
//           attributes: ["field_id"],
//           where: {
//             field_isDeleted: 0,
//             field_isPaused: 0
//           }
//         }
//       })
//     )
//     .then((teamLead) => teamLead.map((team) => team.Field_Executives))
//     .then((teamLead) => {
//       let fieldExecutive = [];
//       teamLead.forEach((team) => {
//         team.forEach((field) => {
//           fieldExecutive.push(field.field_id);
//         });
//       });
//       return fieldExecutive
//     })
//     .then((fieldExecutive) =>
//       Database.Agency_Info.findAll({
//         attributes: {
//           exclude: ["updateTimestamp", "field_id"]
//         },
//         where: {
//           deleted: 0,
//           isPaused: 0,
//           field_id: fieldExecutive
//         }
//       })
//     )
//     .catch((error) => {
//       if (error) {
//         console.error("Error Fetching the Data of Agencies Information");
//         console.trace(error);
//         return null;
//       }
//     });
//   // agencies.forEach((eeee) => {
//   //   // console.log(eeee);
//   //   eeee.forEach((field) => {
//   //     console.log(field.field_id);
//   //   });
//   // });
// })();
