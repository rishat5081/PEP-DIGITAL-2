const express = require("express"),
  router = express.Router(),
  { Op } = require("sequelize"),
  { isUser_Login } = require("../Web_Pages/index"),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  sequelize = require("../../Configuration Files/Sequelize/Sequelize");

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
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
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
          console.error("Error Fetchin Dashboard Data of SuperVisor");
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
        profileData: req.session.profileData.sup_userProfilePic,
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.sup_uuid
        },
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
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
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
 * getting the Progress Analytics  route to display all the team lead
 * of the supervisor is currently working on and also displaying the progress of the team by team.
 */

router.get(
  "/progressAnalytics/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
      req.session.profileData.sup_id
    );

    let cityNames = await Database.City.findAll({
      attributes: ["city_name", "city_uuid"],
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
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
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
 * getting the Manage Incentive route to display all the team lead
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the Manage Incentive to the user
 */
router.get(
  "/manageIncentive/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
      req.session.profileData.sup_id
    );
    /**
     * getting all the Cities from the database
     */
    let cityNames = await Database.City.findAll({
      attributes: ["city_name", "city_uuid"],
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

    /**
     * Getting the advertisment which are allocated to the supervisor
     */

    let advertisment = await Database.Advertising_Stock_Allocation.findAll({
      attributes: [
        [
          sequelize.fn("SUM", sequelize.col("adver_stock_allocated_Quantity")),
          "sumofQuantity"
        ],
        "adver_stock_id"
      ],
      where: {
        sup_id: req.session.profileData.sup_id,
        paused: 0,
        deleted: 0,
        isConsumed: 0
      },
      include: {
        model: Database.Advertisement_Stock,
        required: true,
        attributes: [
          "adver_stock_id",
          "advert_stock_uuid",
          "adver_stock_name",
          "adver_stock_descritpion",
          "adver_stock_image"
        ],
        where: {
          paused: 0,
          deleted: 0
        }
      },
      group: ["Advertisement_Stock.adver_stock_id"]
    });

    /**
     * getting the agency types
     */

    let agencyTypes = await Database.AgencyTypes.findAll({
      attributes: ["agencytype_uuid", "type_name"],
      where: {
        isPaused: 0,
        deleted: 0
      }
    });
    res.status(200).render("Supervisor/manageIncentive", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.sup_uuid
      },
      advertisment,
      cityNames,
      agencyTypes,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });
  }
);

/***
 * view all assigned gifts route
 */
router.get(
  "/viewAllAssginedGifts/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
      req.session.profileData.sup_id
    );

    let giftAssigned = await Database.Team_Lead_Adver_Stock.findAll({
      attributes: ["total_Quantity", "createdAt"],
      where: {
        sup_id: req.session.profileData.sup_id,
        paused: 0,
        deleted: 0
      },
      include: [
        {
          model: Database.Team_Lead,
          required: true,
          attributes: ["team_L_name"],
          where: {
            team_L_isDeleted: 0,
            team_L_isPaused: 0
          },
          include: {
            model: Database.City_Areas,
            required: true,
            attributes: ["city_name"],
            paused: 0,
            deleted: 0
          }
        },
        {
          model: Database.Advertising_Stock_Allocation,
          required: true,
          attributes: ["adver_stock_act_id"],
          include: {
            model: Database.Advertisement_Stock,
            required: true,
            attributes: ["adver_stock_name"]
          },
          where: {
            paused: 0,
            deleted: 0
          }
        }
      ]
    });
    res.status(200).render("Supervisor/viewAllAssignedGifts", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.sup_uuid
      },
      giftAssigned,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });
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
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
      req.session.profileData.sup_id
    );

    let cityNameData = await Database.City.findAll({
      attributes: ["city_id", "city_uuid", "city_name"],
      where: {
        paused: 0,
        deleted: 0
      },
      include: {
        model: Database.Supervisor,
        required: true,
        attributes: [],
        where: {
          sup_isPaused: 0,
          sup_isDeleted: 0,
          sup_id: req.session.profileData.sup_id
        }
      }
    });

    let getCityArea = await Database.City_and_Supervisor_associate.findAll({
      attributes: [
        "city_supp_assos_id",
        "city_id",
        "sup_id",
        "city_and_sup_asso_uuid"
      ],
      where: {
        paused: 0,
        deleted: 0,
        sup_id: req.session.profileData.sup_id,
        city_id: cityNameData.map((city) => city.city_id)
      },
      include: {
        model: Database.City_Areas,
        required: true,
        attributes: [
          "city_area_id",
          "city_area_uuid",
          "city_name",
          "city_code",
          "city_supp_assos_id"
        ],
        where: {
          paused: 0,
          deleted: 0
        }
      }
    });
    res.status(200).render("Supervisor/viewAllAgencies", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.sup_uuid
      },
      getCityArea,
      cityNameData,
      role: req.session.passport.user.userRole.type_name,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject
    });
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
    //getting the team lead notifications
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
      req.session.profileData.sup_id
    );

    //getting the team-lead , member
    let teamMember = await Database.Team_Lead.findAll({
      attributes: ["team_L_id", "team_L_uuid", "team_L_name", "team_L_contact"],
      where: {
        sup_id: req.session.profileData.sup_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0
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

    if (teamMember !== null) {
      res.status(200).render("Supervisor/conveyMessageToTeamLead", {
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.sup_uuid
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
    } else {
      res.redirect(`/teamlead/dashboard/${req.session.profileData.team_L_id}`);
    }
  }
);
/**
 * getting the Convey Message route to display all the team lead
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the area to the user
 */
router.get(
  "/recommendations/:sup_uuid",
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {
    res.send({
      sup_id: req.params.sup_uuid,
      recommendations: "recommendations recommendations"
    });
  }
);
/**
 * displaying the all the notifications
 */
router.get("/notification", isUser_Login, async (req, res) => {
  /**
   * getting the count of the unread notifications
   */
  const unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.session.profileData.sup_id
  );
  const unreadNotification = await Database.SuperVisorNotification.findAll({
    attributes: [
      "supervisor_notification_uuid",
      "notification_text",
      "isRead",
      "createdAt"
    ],
    include: {
      model: Database.NotificationText,
      attributes: ["notification_title", "notification_icon"],
      required: true,
      where: {
        isPaused: false,
        deleted: false
      }
    },
    where: {
      isPaused: false,
      deleted: false,
      sup_id: req.session.profileData.sup_id
    },
    limit: 50
  }).then((notifications) => {
    if (notifications) return notifications;
  });
  res.render("Supervisor/notification", {
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
    unreadNotification,
    url: req.protocol + "://" + req.get("host"),
    info: {
      id: req.session.passport.user.userInfo.login_id,
      uuid: req.session.profileData.sup_uuid
    },
    permissions: req.session.permissions.permissionObject
  });
});

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
const countofNotificationOfSuperVisor = async (sup_id) => {
  return await Database.SuperVisorNotification.findAll({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("supervisor_notification_id")),
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
// let cityNameData = await Database.City.findAll({
//   attributes: ["city_id", "city_uuid", "city_name"],
//   where: {
//     paused: 0,
//     deleted: 0
//   },
//   include: {
//     model: Database.Supervisor,
//     required: true,
//     attributes: ["sup_id"],
//     // through: {
//     //   attributes: ["city_supp_assos_id", "city_id"]
//     // },
//     where: {
//       sup_isPaused: 0,
//       sup_isDeleted: 0,
//       sup_id: 1
//     }
//   }
// });

// let getCityArea = await Database.City_and_Supervisor_associate.findAll({
//   attributes: [
//     "city_supp_assos_id",
//     "city_id",
//     "sup_id",
//     "city_and_sup_asso_uuid"
//   ],
//   where: {
//     paused: 0,
//     deleted: 0,
//     sup_id: 1,
//     city_id: cityNameData.map((city) => city.city_id)
//   },
//   include: {
//     model: Database.City_Areas,
//     required: true,
//     attributes: [
//       "city_area_id",
//       "city_area_uuid",
//       "city_name",
//       "city_code",
//       "city_supp_assos_id"
//     ],
//     where: {
//       paused: 0,
//       deleted: 0
//     }
//   }
// });

// await Database.Permissions.findAll({
//   include: {
//     model: Database.User_Role,
//     through: {
//       attributes: []
//     }
//   }
// }).then((data) => {
//   console.log(data.length);
// });
// })();

// (async function () {
//   let advertisment = await Database.Advertising_Stock_Allocation.findAll({
//     attributes: [
//       "adver_stock_alloc_uuid",
//       "adver_stock_allocated_Quantity",
//       "adver_stock_id"
//     ],
//     where: {
//       sup_id: 1,
//       paused: 0,
//       deleted: 0
//     },
//     include: {
//       model: Database.Advertisement_Stock,
//       required: true,
//       attributes: [
//         "advert_stock_uuid",
//         "adver_stock_name",
//         "adver_stock_descritpion",
//         "adver_stock_image"
//       ],
//       where: {
//         paused: 0,
//         deleted: 0
//       }
//     },
//   });
//   advertisment.forEach((ad) => {
//     console.log(ad.dataValues);
//   });
// })();

// (async function () {
//   const clientData = {
//     cityArea: "8c27807b-a7ac-40b5-a58f-24b9eb3bfa93",
//     teamLead: "1c9741c6-492f-417c-a902-3459e1c374b9",
//     giftAssigned: "1001",
//     gift: "984587c5-7ed2-45b7-877c-b71a17eb768f"
//   };

//   let getGiftData = await Database.Advertising_Stock_Allocation.findAll({
//     attributes: [
//       "adver_stock_act_id",
//       "adver_stock_id",
//       "adver_stock_allocated_Quantity",
//       "used"
//     ],
//     include: {
//       model: Database.Advertisement_Stock,
//       required: true,
//       attributes: ["adver_stock_name"],
//       where: {
//         advert_stock_uuid: clientData.gift,
//         paused: 0,
//         deleted: 0
//       }
//     },
//     where: {
//       isConsumed: 0,
//       paused: 0,
//       deleted: 0
//     }
//   });

//   if (getGiftData.length > 0) {
//     let sum = 0,
//       temp = 0,
//       newObject = [];
//     getGiftData.some((data) => {
//       // console.log(
//       //   data.adver_stock_act_id,
//       //   "   ",
//       //   data.adver_stock_allocated_Quantity
//       // );
//       if (data.adver_stock_allocated_Quantity > +clientData.giftAssigned) {
//         temp = data.adver_stock_allocated_Quantity - clientData.giftAssigned;
//         data.adver_stock_allocated_Quantity = temp;
//         data.used = clientData.giftAssigned;
//         // console.log("temp --", temp);

//         newObject.push({
//           quantity: data.adver_stock_allocated_Quantity,
//           used: +data.used,
//           isConsumed:  data.adver_stock_allocated_Quantity === 0 ? true : false,// : true ? false,
//           adver_stock_act_id: data.adver_stock_act_id
//         });
//         return true;
//       } else {
//         if (sum !== +clientData.giftAssigned) {
//           if (temp === 0) {
//             console.log('running');
//             temp =
//               data.adver_stock_allocated_Quantity - clientData.giftAssigned;
//             sum += data.adver_stock_allocated_Quantity;

//             data.adver_stock_allocated_Quantity -= sum;
//             data.used = data.adver_stock_allocated_Quantity;
//             newObject.push({
//               quantity: data.adver_stock_allocated_Quantity,
//               used: sum,
//               isConsumed:  data.adver_stock_allocated_Quantity === 0 ? true : false,// : true ? false,
//               adver_stock_act_id: data.adver_stock_act_id
//             });
//           } else {
//             sum += -temp;
//             data.used = -temp;
//             temp = data.adver_stock_allocated_Quantity - -temp;
//             data.adver_stock_allocated_Quantity = temp;
//             newObject.push({
//               quantity: data.adver_stock_allocated_Quantity,
//               used: +data.used,
//               isConsumed:  data.adver_stock_allocated_Quantity === 0 ? true : false,// : true ? false,
//               adver_stock_act_id: data.adver_stock_act_id
//             });
//           }
//         }
//       }
//     });

//     newObject.some((data) => {
//       console.log(data);
//     });
//   }
// })();
