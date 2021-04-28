const Multer = require("../../Configuration Files/Multer Js/multer"),
  {
    Field_Executive,
    Role_ExtraInfo,
    Agency_Info,
    List_Activities,
    Compaign_Activities,
    User_Role,
    List_sub_Activities,
    List_of_Packages,
  } = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  { Op, QueryTypes } = require("sequelize");

const Activities = require("../../Configuration Files/Sequelize/Sequelize Models/Lists of Packages/Activities");

module.exports = (app) => {
  /**
   * Uploading the user profile image to the server
   * Updating the user profile image
   * in to the data base
   * and also using the Multer
   */
  app.route("/executive/upload").post((req, res) => {
    Multer.fileUpload_Specs(req, res, (err) => {
      if (err) {
        return res.send({ messages: err, type: "danger" });
      } else {
        let filename = req.files[0].filename;
        let filePath = req.files[0].destination.split("./public");

        Field_Executive.update(
          {
            field_userProfilePic: filePath[1] + filename,
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
  app.route("/executive/updateProfileInfo").post(async (req, res) => {
    const dbResponse = await Role_ExtraInfo.findOne({
      attributes: ["target", "commission", "salary"],
      include: {
        model: User_Role,
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
        console.log(
          "Error! Can not Fetch Commissions and Target from DB" + error
        );
        res.send({
          type: "danger",
          messages: "Error! Internal Error! ",
        });
      });

    Field_Executive.update(
      {
        field_name: req.body.name,
        field_contact: req.body.contact,
        field_username: req.body.username,
        field_target: dbResponse.dataValues.target,
        field_salary: dbResponse.dataValues.salary,
        field_commission: dbResponse.dataValues.commission,
      },
      {
        where: {
          login_id: req.session.passport.user.userInfo.login_id,
        },
      }
    )
      .then((response) => {
        if (response) {
          res.send({
            type: "success",
            messages: "Updated",
            uuid: req.session.profileData.field_uuid,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        res.send({
          type: "danger",
          messages: "Error! Internal Error! ",
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
            [Op.like]: `${userReqBody.agencyName}%`,
          },
          agency_Longitude: {
            [Op.like]: `${longitude}%`,
          },
          agency_Latitude: {
            [Op.like]: `${latitude}%`,
          },
        },
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          res.send({
            error: "Sorry! The System ran into Error. \n Please try again.",
          });
        });

      if (dbResponse) {
        res.status(409).send({
          response: "Agency is already registered",
          help:
            "Tip: \nYou are working great. \n This Agency is already registered.\n Try Harder",
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
    })
      .then((response) => {
        if (response) return response;
      })
      .catch((error) => {
        if (error)
          res.send({
            error: "Sorry! Error in Adding new Agency! \n Please Try Again",
          });
      });

    if (dbResponse) {
      /**
       * Creating an Activity of the agency
       */
      const compapignActivity = await Activities.create({
        comp_id: req.body.CompaignID,
        field_id: req.session.profileData.field_id,
        agency_id: dbResponse.dataValues.agency_id,
      })
        .then((response) => {
          if (response) return response;
        })
        .catch((error) => {
          if (error) {
            console.log(
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
              "updateTimestamp",
            ],
          },
          where: {
            list_name: {
              [Op.like]: [`%New Agency%`],
            },
            list_deleted: false,
            list_paused: false,
          },
        });

        if (newAgencyDetails) {
          /**
           * if the list agency list details are fetched than go ahead
           * and add the sub activity and start the activities
           */
          const sub_Activities = List_sub_Activities.create({
            list_id: newAgencyDetails.dataValues.list_id,
            list_act_id: compapignActivity.dataValues.list_act_id,
            amount: newAgencyDetails.dataValues.list_amount,
          })
            .then((response) => {
              if (response) return response;
            })
            .catch((error) => {
              if (error) {
                console.log("There is error to start Sub Activity \n" + error);
                return null;
              }
            });

          /**
           * sending the user to move to the acitivity page
           */
          if (sub_Activities) {
            req.session.activityDetails = {
              activity: compapignActivity.list_act_uuid,
              agencyID: dbResponse.dataValues.agency_id,
            };
            res.send({
              success: "Activity Started Successfully ",
              activity: compapignActivity.list_act_uuid,
              agencyID: dbResponse.dataValues.agency_id,
            });
          }
        } else {
          res.send({
            error: "There is error to start Sub Activity ",
          });
        }
      }
    }
  });

  app.route("/completeListActivites").post(async (req, res) => {
    for (const iterator of JSON.parse(req.body.id)) {
      console.log(iterator.ActivityName);
    }
  });
};

// for (const iterator in List_sub_Activities.rawAttributes) {
//   console.log(`\x1b[36m${iterator}\x1b[0m`);
// }
// console.log('--------------------------------------------------------');
// for (const iterator in List_of_Packages.rawAttributes) {
//   console.log(iterator);
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
//       console.log(iterator.list_name);
//     }
//     // console.log(response);
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
//     //   console.log(iterator.list_name);
//     // }
//     console.log(response);
//   })

// List_of_Packages.create({
//   list_name: 'Testing1222'
// }).then((response) => {
//   console.log(response);
// })
