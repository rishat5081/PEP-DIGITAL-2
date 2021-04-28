const {
  Activity_Instruction,
  Compaigns,
  List_sub_Activities,
  List_of_Packages,
} = require("../../Configuration Files/Sequelize/Database_Synchronization");
const AgencyTypes = require("../../Configuration Files/Sequelize/Sequelize Models/Agency Models/AgencyTypes");
const { Op, QueryTypes } = require("sequelize");
const {
  sequelize,
} = require("../../Configuration Files/Sequelize/Sequelize Models/Lists of Packages/Activities");
const Activities = require("../../Configuration Files/Sequelize/Sequelize Models/Lists of Packages/Activities");
const express = require("express"),
  router = express.Router(),
  mainRouter = require("../Web_Pages/index");

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
  "/startActivity/:loginuuid",
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
  mainRouter.isUser_Not_Login,
  async (req, res) => {
    // if (
    //   req.params.agencyID != req.session.activityDetails.agencyID ||
    //   req.params.activityUUID != req.session.activityDetails.activity
    // ) {
    //   res.status(200).render("Web Appendage Pages/error", {
    //     errorStatus: "Invalid Credentials",
    //     errorHeading: `The Agency or Activity is not same.`,
    //   });
    // } else {
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
          agency_id: 29,
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
        if (packages) return packages;
      });
    res.render("Field Executive/subActivitiesOnAgency", {
      subActivities,
      // info: {
      //   id: req.session.passport.user.userInfo.login_id,
      //   uuid: req.session.passport.user.userInfo.login_uuid,
      // },
      // permissions: req.session.permissions.permissionObject,
    });
    // }
  }
);

router.get("/s", async (req, res) => {
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
        agency_id: 24,
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
        },
      })
    )
    .then((packages) => {
      if (packages) return packages;
    });
  res.render("Field Executive/subActivitiesOnAgency", { subActivities });
});

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/a", (req, res) => {
  res.render("Field Executive/viewAllAgencies");
});

module.exports = { router };

// async function a() {
//   // get an array of Activities with the list_id set
//   const activities = await List_sub_Activities.findAll({
//     attributes: ['list_id'],
//     include: {
//       model: Activities,
//       // don't use required: false to only return results where List_sub_Activities.Activities is not null
//       // required: false,
//       where: {
//         agency_id: 2,
//       },
//     },
//     raw: true,
//   });

//   // map the property to an array of just the IDs
//   const activityIds = activities.map((activity) => activity.list_id);

//   // now you can pass the activityIds to Op.notIn
//   const packages = await List_of_Packages.findAll({
//     attributes: ['list_name'],
//     where: {
//       list_id: {
//         [Op.notIn]: activityIds,
//       },
//     },
//   });
//   console.log(packages);
// }

// a()

const a = {
  "ids[0][ActivityName]": "336c77d3-bb16-44d6-9ec5-a4aecc742a57",
  "ids[0][ActivityTime]":
    "Tue Apr 27 2021 15:19:46 GMT+0500 (Pakistan Standard Time)",
  "ids[1][ActivityName]": "336c77d3-bb16-44d6-9ec5-a4aecc742a57",
  "ids[1][ActivityTime]":
    "Tue Apr 27 2021 15:19:48 GMT+0500 (Pakistan Standard Time)",
  "ids[2][ActivityName]": "7d218ff5-c75f-4a61-98a6-ab984a0a4827",
  "ids[2][ActivityTime]":
    "Tue Apr 27 2021 15:19:49 GMT+0500 (Pakistan Standard Time)",
  "ids[3][ActivityName]": "7d7cd5e3-3e6c-42f6-b99d-0d252095f998",
  "ids[3][ActivityTime]":
    "Tue Apr 27 2021 15:19:50 GMT+0500 (Pakistan Standard Time)",
};
