const router = require("express").Router(),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  { isUser_Login } = require("../Web_Pages/index"),
  sequelize = require("../../Configuration Files/Sequelize/Sequelize");

/**
 * checking the user id or the UUID is the one who is into the session
 */
const isManagerAuthentic = (req, res, next) => {
  //   if (req.params.man_uuid === req.session.profileData.man_uuid) next();
  //   else res.redirect(`/manager/dashboard/${req.session.profileData.man_uuid}`);
  console.log("He");
  next();
};

/**
 * getting the dashboard details of the Manager
 */
router.get(
  "/dashboard/:man_uuid",
  isUser_Login,
  isManagerAuthentic,
  async (req, res) => {
    //getting the count of the notificaiton
    let unreadNotificationCount = await countofNotificationOfManager(
      req.session.profileData.man_id
    );

    /**
     * getting the web ADS from the DB to display the user copany information
     */
    let webAds = await Database.WebAds.findAll({
      attributes: ["title", "description", "picPath"],
      where: {
        paused: 0,
        deleted: 0,
        user_role_id: req.session.passport.user.userRole.user_role_id,
      },
    });

    /**
     * getting manager and department name of the selected user who is currently
     * in the session
     */
    let managerDashboard = await Database.Managers.findOne({
      attributes: [],
      include: [
        {
          model: Database.Department,
          required: true,
          attributes: ["d_name"],
          where: {
            paused: 0,
            d_deleted: 0,
          },
        },
        {
          model: Database.Zone,
          required: true,
          attributes: ["zone_name"],
          where: {
            paused: 0,
            deleted: 0,
          },
        },
      ],
      where: {
        man_id: req.session.profileData.man_id,
        man_uuid: req.session.profileData.man_uuid,
        man_isDeleted: 0,
        man_isPaused: 0,
      },
    })
      .then((data) => {
        if (data) return data;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error("Error Fetchin Dashboard Data of Manager");
          console.trace(error);
          return null;
        }
      });

    let profileData = Object.assign(
      {},
      {
        man_name: req.session.profileData.man_name,
        man_userProfilePic: req.session.profileData.man_userProfilePic,
        man_username: req.session.profileData.man_username,
        man_contact: req.session.profileData.man_contact,
        createdAt: req.session.profileData.createdAt,
        man_salary: req.session.profileData.man_salary,
        d_name: managerDashboard.dataValues.Department.dataValues.d_name,
        zone_name: managerDashboard.dataValues.Zone.dataValues.zone_name,
      }
    );

    if (
      (webAds, unreadNotificationCount, profileData, managerDashboard === null)
    ) {
      res.status(500).redirect("/manager/signout");
      res.end();
    } else {
      res.status(200).render("Manager/dashboard", {
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.man_uuid,
        },
        url: req.protocol + "://" + req.get("host"),
        user_role: req.session.passport.user.userRole,
        profileData,
        webAds,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        permissions: req.session.permissions.permissionObject,
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
  "/completeProfile/:man_uuid",
  isUser_Login,
  isManagerAuthentic,
  async (req, res) => {
    if (req.session.profileData.man_name === null) {
      res.status(200).render(`Manager/completeProfile`, {
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.man_uuid,
        },
        message: req.flash("info", "Please Complete your Profile"),
        url: req.protocol + "://" + req.get("host"),
        profileData: req.session.profileData.man_userProfilePic,
      });
    } else {
      res
        .status(200)
        .redirect(`/supervisor/dashboard/${req.session.profileData.man_uuid}`);
    }
  }
);

/**
 * getting the user profile route here
 */
router.get(
  "/Profile/:man_uuid",
  isUser_Login,
  isManagerAuthentic,
  async (req, res) => {
    /**
     * getiing the user details for the profile
     */

    let managerData = await Database.Managers.findOne({
      attributes: {
        exclude: [
          "man_isDeleted",
          "man_isPaused",
          "login_id",
          "createdAt",
          "updateTimestamp",
          "zone_id",
          "d_id",
        ],
      },
      /**
       * getting the inner join with supervisor
       */
      include: [
        {
          //here it is using the
          model: Database.Zone,
          required: true,
          attributes: ["zone_name"],
          where: {
            paused: 0,
            deleted: 0,
          },
        },
        {
          model: Database.Department,
          required: true,
          attributes: ["d_name"],
          where: {
            paused: 0,
            d_deleted: 0,
          },
        },
      ],
      where: {
        man_uuid: req.session.profileData.man_uuid,
        man_isDeleted: 0,
        man_isPaused: 0,
      },
    });

    // getting the email from the Login Info table
    let LoginEmail = await Database.User_Login_Information.findOne({
      attributes: ["login_email"],
      where: {
        login_id: req.session.passport.user.userInfo.login_id,
        paused: 0,
        deleted: 0,
      },
    });
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfManager(
      req.session.profileData.man_id
    );

    res.render("Manager/profile", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.man_uuid,
      },
      role: req.session.passport.user.userRole.type_name,
      LoginEmail,
      managerData,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });

    LoginEmail = null;
    managerData = null;
  }
);

/**
 * getting the view agencies route to display all the agencies
 * from the city where the supervisor is currently working on
 */
router.get(
  "/viewAgencies/:man_uuid",
  isUser_Login,
  isManagerAuthentic,
  async (req, res) => {
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfManager(
      req.session.profileData.man_id
    );

    let cityNameData = await Database.City.findAll({
      attributes: ["city_id", "city_uuid", "city_name"],
      where: {
        paused: 0,
        deleted: 0,
      },
      include: {
        model: Database.Supervisor,
        required: true,
        attributes: [],
        where: {
          sup_isPaused: 0,
          sup_isDeleted: 0,
          man_id: req.session.profileData.man_id,
        },
      },
    });

    let getCityArea = await Database.City_and_Supervisor_associate.findAll({
      attributes: [
        "city_supp_assos_id",
        "city_id",
        "sup_id",
        "city_and_sup_asso_uuid",
      ],
      where: {
        paused: 0,
        deleted: 0,
        // sup_id: req.session.profileData.sup_id,
        city_id: cityNameData.map((city) => city.city_id),
      },
      include: {
        model: Database.City_Areas,
        required: true,
        attributes: [
          "city_area_id",
          "city_area_uuid",
          "city_name",
          "city_code",
          "city_supp_assos_id",
        ],
        where: {
          paused: 0,
          deleted: 0,
        },
      },
    });
    res.status(200).render("Manager/viewAllAgencies", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.man_uuid,
      },
      getCityArea,
      cityNameData,
      role: req.session.passport.user.userRole.type_name,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
  }
);

/**
 * getting the Assign Area route to display all the team lead and their areas of working
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the area to the user
 */
/**
 * making the route for the team lead to assign the area to their team member
 */
router.get(
  "/assignArea/:teamLeadUUID",
  isUser_Login,
  isManagerAuthentic,
  async (req, res) => {
    //getting the notification
    let unreadNotificationCount = await countofNotificationOfManager(
      req.session.profileData.man_id
    );

    let supervisor_and_City = await Database.Supervisor.findAll({
      attributes: ["sup_id", "sup_uuid", "sup_name", "sup_contact"],
      where: {
        sup_isDeleted: 0,
        sup_isPaused: 0,
        man_id: req.session.profileData.man_id,
      },
      include: {
        model: Database.City,
        required: true,
        attributes: ["city_name", "city_uuid"],
        through: {
          attributes: [],
        },
        where: {
          paused: 0,
          deleted: 0,
        },
      },
    }).catch((error) => {
      console.error("Error in getting Supervisor Details");
      console.trace(error);
      return error ? null : true;
    });

    //getting the team lead city areas

    let supervisor = await Database.Supervisor.findAll({
      attributes: ["sup_id", "sup_uuid", "sup_name"],
      where: {
        sup_isDeleted: 0,
        sup_isPaused: 0,
        man_id: req.session.profileData.man_id,
      },
    })
      .then((supervisor) => {
        return supervisor ? supervisor : null;
      })
      .catch((error) => {
        console.error("Error in getting Area Sector");
        console.trace(error);
        return error ? null : true;
      });

    //getting all team member

    let city = await Database.City.findAll({
      attributes: ["city_id", "city_uuid", "city_name"],
      where: {
        paused: 0,
        deleted: 0,
        zone_id: req.session.profileData.zone_id,
      },
    })
      .then((city) => {
        return city ? city : null;
      })
      .catch((error) => {
        console.error("Error in getting city");
        console.trace(error);
        return error ? null : true;
      });

    if ((supervisor_and_City, supervisor, city)) {
      res.status(200).render("Manager/allocateArea", {
        url: req.protocol + "://" + req.get("host"),
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.man_uuid,
        },
        supervisor_and_City,
        supervisor,
        city,
        user_role: req.session.passport.user.userRole,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        permissions: req.session.permissions.permissionObject,
      });
      city = unreadNotificationCount = supervisor_and_City = supervisor = null;
      res.end();
    } else {
      res.redirect(`/manager/dashboard/${req.session.profileData.man_uuid}`);
    }
  }
);

/**
 * convey the message to the supervisor
 */
router.get(
  "/conveyMessage/:man_uuid",
  isUser_Login,
  isManagerAuthentic,
  async (req, res) => {
    //getting the team lead notifications
    let unreadNotificationCount = await countofNotificationOfManager(
      req.session.profileData.man_id
    );

    //getting the team-lead , member
    let teamMember = await Database.Supervisor.findAll({
      attributes: ["sup_id", "sup_uuid", "sup_name", "sup_contact"],
      where: {
        man_id: req.session.profileData.man_id,
        sup_isDeleted: 0,
        sup_isPaused: 0,
      },
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
      res.status(200).render("Manager/conveyMessageToSupervisor", {
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.man_uuid,
        },
        teamMember,
        url: req.protocol + "://" + req.get("host"),
        user_role: req.session.passport.user.userRole,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        permissions: req.session.permissions.permissionObject,
      });

      unreadNotificationCount = null;
      res.end();
    } else {
      res.redirect(`/teamlead/dashboard/${req.session.profileData.team_L_id}`);
    }
  }
);

/**
 * getting the Manage Incentive route to display all the team lead
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the Manage Incentive to the user
 */


router.get(
  "/manageIncentive/:man_uuid",
  isUser_Login,
  isManagerAuthentic,
  async (req, res) => {
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfManager(
      req.session.profileData.man_id
    );
    /**
     * getting all the Cities from the database
     */
    let superVisorsInfo = await Database.Supervisor.findAll({
      attributes: ["sup_id", "sup_uuid", "sup_name"],
      include: {
        model: Database.City,
        attributes: ["city_id", "city_name", "city_uuid"],
        required: true,
        through: {
          attributes: ["sup_id", "city_id"],
        },
        where: {
          paused: 0,
          deleted: 0,
        },
      },
      where: {
        man_id: req.session.profileData.man_id,
        sup_isDeleted: 0,
        sup_isPaused: 0,
      },
    });

    /**
     * Getting the advertisment which are allocated to the supervisor
     */

    let advertisment = await Database.Advertisement_Stock.findAll({
      attributes: [
        [
          sequelize.fn("SUM", sequelize.col("adver_stock_total_Quantity")),
          "sumofQuantity",
        ],
        [
          sequelize.fn("SUM", sequelize.col("adver_stock_used")),
          "QuantityUsed",
        ],
        "adver_stock_id",
        "advert_stock_uuid",
        "adver_stock_name",
        "adver_stock_descritpion",
        "adver_stock_image",
      ],

      where: {
        man_id: req.session.profileData.man_id,
        paused: 0,
        deleted: 0,
      },
      group: ["adver_stock_id"],
    });

    res.status(200).render("Manager/manageIncentive", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.man_uuid,
      },
      advertisment,
      superVisorsInfo,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
    advertisment = superVisorsInfo = null;
  }
);

/**
 * displaying the all the notifications
 *  Getting all the notificaitons
 */
router.get("/notification", isUser_Login, async (req, res) => {
  /**
   * getting the count of the unread notifications
   */
  const unreadNotificationCount = await countofNotificationOfManager(
    req.session.profileData.man_id
  );
  const unreadNotification = await Database.ManagerNotifications.findAll({
    attributes: [
      "manager_notification_uuid",
      "notification_text",
      "isRead",
      "createdAt",
    ],
    include: {
      model: Database.NotificationText,
      attributes: ["notification_title", "notification_icon"],
      required: true,
      where: {
        isPaused: false,
        deleted: false,
      },
    },
    where: {
      isPaused: false,
      deleted: false,
      man_id: req.session.profileData.man_id,
    },
    limit: 50,
  }).then((notifications) => {
    if (notifications) return notifications;
  });
  res.render("Manager/notification", {
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
    unreadNotification,
    url: req.protocol + "://" + req.get("host"),
    info: {
      id: req.session.passport.user.userInfo.login_id,
      uuid: req.session.profileData.man_uuid,
    },
    permissions: req.session.permissions.permissionObject,
  });
});

/**
 * signout the manager
 *
 */
router.get("/signout", async (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

/**
 * if the user tries to get on the invalid route
 */
router.get("*", isUser_Login, async (req, res) => {
  res.redirect(`/manager/dashboard/${req.session.profileData.man_uuid}`);
});
module.exports = { router, isManagerAuthentic };

/**
 * getting the count of notifications from the database
 */
const countofNotificationOfManager = async (man_id) => {
  return await Database.ManagerNotifications.findAll({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("manager_notification_id")),
        "unreadNotificationCount",
      ],
    ],
    where: {
      isRead: false,
      man_id,
    },
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
