const router = require("express").Router(),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  { validateToken } = require("../Web/webAPI"),
  sequelize = require("../../Configuration Files/Sequelize/Sequelize"),
  { Op } = require("sequelize"),
  pakistanCityName = require("../../resources/pakistanCityName");

/**
 * Here in the param it is the field uuiid
 */

router.get(
  "/dashboard",
  // validateToken,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );

    const webAds = await Database.WebAds.findAll({
      attributes: ["title", "description", "picPath"],
      where: {
        paused: 0,
        deleted: 0,
        user_role_id: req.query.user_role_id,
      },
    });
    let profileData = await Database.Field_Executive.findOne({
      attributes: [
        "field_name",
        "field_userProfilePic",
        "createdAt",
        "field_DOB",
      ],
      where: {
        field_uuid: req.query.field_uuid,
      },
    });

    res.status(200).send({
      url: req.protocol + "://" + req.get("host"),
      profileData,
      webAds,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
    unreadNotificationCount = null;
  }
);

//profile
router.get(
  "/Profile",
  // validateToken,
  async (req, res) => {
    /**
     * getiing the user details for the profile
     */

    const field = await Database.Field_Executive.findOne({
      attributes: {
        exclude: [
          "field_isDeleted",
          "field_isPaused",
          "login_id",
          "createdAt",
          "updateTimestamp",
          "team_L_id",
        ],
      },
      /**
       * getting the inner join with team lead
       */
      include: {
        model: Database.Team_Lead,
        attributes: ["team_L_name"],
        required: false,
        where: {
          team_L_isDeleted: 0,
          team_L_isPaused: 0,
        },
        /**
         * getting the inner join with team lead -> City_Areas
         */
        include: {
          model: Database.City_Areas,
          attributes: ["city_name"],
          required: false,
          where: {
            paused: 0,
            deleted: 0,
          },
        },
      },
      where: {
        field_uuid: req.query.field_uuid,
        field_isPaused: 0,
        field_isDeleted: 0,
      },
    });

    const LoginEmail = await Database.User_Login_Information.findOne({
      attributes: ["login_email"],
      where: {
        login_id: req.query.login_id,
        paused: 0,
        deleted: 0,
      },
    });

    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );

    const countOfTargetsActivities = await Database.Activities.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("list_act_id")), "activityTarget"],
      ],
      where: {
        field_id: req.query.field_id,
        [Op.and]: sequelize.literal(
          `month(createdAt) = '${new Date(Date.now()).getMonth()}'`
        ),
        paused: 0,
        deleted: 0,
        cancelled: 0,
      },
    });

    if ((countOfTargetsActivities, field)) {
      const field_executive_info = { ...field.dataValues };
      var teamLead_Info = {},
        City_Area_Info = {};

      if (field.dataValues.Team_Lead) {
        teamLead_Info = { ...field.dataValues.Team_Lead.dataValues };
        City_Area_Info = {
          ...field.dataValues.Team_Lead.dataValues.City_Area.dataValues,
        };
      }

      res.status(200).send({
        status: "Found",
        field_executive_info,
        teamLead_Info,
        City_Area_Info,
        LoginEmail,
        url: req.protocol + "://" + req.get("host"),
        countOfTargetsActivities,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
    } else {
      res
        .status(200)
        .send({
          status: "Invalid",
          message: "The system is unable to find the user. \nPlease try again",
        });
    }
    unreadNotificationCount = null;
    teamLead_Info = null;
  }
);




//start of the activity
router.get(
  "/startActivity",
  //  validateToken,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );
    /**
     * getting all the instructions for the activty to start
     */
    let activity_Instruc = await Database.Activity_Instruction.findAll({
      attributes: ["instructionText"],
      where: {
        isPaused: false,
        deleted: false,
      },
    })
      .then((instrucntions) => {
        return instrucntions;
      })
      .catch((error) => {
        if (error) {
          console.error("No Instructions Found " + error);
          return null;
        }
      });
    /**
     * getting the agency types
     */
    let agencyTypes = await Database.AgencyTypes.findAll({
      attributes: ["agencytype_id", "type_name"],
      where: {
        isPaused: false,
        deleted: false,
      },
    })
      .then((types) => {
        return types;
      })
      .catch((error) => {
        if (error) {
          console.error("No Types Found");
          return null;
        }
      });

    /**
     * getting all the compaigns on the basis of the user role
     */

    /**
     * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
     */
    let CompaignsList = await Database.Compaigns.findAll({
      attributes: ["comp_id", "comp_name"],
      where: {
        /**
         * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
         */
        [Op.or]: [
          {
            forFreelancers:
              req.query.userRole === "Field Executive" ? false : true,
          },
          { forAll: true },
        ],
      },
    })
      .then((compaigns) => {
        if (compaigns) {
          return compaigns;
        }
      })
      .catch((error) => {
        if (error) console.error("Error getting Compaigns" + error);
        return null;
      });

    res.status(200).send({
      url: req.protocol + "://" + req.get("host"),
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      agencyTypes,
      CompaignsList,
      pakistanCityName,
      instrucntions: activity_Instruc,
    });

    // Notification = null
    unreadNotificationCount = null;
  }
);

//controller API to handle the start API
router.route("/initiateActvity").post(async (req, res, next) => {
  let userReqBody = { ...req.body };

  let latitude = (Math.round(+userReqBody.latitude * 100) / 100).toFixed(2);
  let longitude = (Math.round(+userReqBody.longitude * 100) / 100).toFixed(2);
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
    const dbResponse = await Database.Agency_Info.findOne({
      where: {
        deleted: false,
        isPaused: false,
        [Op.or]: {
          agency_name: {
            [Op.like]: `%${req.body.agencyName}%`,
          },
          agency_Longitude: {
            [Op.like]: `${longitude}`,
          },
          agency_Latitude: {
            [Op.like]: `${latitude}`,
          },
          //   agency_city: req.body.agencyCityName,
        },
      },
    })
      .then((response) => {
        if (response) {
          return response;
        }
      })
      .catch((error) => {
        console.log(error);
        console.trace(error);
        res.send({
          error: "Sorry! The System ran into Error. \n Please try again.",
        });
        res.end();
        return;
      });

    if (dbResponse) {
      res.status(200).send({
        response: "Agency is already registered",
        help: "Tip: \nYou are working great. \n This Agency is already registered.\n Try Harder",
        message: "Please visit registered agency page.",
      });
      res.end();
      return;
    } else {
      next();
    }
  }
  userReqBody = null;
  latitude = null;
  longitude = null;
});

router.route("/initiateActvity").post(async (req, res) => {
  /**
   * Creating an agency
   */
  const dbResponse = await Database.Agency_Info.create({
    agency_name: req.body.agencyName,
    agency_type: req.body.agencyType,
    agency_Contact: req.body.agencyContact,
    agency_address: req.body.agencyAddress,
    agency_Longitude: req.body.longitude,
    agency_Latitude: req.body.latitude,
    agency_owner_Name: req.body.agencyOwner,
    contactedPerson: req.body.contactedPerson,
    contactedPerson_Number: req.body.contactedPerson_Number,
    field_id: req.body.field_id,
    agency_city: req.body.agencyCityName,
  })
    .then((response) => {
      if (response) return response;
    })
    .catch((error) => {
      if (error) {
        console.log(error);
        console.trace(error);
        res.send({
          error: "Sorry! Error in Adding new Agency! \n Please Try Again",
        });
        res.end();
        return;
      }
    });

  if (dbResponse) {
    /**
     * Creating an Activity of the agency
     */
    const compapignActivity = await Database.Activities.create({
      comp_id: req.body.CompaignID,
      field_id: req.body.field_id,

      agency_id: dbResponse.dataValues.agency_id,
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
      const newAgencyDetails = await Database.List_of_Packages.findOne({
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
        const sub_Activities = Database.List_sub_Activities.create({
          list_id: newAgencyDetails.dataValues.list_id,
          list_act_id: compapignActivity.dataValues.list_act_id,
        })
          .then((response) => {
            if (response) return response;
          })
          .catch((error) => {
            if (error) {
              console.error("There is error to start Sub Activity \n" + error);
              return null;
            }
          });

        /**
         * sending the user to move to the acitivity page
         */
        if (sub_Activities) {
          //   req.session.activityDetails = {
          //     activity: compapignActivity.list_act_uuid,
          //     agencyID: dbResponse.dataValues.agency_id,
          //   };
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

//route for the activities displayed on the screen
router.get("/activities", async (req, res) => {
  if (!req.params) {
    res.status(200).send({
      errorStatus: "Invalid Credentials",
      errorHeading: `The Agency or Activity is not same.`,
    });
  } else {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );
    let subActivities = await Database.List_sub_Activities.findAll({
      attributes: ["list_id"],
      where: {
        list_deleted: 0,
        list_paused: 0,
      },
      include: {
        attributes: [
          "list_act_id",
          "list_act_uuid",
          "field_id",
          "comp_id",
          "agency_id",
        ],

        model: Database.Activities,
        // don't use required: false to only return results where List_sub_Activities.Activities is not null
        // required: false,
        where: {
          agency_id: +req.query.agencyID,
          paused: 0,
          deleted: 0,
        },
      },
      raw: true,
    })
      .then((activities) => activities.map((activity) => activity.list_id))
      .then((activitiesList) => {
        if (activitiesList) return activitiesList;
        else return null;
      })
      .catch((err) => {
        if (err) {
          console.log("Error in Fetching Packages");
          console.trace(err);
          return null;
        }
      });

    if (subActivities === null) {
      res.send({
        status: "No Agency Found",
        url: req.protocol + "://" + req.get("host"),
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
    } else if (subActivities.length > 0) {
      let packagesList = await Database.List_of_Packages.findAll({
        attributes: [
          "list_uuid",
          "list_name",
          "list_description",
          "isBank",
          "bankAmount",
        ],
        where: {
          list_id: {
            [Op.notIn]: subActivities,
          },
          list_name: {
            [Op.notLike]: "%New Agency%",
          },
          list_deleted: 0,
          list_paused: 0,
        },
      });

      res.send({
        status: "Agency Found",
        packagesList,
        url: req.protocol + "://" + req.get("host"),
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
    } else {
      res.send({
        status: "No Agency Found",
        url: req.protocol + "://" + req.get("host"),
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
    }
    unreadNotificationCount = null;
  }
});

module.exports = { router };

const countofNotificationOfExecutive = async (field_id) => {
  return await Database.ExecutiveNotifications.findAll({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("execu_notification_id")),
        "unreadNotificationCount",
      ],
    ],
    where: {
      isRead: false,
      field_id,
    },
  }).then((notifications) => {
    if (notifications) return notifications;
  });
};
