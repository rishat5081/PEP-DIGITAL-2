const router = require("express").Router(),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  { isUser_Login } = require("../Web_Pages/index"),
  sequelize = require("../../Configuration Files/Sequelize/Sequelize"),
  { Op } = require("sequelize");


/**
 * checking the user id or the UUID is the one who is into the session
 */
const isGMAuthentic = (req, res, next) => {
  if (req.params.gm_uuid === req.session.profileData.gm_uuid) next();
  else res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_uuid}`);
};

/**
 * Determining that the user have to complete the profile
 * if the user is new then he / she should complete the profile then move ahead
 */

 router.get(
  "/completeProfile/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    // for incomplete GM data
    if (req.session.profileData.gm_name === null) {
      res.status(200).render(`General Manager/completeProfile`, {
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.gm_uuid,
        },
        message: req.flash("info", "Please Complete your Profile"),
        url: req.protocol + "://" + req.get("host"),
        profileData: req.session.profileData.gm_profile_pic,
      });
    } else {
      res
        .status(200)
        .redirect(`/generalManager/dashboard/${req.session.profileData.gm_uuid}`);
    }
  }
);

/**
 * getting the user profile route here
 */
 router.get(
  "/Profile/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    /**
     * getiing the user details for the profile
     */

    let GMData = await Database.GM_Company.findOne({
      attributes: {
        exclude: [
          "gm_isDeleted",
          "gm_isPaused",
          "login_id",
          "createdAt",
          "updateTimestamp",
          "zone_id",
          "comp_access_id",
        ],
      },
      /**
       * getting the inner join with GM
       */
      include: [
     
        {
          model: Database.Companies_Access,
          required: true,
          attributes: ["comp_name"]
        },
      ],
      where: {
        gm_uuid: req.session.profileData.gm_uuid,
        gm_isDeleted: 0,
        gm_isPaused: 0,
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
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );
    if (req.session.profileData.gm_name !== null) {

    res.render("General Manager/profile", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
      },
      role: req.session.passport.user.userRole.type_name,
      LoginEmail,
      GMData,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });

    LoginEmail = null;
    GMData = null;
  }
  else {
    res
      .status(200)
      .redirect(`/generalManager/completeProfile/${req.session.profileData.gm_uuid}`);
  }
}
);

/**
 * getting the dashboard details of the General Manager
 */

 router.get( 
  "/dashboard/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    //getting the count of the notificaiton
    let unreadNotificationCount = await countofNotificationOfGM (
      req.session.profileData.gm_id
    );

    /**
     * getting the web ADS from the DB to display the user company information
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
     * getting companies access of the selected user who is currently
     * in the session
     */
    let GMDashboard = await Database.GM_Company.findOne({
      attributes: [],
      include: [
        {
          model: Database.Companies_Access,
          required: true,
          attributes: ["comp_name"],
          where: {
          },
        },
      
      ],
      where: {
        gm_id: req.session.profileData.gm_id,
        gm_isDeleted: 0,
        gm_isPaused: 0,
      },
    })
      .then((data) => {
        if (data) return data;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error("Error Fetching Dashboard Data of General Manager");
          console.trace(error);
          return null;
        }
      }); 

    let profileData = Object.assign(
      {},
      {
        gm_name: req.session.profileData.gm_name,
        gm_profile_pic: req.session.profileData.gm_profile_pic,
        gm_username: req.session.profileData.gm_username,
        gm_contact: req.session.profileData.gm_contact,
        createdAt: req.session.profileData.createdAt,
        gm_salary: req.session.profileData.gm_salary,
        comp_name: GMDashboard.dataValues.Companies_Access.dataValues.comp_name,
      }
    );


      if (req.session.profileData.gm_name !== null) {

    res.status(200).render("General Manager/dashboard", {
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
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
     else {
      res
        .status(200)
        .redirect(`/generalManager/dashboard/${req.session.profileData.gm_uuid}`);
    }
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
  const unreadNotificationCount = await countofNotificationOfGM(
    req.session.profileData.gm_id
  );
  const unreadNotification = await Database.GMNotifications.findAll({
    attributes: [
      "gm_Company_notification_uuid",
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
      gm_id: req.session.profileData.gm_id,
    },
    limit: 50,
  }).then((notifications) => {
    if (notifications) return notifications;
  });
  if(unreadNotification !== null){
  res.render("General Manager/notification", {
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
    unreadNotification,
    url: req.protocol + "://" + req.get("host"),
    info: {
      id: req.session.passport.user.userInfo.login_id,
      uuid: req.session.profileData.gm_uuid,
    },
    permissions: req.session.permissions.permissionObject,
  });
}else {
  res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
}
});

/**
 * if the user tries to get on the invalid route
 */
 router.get("*", isUser_Login, async (req, res) => {
  res.redirect(`/genralManager/dashboard/${req.session.profileData.gm_uuid}`);
});

module.exports = { router, isGMAuthentic };
