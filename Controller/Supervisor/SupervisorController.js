const router = require("express").Router(),
  fs = require("fs"),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  {
    sequelize
  } = require("../../Configuration Files/Sequelize/Sequelize Models/Department"),
  {
    multerFile_Upload_Function
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
        login_id: req.session.passport.user.userInfo.login_id
      }
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
            sup_userProfilePic: filePath[1] + filename
          },
          {
            where: {
              login_id: req.session.passport.user.userInfo.login_id
            }
          }
        ).then((response) => {
          if (response) {
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
  .route("/supervisor/updateProfileInfo/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
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
          messages: "Error! Please try Again! "
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
          sup_commission: dbResponse.dataValues.commission
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
              uuid: req.session.profileData.sup_uuid
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

      const updateExecutiveInfo = await Database.Supervisor.update(
        {
          sup_name: userReqBody.fullname,
          sup_contact: userReqBody.contact,
          sup_username: userReqBody.username
        },
        {
          where: {
            sup_uuid: req.session.profileData.sup_uuid
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
        paused: 0
      }
    });
    let executiveID = await Database.Team_Lead.update(
      {
        city_area_id: sectorID.dataValues.city_area_id
      },
      {
        where: {
          team_L_uuid: req.body.employees,
          team_L_isDeleted: 0,
          team_L_isPaused: 0
        }
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
        paused: 0
      }
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
            paused: 0
          }
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
            paused: 0
          }
        })
      )
      .then((cityAreas) => cityAreas.map((area) => area.city_area_id))
      .then((cityAreas_id) =>
        Database.Team_Lead.findAll({
          attributes: ["team_L_id", "team_L_uuid", "team_L_name"],
          where: {
            city_area_id: cityAreas_id,
            team_L_isDeleted: 0,
            team_L_isPaused: 0
          }
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
        field_isPaused: 0
      }
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
        [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
        [sequelize.fn("COUNT", sequelize.col("*")), "activitiesPerMonth"]
        // [
        //   sequelize.fn("COUNT", sequelize.col("cancelled")),
        //   "cancelledactivitiesPerMonth"
        // ]
      ],
      group: ["moonth", "Year"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        paused: false
      }
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
        [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
        [
          sequelize.fn("COUNT", sequelize.col("cancelled")),
          "cancelledactivitiesPerMonth"
        ]
      ],
      group: ["moonth", "Year"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        paused: false,
        cancelled: true
      }
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
        [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
        [sequelize.fn("COUNT", sequelize.col("*")), "agencyCount"]
      ],
      group: ["moonth", "Year"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        isPaused: false
      }
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
        teamLeadID
      });
      teamLeadID =
        teamMember =
        activitiesPerMonth =
        cancelledactivitiesPerMonth =
        agencyCount =
          null;
      res.end();
    } else {
      teamLeadID =
        teamMember =
        activitiesPerMonth =
        cancelledactivitiesPerMonth =
        agencyCount =
          null;
      res.status(500).send({ error: "Please try again" });
      res.end();
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
        team_L_isPaused: 0
      }
    });

    /**
     * getting the members from the database
     */

    let teamMember = await Database.Field_Executive.findAll({
      attributes: ["field_id", "field_uuid", "field_name"],
      where: {
        team_L_id: teamLeadID.map((team) => team.team_L_id),
        field_isDeleted: 0,
        field_isPaused: 0
      }
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
          [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
          [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
          [sequelize.fn("COUNT", sequelize.col("*")), "activitiesPerMonth"]
          // [
          //   sequelize.fn("COUNT", sequelize.col("cancelled")),
          //   "cancelledactivitiesPerMonth"
          // ]
        ],
        group: ["moonth", "Year"],
        where: {
          field_id: teamMember.map((member) => member.field_id),
          deleted: false,
          paused: false
        }
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
          [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
          [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
          [
            sequelize.fn("COUNT", sequelize.col("cancelled")),
            "cancelledactivitiesPerMonth"
          ]
        ],
        group: ["moonth", "Year"],
        where: {
          field_id: teamMember.map((member) => member.field_id),
          deleted: false,
          paused: false,
          cancelled: true
        }
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
          [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
          [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
          [sequelize.fn("COUNT", sequelize.col("*")), "agencyCount"]
        ],
        group: ["moonth", "Year"],
        where: {
          field_id: teamMember.map((member) => member.field_id),
          deleted: false,
          isPaused: false
        }
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
          agencyCount
        });
        teamLeadID =
          teamMember =
          activitiesPerMonth =
          cancelledactivitiesPerMonth =
          agencyCount =
            null;
        res.end();
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
        paused: 0
      }
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
            paused: 0
          }
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
            paused: 0
          }
        })
      );

    let teamLeads = await Database.Team_Lead.findAll({
      attributes: ["team_L_id", "team_L_uuid", "team_L_name", "city_area_id"],
      where: {
        city_area_id: teamLeadCityAreas.map((area) => area.city_area_id),
        team_L_isDeleted: 0,
        team_L_isPaused: 0
      }
    });

    if ((teamLeadCityAreas, teamLeads)) {
      res.status(200).send({
        status: "Displaying team lead",
        teamLeadCityAreas,
        teamLeads
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
        paused: 0
      }
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
            team_L_isPaused: 0
          }
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

    let giftAssigned = await Database.Advertisement_Stock.findOne({
      attributes: ["adver_stock_id"],
      wherer: {
        deleted: 0,
        paused: 0,
        advert_stock_uuid: req.body.gift
      }
    }).then((giftDetails) => giftDetails.adver_stock_id)

    // if ((teamLeadCityAreas, teamLeads)) {
    //   res.status(200).send({
    //     status: "Displaying team lead",
    //     teamLeadCityAreas,
    //     teamLeads
    //   });
    //   teamLeadCityAreas = teamLeads = null;
    //   res.end();
    // } else {
    //   teamLeadCityAreas = teamLeads = null;
    //   res.status(404).send({ error: "No Record Found" });
    //   res.end();
    // }

    res.status(200).send({ ok: "ok" });
    ////console.(req.body);
  });

module.exports = { router };

// Database.Role_ExtraInfo.create({
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
//         [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
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


