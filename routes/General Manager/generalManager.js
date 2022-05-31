const router = require("express").Router(),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization");

/**
 * checking the user id or the UUID is the one who is into the session
 */
const isManagerAuthentic = (req, res, next) => {
  if (req.params.man_uuid === req.session.profileData.man_uuid) next();
  else res.redirect(`/manager/dashboard/${req.session.profileData.man_uuid}`);
};

router.get("/eman", async (req, res) => {
  // console.log(response)

  console.log(req.protocol + "://" + req.get("host"));
  res.render("General Manager/editManagers", {
    url: req.protocol + "://" + req.get("host"),
  });
});

/**
 * getting the dashboard details of the General Manager
 */

router.get( 
  "/dashboard/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    //getting the count of the notificaiton
    let unreadNotificationCount = await countofNotificationOfManager(
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
     * getting manager and department name of the selected user who is currently
     * in the session
     */
    let GMDashboard = await Database.GM_Company.findOne({
      attributes: [],
      include: [
        {
          model: Database.Companies_Access,
          required: true,
          attributes: ["comp_access_id"],
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
        gm_id: req.session.profileData.gm_id,
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
        // man_username: req.session.profileData.man_username,
        gm_contact: req.session.profileData.gm_contact,
        createdAt: req.session.profileData.createdAt,
        gm_salary: req.session.profileData.gm_salary,
         comp_access_id: GMDashboard.dataValues.companies_access.dataValues.comp_access_id,
        // zone_name: managerDashboard.dataValues.Zone.dataValues.zone_name,
      }
    );

    // if (!(webAds, unreadNotificationCount, profileData, managerDashboard)) {
    //   res.status(500).redirect("/manager/signout");
    //   res.end();
    // } else {
    res.status(200).render("generalManager/dashboard", {
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
    // }
    //   res.send({ js: "sjdbnk" });
  }
);


/**
 * Determining that the user have to complete the profile
 * if the user is new then he / she should complete the profile then move ahead
 */

 router.get(
  "/completeProfile/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    if (req.session.profileData.gm_name === null) {
      res.status(200).render(`Manager/completeProfile`, {
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
        .redirect(`/manager/dashboard/${req.session.profileData.gm_uuid}`);
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
          model: Database.Companies_Access,
          required: true,
          attributes: ["comp_access_id"],
          where: {
            paused: 0,
            d_deleted: 0,
          },
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
    let unreadNotificationCount = await countofNotificationOfManager(
      req.session.profileData.gm_id
    );

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
);


module.exports = { router };
