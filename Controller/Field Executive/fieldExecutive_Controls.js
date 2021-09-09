const {
    multerFile_Upload_Function
  } = require("../../Configuration Files/Multer Js/multer"),
  {
    Field_Executive,
    Role_ExtraInfo,
    Agency_Info,
    User_Role,
    List_sub_Activities,
    List_of_Packages,
    User_Login_Information,
    ExecutiveNotifications,
    Executive_Pending_Earning,
    Pendance_Clearance_Details,
    ComplainsOfActivities
  } = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  fs = require("fs"),
  { Op, QueryTypes } = require("sequelize");

const Activities = require("../../Configuration Files/Sequelize/Sequelize Models/Lists of Packages/Activities");
const NotificationText = require("../../Configuration Files/Sequelize/Sequelize Models/Notifications/NotificationText");

module.exports = (app) => {
  /**
   * Uploading the user profile image to the server
   * Updating the user profile image
   * in to the data base
   * and also using the Multer
   */

  app.route("/executive/upload").post(async (req, res) => {
    const userProfileImage = await Field_Executive.findOne({
      attributes: ["field_userProfilePic"],

      where: {
        login_id: req.session.passport.user.userInfo.login_id
      }
    });
    if (userProfileImage.dataValues.field_userProfilePic !== null) {
      fs.unlink(
        `./public/${userProfileImage.dataValues.field_userProfilePic}`,
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

        Field_Executive.update(
          {
            field_userProfilePic: filePath[1] + filename
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
  app.route("/executive/updateProfileInfo").post(async (req, res) => {
    const dbResponse = await Role_ExtraInfo.findOne({
      attributes: ["target", "commission", "salary"],
      include: {
        model: User_Role,
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
        console.error(
          "Error! Can not Fetch Commissions and Target from DB" + error
        );
        res.send({
          type: "danger",
          messages: "Error! Internal Error! "
        });
      });

    Field_Executive.update(
      {
        field_name: req.body.name,
        field_DOB: req.body.dob,
        field_contact: req.body.contact,
        field_username: req.body.username,
        field_target: dbResponse.dataValues.target,
        field_salary: dbResponse.dataValues.salary,
        field_commission: dbResponse.dataValues.commission
      },
      {
        where: {
          login_id: req.session.passport.user.userInfo.login_id
        }
      }
    )
      .then((response) => {
        if (response) {
          res.send({
            type: "success",
            messages: "Updated",
            uuid: req.session.profileData.field_uuid
          });
        }
      })
      .catch((error) => {
        console.error(error);
        res.send({
          type: "danger",
          messages: "Error! Internal Error! "
        });
      });
  });

  /**
   * Validating the agency record in this control and then
   * if the agency is not in our record then after the next()
   *
   */

  app.route("/startActivity").post(async (req, res, next) => {
    let userReqBody = { ...req.body };
    let latitude = (Math.round(userReqBody.latitude * 100) / 100).toFixed(2);
    let longitude = (Math.round(userReqBody.longitude * 100) / 100).toFixed(2);
    let lengthofUser_Req = Object.keys(userReqBody).length;

    //console.(userReqBody);
    Object.keys(userReqBody).forEach((key) => {
      if (
        userReqBody[key] === "select" ||
        userReqBody[key] === "update" ||
        userReqBody[key] === "insert"
      ) {
        delete userReqBody[key];
      }
    });

    if (Object.keys(userReqBody).length !== lengthofUser_Req)
      res.send({ error: "Invalid text" });
    else {
      const dbResponse = await Agency_Info.findOne({
        where: {
          deleted: false,
          isPaused: false,
          agency_name: {
            [Op.like]: `${userReqBody.agencyName}%`
          },
          agency_Longitude: {
            [Op.like]: `${longitude}%`
          },
          agency_Latitude: {
            [Op.like]: `${latitude}%`
          },
          agency_city: req.body.agencyCityName
        }
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          res.send({
            error: "Sorry! The System ran into Error. \n Please try again."
          });
        });

      if (dbResponse) {
        res.status(409).send({
          response: "Agency is already registered",
          help: "Tip: \nYou are working great. \n This Agency is already registered.\n Try Harder"
        });
      } else {
        next();
      }
    }
    userReqBody = null;
    latitude = null;
    longitude = null;
  });

  app.route("/startActivity").post(async (req, res) => {
    /**
     * Creating an agency
     */
    const dbResponse = await Agency_Info.create({
      agency_name: req.body.agencyName,
      agency_type: req.body.agencyType,
      agency_Contact: req.body.agencyContact,
      agency_address: req.body.agencyAddress,
      agency_Longitude: req.body.longitude,
      agency_Latitude: req.body.latitude,
      agency_owner_Name: req.body.agencyOwner,
      contactedPerson: req.body.contactedPerson,
      contactedPerson_Number: req.body.contactedPerson_Number,
      field_id: req.session.profileData.field_id,
      agency_city: req.body.agencyCityName
    })
      .then((response) => {
        if (response) return response;
      })
      .catch((error) => {
        if (error)
          res.send({
            error: "Sorry! Error in Adding new Agency! \n Please Try Again"
          });
      });

    if (dbResponse) {
      /**
       * Creating an Activity of the agency
       */
      const compapignActivity = await Activities.create({
        comp_id: req.body.CompaignID,
        field_id: req.session.profileData.field_id,

        agency_id: dbResponse.dataValues.agency_id
      })
        .then((response) => {
          if (response) return response;
        })
        .catch((error) => {
          if (error) {
            console.error(
              "Error! Creating a new Compaign Activity at Start Activity Controller" +
                error
            );
            return null;
          }
        });

      if (compapignActivity) {
        /**
         * Getting the list of the new agency, like the field_executive added the agency
         * getting the lists amount from db
         */
        const newAgencyDetails = await List_of_Packages.findOne({
          attributes: {
            exclude: [
              "list_deleted",
              "list_paused",
              "createdAt",
              "updateTimestamp"
            ]
          },
          where: {
            list_name: {
              [Op.like]: [`%New Agency%`]
            },
            list_deleted: false,
            list_paused: false
          }
        });

        if (newAgencyDetails) {
          /**
           * if the list agency list details are fetched than go ahead
           * and add the sub activity and start the activities
           */
          const sub_Activities = List_sub_Activities.create({
            list_id: newAgencyDetails.dataValues.list_id,
            list_act_id: compapignActivity.dataValues.list_act_id
          })
            .then((response) => {
              if (response) return response;
            })
            .catch((error) => {
              if (error) {
                console.error(
                  "There is error to start Sub Activity \n" + error
                );
                return null;
              }
            });

          /**
           * sending the user to move to the acitivity page
           */
          if (sub_Activities) {
            req.session.activityDetails = {
              activity: compapignActivity.list_act_uuid,
              agencyID: dbResponse.dataValues.agency_id
            };
            res.send({
              success: "Activity Started Successfully ",
              activity: compapignActivity.list_act_uuid,
              agencyID: dbResponse.dataValues.agency_id
            });
          }
        } else {
          res.send({
            error: "There is error to start Sub Activity "
          });
        }
      }
    }
  });

  /**
   * Completing the activities
   * again all the packages which the packages are not describes to the agency
   * to validate the and to prevent any kind of error or some one try to pass through it
   */
  app.route("/completeListActivites").post(async (req, res, next) => {
    /**
     * Updating the agency first visit
     */

    const AgencyUpdate = await Agency_Info.update(
      {
        firstVisit: true
      },
      {
        where: {
          agency_id: req.session.activityDetails.agencyID
        }
      }
    )
      .then()
      .catch((error) => {
        console.error("Error with updating Agency First Visit Status" + error);
      });

    if (AgencyUpdate) console.log("Agency Status Updated :: " + AgencyUpdate);
    /**
     * Again validating which packages are still the user have to describe to the agency
     */
    const subActivities = await List_sub_Activities.findAll({
      attributes: ["list_id"],
      include: {
        attributes: [
          "list_act_id",
          "list_act_uuid",
          "field_id",
          "comp_id",
          "agency_id"
        ],

        model: Activities,
        // don't use required: false to only return results where List_sub_Activities.Activities is not null
        // required: false,
        where: {
          agency_id: req.session.activityDetails.agencyID
        }
      },
      raw: true
    })
      .then((activities) => activities.map((activity) => activity.list_id))
      .then((activityIds) =>
        List_of_Packages.findAll({
          attributes: ["list_uuid"],
          where: {
            list_id: {
              [Op.notIn]: activityIds
            },
            list_name: {
              [Op.notLike]: "%New Agency%"
            }
          }
        })
      )
      .then((packages) => {
        if (packages) return packages;
      });

    const userSelectedActivities = JSON.parse(req.body.id).map(
      (id) => id.ActivityName
    );

    var count = 0;
    subActivities.forEach((package) => {
      userSelectedActivities.forEach((selectedPackages) => {
        if (package.dataValues.list_uuid === selectedPackages) {
          count++;
          return;
        }
      });
    });

    if (count === userSelectedActivities.length) next();
    else {
      res.status(400).send({ error: "Invalid Packages" });
    }
  });

  app.route("/completeListActivites").post(async (req, res) => {
    const userSelectedActivities = JSON.parse(req.body.id).map(
      (id) => id.ActivityName
    );

    /**
     * Now getting the Main activity id from the database to make the relationship with the
     * subactivities and to ensure that the user have start an activities and against
     * the same the user make sub activities
     */
    const ActivityID = await Activities.findOne({
      attributes: ["list_act_id", "list_act_uuid"],
      where: {
        list_act_uuid: req.session.activityDetails.activity
      }
    })
      .then((activityID) => {
        return activityID;
      })
      .catch((error) => {
        res.status(404).send({ error: "Invalid Activity" });
      });
    /**
     * Getting the list of packages id against which are selected by the user
     * and then adding in to the sub activities table
     * selecting here is just to prevent any kind of misleading info
     */

    const listOfPackage = await List_of_Packages.findAll({
      attributes: ["list_id", "isBank"],
      where: {
        list_uuid: userSelectedActivities
      }
    })
      .then((listofPackages) => {
        return listofPackages;
      })
      .catch((error) => {
        console.error(
          `\x1b[41m--------------------------------------\x1b[0m` + error
        );
        res.status(404).send({ error: "Sorry for Inconvience.! Try Again" });
      });

    listOfPackage.map((list) => {
      List_sub_Activities.create({
        list_act_id: ActivityID.dataValues.list_act_id,
        list_id: list.list_id
      })
        .then((response) => {
          if (response) {
            return response;
          }
        })
        .catch((error) => {
          console.error(
            `\x1b[41m--------------------------------------\x1b[0m` + error
          );
          res
            .status(404)
            .send({ error: "Sorry At this moment Packages are not Available" });
        });
    });

    const pendingDays = await Pendance_Clearance_Details.findOne({
      attributes: ["pending_days"],
      where: {
        paused: false,
        deleted: false
      }
    });

    /**
     * looking for the package that
     * it contains the bank sale or not...
     */
    let isBankSale = false;
    isBankSale = listOfPackage.find((bank) => bank.dataValues.isBank === true);

    /**
     * Adding the details of the activity to the pending clearance table
     */
    await Executive_Pending_Earning.create({
      clearanceDateTime: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * pendingDays.dataValues.pending_days
      ),
      field_id: req.session.profileData.field_id,
      list_act_id: ActivityID.dataValues.list_act_id,
      bank_sale: isBankSale === undefined ? false : true
    }).catch((error) => {
      console.error(
        `\x1b[41m------- Error in Creating Pending Earning ---------\x1b[0m` +
          error
      );
    });

    res.status(200).send({
      response: "Created All",
      list_act_uuid: ActivityID.dataValues.list_act_uuid
    });

    isBankSale = null;
  });

  app.route("/cancelActivity").post(async (req, res) => {
    const activityStatus = await Activities.update(
      {
        cancelled: true
      },
      {
        where: {
          list_act_uuid: req.session.activityDetails.activity,
          field_id: req.session.profileData.field_id
        }
      }
    );
    if (activityStatus) {
      res.status(200).send({
        response: "Cancelled Activity",
        uuid: req.session.profileData.field_uuid
      });
    } else {
      res.status(404).send({ error: "Try Again" });
    }
  });

  /***
   * get Agency Detail of already registered Agencies
   */

  app.route("/getAgencyDetails").post(async (req, res) => {
    let userReqBody = { ...req.body };
    let lengthofUser_Req = Object.keys(userReqBody).length;

    if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {
      const AgencyDetails = await Agency_Info.findOne({
        attributes: {
          exclude: [
            "agency_Longitude",
            "agency_Latitude",
            "firstVisit",
            "deleted",
            "isPaused",
            "updateTimestamp"
          ]
        },
        where: {
          agency_name: {
            [Op.like]: `%${userReqBody.agencyName}`
          },
          agency_city: {
            [Op.like]: `%${userReqBody.agencyCity}`
          },
          agency_address: {
            [Op.like]: `%${userReqBody.selectedAgencyAddress}`
          },
          deleted: false,
          isPaused: false
        },
        include: {
          attributes: ["field_name", "field_userProfilePic", "field_contact"],
          model: Field_Executive
        }
      });

      let status = AgencyDetails === null ? false : true;
      if (status)
        res
          .status(200)
          .send({ success: "Found", details: "Found", AgencyDetails });
      else res.status(404).send({ error: "error", details: "No Found" });
    } else
      res
        .status(404)
        .send({ error: "error", details: "Invalid values are entered" });
  });

  // req.session.activityDetails = {
  //   activity: compapignActivity.list_act_uuid,
  //   agencyID: dbResponse.dataValues.agency_id,
  // };

  app.route("/startActivityOnExsitingActivity").post(async (req, res) => {
    const AgencyDetails = await Agency_Info.findOne({
      attributes: ["agency_id", "agency_name"],
      where: {
        agency_id: req.body.agencyID,
        isPaused: false,
        deleted: false,
        firstVisit: true
      }
    });
    if (AgencyDetails) {
      /**
       * Starting a new activity on the given agency
       */
      const compapignActivity = await Activities.create({
        comp_id: req.body.CompaignID,
        field_id: req.session.profileData.field_id,

        agency_id: AgencyDetails.dataValues.agency_id
      })
        .then((response) => {
          if (response) return response;
        })
        .catch((error) => {
          if (error) {
            console.error(`\x1b[41m------Error! Creating a new Compaign Activity at Continue 
              Activities on Agency - \n\n ${error}-----\x1b[0m`);
            res.status(500).send({ error: "Sorry! Can not start Activity" });
          }
        });

      if (compapignActivity) {
        /**
         * Looking for the notification of already registered agency
         */
        const notificationText = await NotificationText.findOne({
          attributes: ["notification_id"],
          where: {
            isPaused: false,
            deleted: false,
            notification_title: {
              [Op.like]: "%Start%"
            },
            [Op.or]: [
              {
                notification_title: {
                  [Op.like]: "%Existing%"
                }
              },
              {
                notification_title: {
                  [Op.like]: "%Existing Agnecy%"
                }
              }
            ]
          }
        });
        await ExecutiveNotifications.create({
          field_id: req.session.profileData.field_id,
          notification_text: `You have started working on the Already Registered Agency ${AgencyDetails.dataValues.agency_name}...!!!`,
          notification_id: notificationText.dataValues.notification_id
        });
        req.session.activityDetails = {
          activity: compapignActivity.dataValues.list_act_uuid,
          agencyID: req.body.agencyID
        };
        res.status(200).send({
          agencyID: req.body.agencyID,
          uuid: `${compapignActivity.dataValues.list_act_uuid}`
        });
      }
    }
  });

  /**
   * manageProfileInfo is used from the my Profile page when user want to update the
   * information
   */

  app.route("/manageProfileInfo").post(async (req, res) => {
    let userReqBody = { ...req.body };
    let lengthofUser_Req = Object.keys(userReqBody).length;

    if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {
      /**
       * Updating the email if the user entered the new email address
       */
      const emailUpdate = await User_Login_Information.update(
        {
          login_email: userReqBody.email
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id
          }
        }
      );

      const updateExecutiveInfo = await Field_Executive.update(
        {
          field_name: userReqBody.fullname,
          field_contact: userReqBody.contact,
          field_DOB: userReqBody.dob,
          field_username: userReqBody.username
        },
        {
          where: {
            field_uuid: req.session.profileData.field_uuid
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

  app.route("/unreadAllNotifications").post(async (req, res) => {
    const Notifications = await ExecutiveNotifications.update(
      {
        isRead: true
      },
      {
        where: {
          field_id: req.session.profileData.field_id,
          isRead: false
        }
      }
    ).then((response) => {
      if (response) return response;
    });

    if (Notifications) res.send({ status: "Updated" });
  });

  app.route("/BankDeposit").post(async (req, res) => {
    /**
     * Checking for the req.body is null or not
     */
    if (Object.keys(req.body).length > 0) {
      await Executive_Pending_Earning.findOne({
        where: {
          list_act_id: req.body.activityID,
          paused: 0,
          deleted: 0,
          withdrawed: 0,
          bank_sale: 1,
          field_id: req.session.profileData.field_id
        }
      })
        .then((pendingEarning) => {
          if (pendingEarning) {
            if (pendingEarning.dataValues.bank_deposited) {
              res
                .status(406)
                .send({ error: "This Activity is already Deposited" });
              return;
            } else {
              pendingEarning
                .update({
                  bankName: req.body.bankName,
                  depositedAmount: req.body.depositedAmount,
                  totalAmount: req.body.totalAmount,
                  bank_deposited: 1,
                  bank_deposited_referenceNumber: req.body.transactionid,
                  bank_datetime: req.body.tranaction_date
                })
                .then((updateStatus) => {
                  if (updateStatus) {
                    res.status(200).send({ status: "Updated Successfully" });
                    return;
                  } else {
                    res.status(503).send({
                      error: "There is an Issue in Updating. Please Try Again."
                    });
                    return;
                  }
                });
            }
          } else {
            res.status(503).send({
              error:
                "There is an Issue in Getting Information. Please Try Again."
            });
            return;
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(503).send({
            error: "There is an Issue in Submitting. Please Try Again."
          });
        });
    }
  });

  app.route("/addComplain").post(async (req, res) => {
    if (Object.keys(req.body).length > 0) {
      const activity = await Activities.findOne({
        attributes: ["list_act_id"],
        where: {
          deleted: 0,
          paused: 0,
          list_act_uuid: req.body.UUID
        }
      })
        .then()
        .catch((error) => {
          if (error) {
            console.error("Error fetching Activity Details");
            return null;
          }
        });

      if (activity === null) {
        res.status(400).send({ error: "Invalid Information" });
        res.end();
      } else {
        const complain = await ComplainsOfActivities.create({
          subject: req.body.subject,
          message: req.body.complainMessage,
          list_act_id: activity.dataValues.list_act_id,
          field_id: 4 //req.session.profileData.field_id,
        })
          .then()
          .catch((error) => {
            if (error) {
              console.error("Error at creating Complain");
              console.trace(error);
              return null;
            }
          });

        if (complain === null) {
          res
            .status(503)
            .send({ error: "Service Unavailable .Please try again later." });
        } else res.status(200).send({ status: "Created" });
      }
    } else {
      console.error("Invalid Information from client");
      res.status(400).send({ error: "Invalid Information" });
      res.end();
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
// for (const iterator in List_sub_Activities.rawAttributes) {
//   //console.(`\x1b[36m${iterator}\x1b[0m`);
// }
// //console.('--------------------------------------------------------');
// for (const iterator in List_of_Packages.rawAttributes) {
//   //console.(iterator);
// }

// select * from lists l where l.list_id not in
//   (SELECT sub.list_id from list_sub_activities sub left join.
// Activities a on a.list_act_id = sub.list_act_id where a.agency_id = 2)

// select * from lists l where l.list_id not in(SELECT sub.list_id from list_sub_activities sub)

// List_of_Packages.findAll({
//   attributes: ['list_name'],
//   where: {
//     list_id: {
//       [Op.notIn]: [List_sub_Activities.findOne({
//         attributes: ['list_id'],
//         include: {
//           model: Activities,
//           attributes: ['agency_id'],
//           required: false,
//           where: {
//             agency_id: 2
//           }
//         }
//       })
//       ]
//     }
//   }
// })
//   .then((response) => {
//     for (const iterator of response) {
//       //console.(iterator.list_name);
//     }
//     // //console.(response);
//   })

// sequelize.query(`select l.list_id,l.list_uuid,l.list_amount,l.list_name,l.list_description
//                 from lists l where l.list_id not in
//                 (SELECT sub.list_id from list_sub_activities sub left join.
//                  Activities a on a.list_act_id = sub.list_act_id where a.agency_id = 2)`,
//   {
//     type: QueryTypes.SELECT,
//   })
//   .then((response) => {
//     // for (const iterator of response) {
//     //   //console.(iterator.list_name);
//     // }
//     //console.(response);
//   })

// List_of_Packages.create({
//   list_name: 'Testing1222'
// }).then((response) => {
//   //console.(response);
// })
