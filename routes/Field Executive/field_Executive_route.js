const {
  Activity_Instruction,
  Compaigns,
  List_sub_Activities,
  List_of_Packages,
  Agency_Info,
} = require("../../Configuration Files/Sequelize/Database_Synchronization");
AgencyTypes = require("../../Configuration Files/Sequelize/Sequelize Models/Agency Models/AgencyTypes"),
  { Op, QueryTypes } = require("sequelize"),
  Activities = require("../../Configuration Files/Sequelize/Sequelize Models/Lists of Packages/Activities"),
  express = require("express"),
  router = express.Router(),
  mainRouter = require("../Web_Pages/index"),
  /**
   * importing the pakistan City Name from the resourse folder
   */
  pakistanCityName = require('../../resources/pakistanCityName')

/**
* Here in the param it is the login id
*/
router.get("/dashboard/:id", mainRouter.isUser_Login, (req, res) => {
  // checkRole_GetData_FromDB(req.session.userInfo.userRole, req.session.userInfo.userInfo.login_id, res)
  console.log("Dashboard -----------> F Executive");
  res.status(200).render("Field Executive/dashboard", {
    info: {
      id: req.session.passport.user.userInfo.login_id,
      uuid: req.session.profileData.field_uuid,
    },
    role: req.session.passport.user.userRole,
    permissions: req.session.permissions.permissionObject,
  });
});

/**
 * Determining that the user have to complete the profile
 * if the user is new then he / she should complete the profile then move ahead
 */
/**
 * Here in the param it is the login id
 */

router.get("/completeProfile/:id", mainRouter.isUser_Login, (req, res) => {
  if (req.session.profileData.field_name === null)
    res.status(200).render(`Field Executive/completeProfile`, {
      message: req.flash("info", "Please Complete your Profile"),
    });
  else {
    res
      .status(200)
      .redirect(`/dashboard/${req.session.profileData.field_uuid}`);
  }
});

/**
 * this is the route for the page to start the activity
 * here the types of the agencies are getting from DB,
 * the compaigns which are going on are also coming from DB
 * also the instruction to start the activity also coming from DB
 */
router.get(
  "/startActivity/:fielduuid",
  mainRouter.isUser_Login,
  async (req, res) => {
    /**
     * getting all the instructions for the activty to start
     */
    let activity_Instruc = await Activity_Instruction.findAll({
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
        return "No Instructions Found " + error;
      });
    /**
     * getting the agency types
     */
    let agencyTypes = await AgencyTypes.findAll({
      attributes: ["agencytype_id", "type_name"],
      isPaused: false,
      deleted: false,
    })
      .then((types) => {
        return types;
      })
      .catch((error) => {
        return "No Types Found";
      });

    /**
     * getting all the compaigns on the basis of the user role
     */

    /**
     * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
     */
    let CompaignsList = await Compaigns.findAll({
      attributes: ["comp_id", "comp_name"],
      where: {
        /**
         * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
         */
        [Op.or]: [
          {
            forFreelancers:
              req.session.passport.user.userRole !== "Field Executive"
                ? true
                : false,
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
        if (error) console.log("Error getting Compaigns" + error);
        return null;
      });




    res.status(200).render("Field Executive/activity", {
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.field_uuid,
      },
      agencyTypes,
      CompaignsList,
      pakistanCityName,
      instrucntions: activity_Instruc,
      role: req.session.passport.user.userRole,
      permissions: req.session.permissions.permissionObject,
    });
  }
);

/**
 * this route is about the activities that are being performed by the
 * field executive when the user have start the activity
 * this route will be used for both,
 * both mean the user enter the new agency
 * or when the user select the agency
 */

router.get(
  "/activities/:agencyID/:activityUUID",
  mainRouter.isUser_Login,
  async (req, res) => {
    if (
      req.params.agencyID != req.session.activityDetails.agencyID ||
      req.params.activityUUID != req.session.activityDetails.activity
    ) {
      res.status(200).render("Web Appendage Pages/error", {
        errorStatus: "Invalid Credentials",
        errorHeading: `The Agency or Activity is not same.`,
      });
    } else {
      const subActivities = await List_sub_Activities.findAll({
        attributes: ["list_id"],
        include: {
          attributes: [
            "list_act_id",
            "list_act_uuid",
            "field_id",
            "comp_id",
            "agency_id",
          ],

          model: Activities,
          // don't use required: false to only return results where List_sub_Activities.Activities is not null
          // required: false,
          where: {
            agency_id: req.session.activityDetails.agencyID,
          },
        },
        raw: true,
      })
        .then((activities) => activities.map((activity) => activity.list_id))
        .then((activityIds) =>
          List_of_Packages.findAll({
            attributes: ["list_uuid", "list_name", "list_description"],
            where: {
              list_id: {
                [Op.notIn]: activityIds,
              },
              list_name: {
                [Op.notLike]: "%New Agency%",
              },
            },
          })
        )
        .then((packages) => {
          if (packages) {
            return packages;
          }
        });
      res.render("Field Executive/subActivitiesOnAgency", {
        subActivities,
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.field_uuid,
        },
        permissions: req.session.permissions.permissionObject,
      });
    }
  }
);





router.get("/viewAgencies/:fieldExeUUID", mainRouter.isUser_Login, async (req, res) => {

  const AgencyData = await Agency_Info.findAll({
    attributes: ['agency_name', 'agency_address']
  })
  let CompaignsList = await Compaigns.findAll({
    attributes: ["comp_id", "comp_name"],
    where: {
      /**
       * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
       */
      [Op.or]: [
        {
          forFreelancers: true
          // req.session.passport.user.userRole !== "Field Executive"
          //   ? true
          //   : false,
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
      if (error) console.log("Error getting Compaigns" + error);
      return null;
    });

  res.render("Field Executive/viewAllAgencies", {
    AgencyData,
    pakistanCityName,
    CompaignsList,
    info: {
      id: req.session.passport.user.userInfo.login_id,
      uuid: req.session.profileData.field_uuid,
    },
    permissions: req.session.permissions.permissionObject,
  });
});


router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
module.exports = { router };















