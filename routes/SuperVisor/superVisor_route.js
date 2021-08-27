const express = require("express"),
  router = express.Router(),
  { isUser_Login } = require("../Web_Pages/index"),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization");

/**
 * checking the user id or the UUID is the one who is into the session
 */
const isUserAuthentic = (req, res, next) => {
  if (req.params.sup_uuid === req.session.profileData.sup_uuid) next();
  else
    res.redirect(`/supervisor/dashboard/${req.session.profileData.sup_uuid}`);
};
/**
 * setting the dashboard
 * route for the supervisor
 */
router.get(
  "/dashboard/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    //getting the count of the notificaiton
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.sup_id
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
    let supervisorDashboard = await Database.Supervisor.findOne({
      attributes: [],
      include: [
        {
          model: Database.Managers,
          required: true,
          attributes: ["man_name"],
          where: {
            man_isDeleted: 0,
            man_isPaused: 0
          }
        },
        {
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
      ],
      where: {
        sup_id: req.session.profileData.sup_id,
        sup_isDeleted: 0,
        sup_isPaused: 0
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
        sup_name: req.session.profileData.sup_name,
        sup_userProfilePic: req.session.profileData.sup_userProfilePic,
        sup_username: req.session.profileData.sup_username,
        sup_contact: req.session.profileData.sup_contact,
        createdAt: req.session.profileData.createdAt,
        sup_salary: req.session.profileData.sup_salary,
        man_name: supervisorDashboard.dataValues.Manager.dataValues.man_name,
        Cities: supervisorDashboard.dataValues.Cities
      }
    );

    if (
      (webAds,
      unreadNotificationCount,
      profileData,
      supervisorDashboard === null)
    ) {
      res.status(500).redirect("/supervisor/signout");
      res.end();
    } else {
      res.status(200).render("Supervisor/dashboard", {
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.sup_uuid
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
    //   res.send({ js: "sjdbnk" });
  }
);

/**
 * Determining that the user have to complete the profile
 * if the user is new then he / she should complete the profile then move ahead
 */

router.get(
  "/completeProfile/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    if (req.session.profileData.sup_name === null) {
      res.status(200).render(`Supervisor/completeProfile`, {
        message: req.flash("info", "Please Complete your Profile"),
        url: req.protocol + "://" + req.get("host"),
        profileData: req.session.profileData.sup_userProfilePic
      });
    } else {
      res
        .status(200)
        .redirect(`/supervisor/dashboard/${req.session.profileData.sup_uuid}`);
    }
  }
);

/**
 * getting the user profile route here
 */
router.get(
  "/Profile/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    /**
     * getiing the user details for the profile
     */

    let supervisorData = await Database.Supervisor.findOne({
      attributes: {
        exclude: [
          "sup_isDeleted",
          "sup_isPaused",
          "login_id",
          "createdAt",
          "updateTimestamp",
          "man_id"
        ]
      },
      /**
       * getting the inner join with supervisor
       */
      include: [
        {
          //here it is using the many to many relationship
          model: Database.Managers,
          required: true,
          attributes: ["man_name"],
          where: {
            man_isPaused: 0,
            man_isDeleted: 0
          }
        },
        {
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
      ],
      where: {
        sup_uuid: req.session.profileData.sup_uuid,
        sup_isDeleted: 0,
        sup_isPaused: 0
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
      req.session.profileData.sup_id
    );

    res.render("Supervisor/profile", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.sup_uuid
      },
      role: req.session.passport.user.userRole.type_name,
      LoginEmail,
      supervisorData,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });

    LoginEmail = null;
    supervisorData = null;
  }
);

/**
 * getting the view agencies route to display all the agencies
 * from the city where the supervisor is currently working on
 */
router.get(
  "/viewAgencies/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    res.send({ sup_id: req.params.sup_uuid, viewAgencies: "View Agencies" });
  }
);

/**
 * getting the Progress Analytics  route to display all the team lead
 * of the supervisor is currently working on and also displaying the progress of the team by team.
 */
var data = [
  {
    id: 1,
    name: "Fizza",
    currentarea: "Islamabad",
    allottedarea: "ABC",
    message: "you have absabdshbd assdr",
    emplprogress: [70, 80, 90, 56, 63, 67, 89, 88, 76, 79, 100, 100],
    recommend_msg: "decrement 10%",
    salesAvg: "30%",
    TotalIncome: "100$",
    email: "abc@123.com"
  },
  {
    id: 2,
    name: "Afzal",
    currentarea: "Rawalpindi",
    allottedarea: "XYZ",
    message: "jhdshaisodja dfssefs sdfew ",
    emplprogress: [80, 90, 56, 63, 67, 89, 88, 76, 79, 60, 80, 90],
    recommend_msg: "increment 10%",
    salesAvg: "50%",
    TotalIncome: "400$",
    email: "abc@123.com"
  },
  {
    id: 3,
    name: "Hajra",
    currentarea: "Islamabad",
    allottedarea: "GHI",
    message: "asndbuwi  vbzdfgfv dfgds",
    emplprogress: [69, 87, 78, 95, 84, 75, 76, 68, 95, 73, 73, 72],
    recommend_msg: "No change",
    salesAvg: "70%",
    TotalIncome: "300$",
    email: "abc@123.com"
  },
  {
    id: 1,
    name: "Fizza",
    currentarea: "Islamabad",
    allottedarea: "ABC",
    message: "you have absabdshbd assdr",
    emplprogress: [70, 80, 90, 56, 63, 67, 89, 88, 76, 79, 100, 100],
    recommend_msg: "decrement 10%",
    salesAvg: "30%",
    TotalIncome: "100$",
    email: "abc@123.com"
  },
  {
    id: 2,
    name: "Afzal",
    currentarea: "Rawalpindi",
    allottedarea: "XYZ",
    message: "jhdshaisodja dfssefs sdfew ",
    emplprogress: [80, 90, 56, 63, 67, 89, 88, 76, 79, 60, 80, 90],
    recommend_msg: "increment 10%",
    salesAvg: "50%",
    TotalIncome: "400$",
    email: "abc@123.com"
  },
  {
    id: 3,
    name: "Hajra",
    currentarea: "Islamabad",
    allottedarea: "GHI",
    message: "asndbuwi  vbzdfgfv dfgds",
    emplprogress: [69, 87, 78, 95, 84, 75, 76, 68, 95, 73, 73, 72],
    recommend_msg: "No change",
    salesAvg: "70%",
    TotalIncome: "300$",
    email: "abc@123.com"
  }
];

router.get(
  "/progressAnalytics/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.sup_id
    );

    let cityNames = await Database.City.findAll({
      attributes: ["city_name",'city_uuid'],
      include: {
        model: Database.Supervisor,
        attributes: [],
        required: true,
        through: {
          attributes: []
        },

        where: {
          sup_id: req.session.profileData.sup_id,
          sup_isDeleted: 0,
          sup_isPaused: 0
        }
      },
      where: {
        paused: 0,
        deleted: 0
      }
    });

    res.render("Supervisor/progressOfExecutive", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.sup_uuid
      },
      role: req.session.passport.user.userRole.type_name,
      array: data,
      cityNames,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });
  }
);

/**
 * getting the Assign Area route to display all the team lead and their areas of working
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the area to the user
 */
router.get(
  "/assignArea/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    //getting the notification
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.session.profileData.sup_uuid
    );

    //getting the team lead city areas

    let areaSectors = await Database.City_Areas.findAll({
      attributes: ["city_name", "city_area_uuid", "city_code"],
      include: {
        model: Database.City_and_Supervisor_associate,
        required: true,
        attributes: [],
        where: {
          paused: 0,
          deleted: 0,
          sup_id: req.session.profileData.sup_id
        }
      },
      where: {
        paused: 0,
        deleted: 0
      }
    })
      .then((sectors) => {
        return sectors ? sectors : null;
      })
      .catch((error) => {
        console.error("Error in getting Area Sector");
        console.trace(error);
        return error ? null : true;
      });

    //getting all team member
    let allTeamLeads = await Database.Team_Lead.findAll({
      attributes: ["team_L_id", "team_L_uuid", "team_L_name", "team_L_contact"],
      where: {
        sup_id: req.session.profileData.sup_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0
      }
    })
      .then((member) => {
        return member ? member : null;
      })
      .catch((error) => {
        console.error(
          "Error in getting all the team members from the Database"
        );
        console.trace(error);
        return error ? null : true;
      });

    //getting the team member names and UUID

    let teamMember = await Database.Team_Lead.findAll({
      attributes: ["team_L_id", "team_L_uuid"],
      where: {
        sup_id: req.session.profileData.sup_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0
      },
      include: {
        model: Database.City_Areas,
        attributes: ["city_name", "city_area_uuid"],
        required: true,
        where: {
          paused: 0,
          deleted: 0
        }
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

    //end of getting data from DB

    if ((teamMember, areaSectors)) {
      res.status(200).render("Supervisor/allocateArea", {
        url: req.protocol + "://" + req.get("host"),
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.sup_uuid
        },
        teamMember,
        allTeamLeads,
        areaSectors,
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
      res.redirect(`/supervisor/dashboard/${req.session.profileData.sup_uuid}`);
    }
  }
);

/**
 * getting the Convey Message route to display all the team lead
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the area to the user
 */
router.get(
  "/conveyMessage/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    res.send({ sup_id: req.params.sup_uuid, conveyMessage: "Convey Message" });
  }
);

/**
 * getting the Manage Incentive route to display all the team lead
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the Manage Incentive to the user
 */
router.get(
  "/manageIncentive/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    res.send({
      sup_id: req.params.sup_uuid,
      manageIncentive: "Manage Incentive"
    });
  }
);

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});
/**
 * If there is invalid route so the user will be redirected to the dashboard
 */

router.route("*").get(async (req, res) => {
  res.redirect(`/supervisor/dashboard/${req.session.profileData.sup_uuid}`);
});

module.exports = { router, isUserAuthentic };

/**
 * getting the count of notifications from the database
 */
const countofNotificationOfExecutive = async (sup_id) => {
  return await Database.SuperVisorNotification.findAll({
    attributes: [
      [
        Database.sequelize.fn(
          "COUNT",
          Database.sequelize.col("supervisor_notification_id")
        ),
        "unreadNotificationCount"
      ]
    ],
    where: {
      isRead: false,
      sup_id
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

// (async function () {
//   let supervisorDashboard = await Database.Supervisor.findOne({
//     attributes: [],
//     include: [
//       {
//         model: Database.Managers,
//         required: true,
//         attributes: ["man_name"],
//         where: {
//           man_isDeleted: 0,
//           man_isPaused: 0
//         }
//       },
//       {
//         //this is the many to many relation ship
//         model: Database.City,
//         attributes: ["city_name"],
//         required: true,
//         through: {
//           attributes: []
//         },
//         where: {
//           paused: 0,
//           deleted: 0
//         }
//       }
//     ],
//     where: {
//       sup_id: 1,
//       sup_isDeleted: 0,
//       sup_isPaused: 0
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

//   console.log(supervisorDashboard.dataValues.Cities);
// })();

// (async function () {
//   let cityNames = await Database.City.findAll({
//     attributes: ["city_name"],
//     include: {
//       model: Database.Supervisor,
//       attributes: [],
//       required: true,
//       through: {
//         attributes: []
//       },

//       where: {
//         sup_id: 1,
//         sup_isDeleted: 0,
//         sup_isPaused: 0
//       }
//     },
//     where: {
//       paused: 0,
//       deleted: 0
//     }
//   });
//   console.log(cityNames);
// })();
