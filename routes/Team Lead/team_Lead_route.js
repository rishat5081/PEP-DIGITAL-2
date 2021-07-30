const Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  {
    sequelize
  } = require("../../Configuration Files/Sequelize/Sequelize Models/Department"),
  { Op } = require("sequelize"),
  express = require("express"),
  router = express.Router(),
  { isUser_Login } = require("../Web_Pages/index");

/**
 * Checking if the user uuid  is the equal to the  session  uuid
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const isUserAuthentic = (req, res, next) => {
  if (req.params.teamLeadUUID === req.session.profileData.team_L_uuid) next();
  else
    res.redirect(`/teamlead/dashboard/${req.session.profileData.team_L_uuid}`);
};

/**
 * this is the dashboard
 */
router.get(
  "/dashboard/:teamLeadUUID",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    /**
     * getting the unread notification number
     */

    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.team_L_uuid
    );

    /**
     * getting the web ADS from the DB to display the user copany information
     */
    let webAds = await Database.WebAds.findAll({
      attributes: ["title", "description", "picPath"],
      where: {
        paused: 0,
        deleted: 0,
        user_role_id: req.session.passport.user.userRole.user_role_id
      }
    });

    /**
     * getting supervisor and city area name of the selected user who is currently
     * in the session
     */
    let teamLeadDashboard = await Database.Team_Lead.findOne({
      attributes: [],
      include: [
        {
          model: Database.Supervisor,
          required: true,
          attributes: ["sup_name"],
          where: {
            sup_isPaused: 0,
            sup_isDeleted: 0
          }
        },
        {
          model: Database.City_Areas,
          required: true,
          attributes: ["city_name"],
          where: {
            deleted: 0,
            paused: 0
          }
        }
      ],
      where: {
        team_L_id: req.session.profileData.team_L_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0
      }
    })
      .then((data) => {
        if (data) return data;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error("Error Fetchin Dashboard Data of Team Lead");
          console.trace(error);
          return null;
        }
      });

    let profileData = Object.assign(
      {},
      {
        team_L_name: req.session.profileData.team_L_name,
        team_L_userProfilePic: req.session.profileData.team_L_userProfilePic,
        team_L_username: req.session.profileData.team_L_username,
        team_L_contact: req.session.profileData.team_L_contact,
        createdAt: req.session.profileData.createdAt,
        team_L_salary: req.session.profileData.team_L_salary,
        sup_name: teamLeadDashboard.dataValues.Supervisor.dataValues.sup_name,
        city_name: teamLeadDashboard.dataValues.City_Area.dataValues.city_name
      }
    );

    if (
      (webAds, unreadNotificationCount, profileData, teamLeadDashboard === null)
    ) {
      res.status(500).redirect("/teamlead/signout");
      res.end();
    } else {
      res.status(200).render("Team Lead/teamDashboard", {
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.team_L_uuid
        },
        url: req.protocol + "://" + req.get("host"),
        user_role: req.session.passport.user.userRole,
        profileData,
        webAds,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        permissions: req.session.permissions.permissionObject
      });

      unreadNotificationCount = null;
      profileData = null;
      webAds = null;
      res.end();
    }
  }
);

/**
 * Determining that the user have to complete the profile
 * if the user is new then he / she should complete the profile then move ahead
 */

router.get("/completeProfile/:teamLeadUUID", isUser_Login, (req, res) => {
  if (req.session.profileData.team_L_name === null)
    res.status(200).render(`Team Lead/completeProfile`, {
      message: req.flash("info", "Please Complete your Profile"),
      profileData: req.session.profileData.team_L_userProfilePic
    });
  else {
    res
      .status(200)
      .redirect(
        `/teamlead/dashboard/${req.session.passport.user.userInfo.login_uuid}`
      );
  }
});

router.get(
  "/Profile/:teamLeadUUID",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    /**
     * getiing the user details for the profile
     */

    let teamLead = await Database.Team_Lead.findOne({
      attributes: {
        exclude: [
          "team_L_isDeleted",
          "team_L_isPaused",
          "login_id",
          "createdAt",
          "updateTimestamp",
          "sup_id",
          "city_area_id"
        ]
      },
      /**
       * getting the inner join with team lead
       */
      include: [
        {
          //here it is using the many to many relationship
          model: Database.Supervisor,
          required: true,
          attributes: ["sup_name"],
          where: {
            sup_isPaused: 0,
            sup_isDeleted: 0
          },
          include: {
            //this is the many to many relation ship
            model: Database.City,
            attributes: ["city_name"],
            required: true,
            through: {
              attributes: []
            },
            where: {
              paused: 0,
              deleted: 0
            }
          }
        },
        {
          model: Database.City_Areas,
          required: true,
          attributes: ["city_name"],
          where: {
            paused: 0,
            deleted: 0
          }
        }
      ],
      where: {
        team_L_uuid: req.session.profileData.team_L_uuid,
        team_L_isDeleted: 0,
        team_L_isPaused: 0
      }
    });

    // getting the email from the Login Info table
    let LoginEmail = await Database.User_Login_Information.findOne({
      attributes: ["login_email"],
      where: {
        login_id: req.session.passport.user.userInfo.login_id,
        paused: 0,
        deleted: 0
      }
    });
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.team_L_id
    );

    res.render("Team Lead/profile", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.team_L_uuid
      },
      role: req.session.passport.user.userRole.type_name,
      LoginEmail,
      teamLead,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });

    LoginEmail = null;
    teamLead = null;
  }
);

/**
 * making the route for the team lead to assign the area to their team member
 */
router.get(
  "/assignArea/:teamLeadUUID",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    //getting the notification
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.team_L_uuid
    );

    //getting the team lead city areas

    let areaSectors = await Database.City_Sectors.findAll({
      attributes: ["sector_name", "city_sector_uuid", "sector_code"],
      where: {
        paused: 0,
        deleted: 0,
        city_area_id: req.session.profileData.city_area_id
      }
    })
      .then((sectors) => {
        console.warn(sectors);
        return sectors ? sectors : null;
      })
      .catch((error) => {
        console.error("Error in getting Area Sector");
        console.trace(error);
        return error ? null : true;
      });

    //getting the team member names and UUID

    let teamMember = await Database.Field_Executive.findAll({
      attributes: ["field_id", "field_uuid", "field_name", "city_sector_id"],
      // include: {
      //   model: Database.City_Sectors,
      //   required: true,
      //   attributes: ["sector_name"],
      //   where: {
      //     paused: 0,
      //     deleted: 0
      //   }
      // },
      where: {
        team_L_id: req.session.profileData.team_L_id,
        field_isDeleted: 0,
        field_isPaused: 0
      }
    })
      .then((member) => {
        // console.warn(member);
        return member ? member : null;
      })
      .catch((error) => {
        console.error("Error in getting Member");
        console.trace(error);
        return error ? null : true;
      });

    let citySector = await Database.City_Sectors.findAll({
      where: {
        city_sector_id: teamMember.map((member) => member.city_sector_id)
      }
    });

    //end of getting data from DB

    if ((areaSectors, teamMember)) {
      res.status(200).render("Team Lead/allocateArea", {
        url: req.protocol + "://" + req.get("host"),
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.team_L_uuid
        },
        areaSectors,
        teamMember,
        citySector,
        user_role: req.session.passport.user.userRole,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        permissions: req.session.permissions.permissionObject
      });

      unreadNotificationCount = null;
      areaSectors = null;
      teamMember = null;
      res.end();
    } else {
      res.redirect(`/teamlead/dashboard/${req.session.profileData.team_L_id}`);
    }
  }
);

router.get(
  "/addFreelance/:teamLeadUUID",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    //getting the notificaton of the user
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.team_L_uuid
    );
    //getting the all executive which are no in any team they are working as freelance
    let teamMember = await Database.Field_Executive.findAll({
      attributes: ["field_uuid", "field_name", "field_contact"],
      include: {
        model: Database.User_Login_Information,
        required: true,
        attributes: ["login_email", "createdAt"],
        where: {
          paused: 0,
          deleted: 0
        }
      },
      where: {
        field_isDeleted: 0,
        field_isPaused: 0,
        team_L_id: null
      }
    })
      .then((member) => {
        return member ? member : null;
      })
      .catch((error) => {
        console.error("Error in getting Member");
        console.trace(error);
        return error ? null : true;
      });

    res.status(200).render("Team Lead/addFreelancertoTeam", {
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.team_L_uuid
      },
      teamMember,
      url: req.protocol + "://" + req.get("host"),
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });

    unreadNotificationCount = null;
    res.end();
  }
);

router.get(
  "/conveyMessage/:teamLeadUUID",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.team_L_uuid
    );

    res.status(200).render("Team Lead/conveyMessageToTeam", {
      array: data,
      area,
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.team_L_uuid
      },
      url: req.protocol + "://" + req.get("host"),
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });

    unreadNotificationCount = null;
    res.end();
  }
);

router.get(
  "/progressReport/:teamLeadUUID",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.team_L_uuid
    );

    res.status(200).render("Team Lead/progressOfExecutive", {
      url: req.protocol + "://" + req.get("host"),
      array: data,
      area,
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.team_L_uuid
      },
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });

    unreadNotificationCount = null;
    res.end();
  }
);

router.get(
  "/manageIncentive/:teamLeadUUID",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.team_L_uuid
    );

    res.status(200).render("Team Lead/manageIncentive", {
      url: req.protocol + "://" + req.get("host"),
      array: data,
      area
    });
  }
);

router.get(
  "/verifyActivity/:teamLeadUUID",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    res.send("verifyActivity");
  }
);

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

const countofNotificationOfExecutive = async (team_L_id) => {
  return await Database.TeamLead_Notifications.findAll({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("teamLead_notification_id")),
        "unreadNotificationCount"
      ]
    ],
    where: {
      isRead: false,
      team_L_id
    }
  })
    .then((notifications) => {
      if (notifications) return notifications;
      else return null;
    })
    .catch((error) => {
      if (error) {
        console.error("Error Fetching Notification Count");
        console.trace(error);
        return null;
      }
    });
};

module.exports = { router };

router.get("*", async (req, res) => {
  res.redirect(`/teamlead/dashboard/${req.session.profileData.team_L_id}`);
});

/***********************
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 *
 */
// async function name() {
//   let teamMember = await Database.Field_Executive.findAll({
//     attributes: ["field_id", "field_uuid", "field_name", "city_sector_id"],
//     // include: {
//     //   model: Database.City_Sectors,
//     //   required: true,
//     //   attributes: [],
//     //   where: {
//     //     paused: 0,
//     //     deleted: 0,
//     //     city_sector_id: {
//     //       [Op.or]: null
//     //     }
//     //   }
//     // },
//     where: {
//       team_L_id: 1,
//       field_isDeleted: 0,
//       field_isPaused: 0
//     }
//   });

//   let citySector = await Database.City_Sectors.findAll({
//     where: {
//       city_sector_id: teamMember.map((member) => member.city_sector_id)
//     }
//   });

//   console.log(teamMember);
//   console.log(citySector);

//   let data = [...teamMember, ...citySector];
// }
// name();

// async function name() {
//   let teamLeadDashboard = await Team_Lead.findOne({
//     attributes: [],
//     include: [
//       {
//         model: Supervisor,
//         required: true,
//         attributes: ["sup_name"],
//         where: {
//           sup_isPaused: 0,
//           sup_isDeleted: 0
//         },
//         include: {
//           model: City,
//           attributes: ["city_name"],
//           required: true,
//           through: {
//             attributes: []
//           },
//           where: {
//             paused: 0,
//             deleted: 0
//           }
//         }
//       }
//     ],
//     where: {
//       team_L_id: 1,
//       team_L_isDeleted: 0,
//       team_L_isPaused: 0
//     }
//   })
//     .then((data) => {
//       if (data) return data;
//       else return null;
//     })
//     .catch((error) => {
//       if (error) {
//         console.error("Error Fetchin Dashboard Data of Team Lead");
//         console.trace(error);
//         return null;
//       }
//     });

//   console.log(teamLeadDashboard.dataValues.Supervisor.dataValues.Cities);
//   // console.log(teamLeadDashboard.dataValues.City_Area.dataValues.City_and_Supervisor_associate.dataValues.city_supp_assos_id);
// }
// name()
