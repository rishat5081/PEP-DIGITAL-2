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
 * if the user tries to get on the invalid route
 */
 router.get("*", isUser_Login, async (req, res) => {
  res.redirect(`/genralManager/dashboard/${req.session.profileData.gm_uuid}`);
});

module.exports = { router, isGMAuthentic };
