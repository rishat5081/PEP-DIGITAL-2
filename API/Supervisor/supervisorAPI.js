const {
    multerFile_Upload_ForAPI,
  } = require("../../Configuration Files/Multer Js/multer");
  
  const router = require("express").Router(),
    Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
    { validateToken } = require("../Web/webAPI"),
    sequelize = require("../../Configuration Files/Sequelize/Sequelize"),
    { Op } = require("sequelize"),
    fs = require("fs"),
    pakistanCityName = require("../../resources/pakistanCityName");


    /* route for the supervisor dashboard*/
    router.get("/dashboard", async (req, res) => {
    //getting the count of the notificaiton
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
      req.query.sup_id
    );

    /**
     * getting the web ADS from the DB to display the user copany information
     */
    let webAds = await Database.WebAds.findAll({
      attributes: ["title", "description", "picPath"],
      where: {
        paused: 0,
        deleted: 0,
        user_role_id: req.query.user_role_id,
      },
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
            man_isPaused: 0,
          },
        },
        {
          //this is the many to many relation ship
          model: Database.City,
          attributes: ["city_name"],
          required: true,
          through: {
            attributes: [],
          },
          where: {
            paused: 0,
            deleted: 0,
          },
        },
      ],
      where: {
        sup_id: req.query.sup_id,
        sup_isDeleted: 0,
        sup_isPaused: 0,
      },
    })
      .then((data) => {
        if (data) return data;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error("Error Fetching Dashboard Data of SuperVisor");
          console.trace(error);
          return null;
        }
      });

    let profileData = Object.assign(
      {},
      {
        sup_name: req.dataValues.sup_name,
        sup_userProfilePic: req.dataValues.sup_userProfilePic,
        sup_username: req.dataValues.sup_username,
        sup_contact: req.dataValues.sup_contact,
        createdAt: req.dataValues.createdAt,
        sup_salary: req.dataValues.sup_salary,
        man_name: supervisorDashboard.dataValues.Manager.dataValues.man_name,
        Cities: supervisorDashboard.dataValues.Cities,
      }
    );

    if (
      (webAds, unreadNotificationCount, profileData, supervisorDashboard === null)
    ) {
      res.status(500).send({
        message: "Error Fetching Dashboard Details",
      });
      res.end();
      return;
    } else {
      res.status(200).send({
        profileData,
        webAds,
        unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
    res.end();
    return;
  }
});

/**
 * getting the user profile route here
 */
 router.get("/ProfileSupervisor", async (req, res) => {
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
          "man_id",
        ],
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
            man_isDeleted: 0,
          },
        },
        {
          //this is the many to many relation ship
          model: Database.City,
          attributes: ["city_name"],
          required: true,
          through: {
            attributes: [],
          },
          where: {
            paused: 0,
            deleted: 0,
          },
        },
      ],
      where: {
        sup_uuid: req.query.sup_uuid,
        sup_isDeleted: 0,
        sup_isPaused: 0,
      },
    });

    // getting the email from the Login Info table
    let LoginEmail = await Database.User_Login_Information.findOne({
      attributes: ["login_email"],
      where: {
        login_id: req.query.login_id,
        paused: 0,
        deleted: 0,
      },
    });
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
      req.query.sup_id
    );
    res.status(200).send({

      LoginEmail,
      supervisorData,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });

    res.end();
    return;
  }
);

/**
 * displaying the all the notifications
 */
 router.get("/notification", async (req, res) => {
  /**
   * getting the count of the unread notifications
   */
  const unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
  );
  const unreadNotification = await Database.SuperVisorNotification.findAll({
    attributes: [
      "supervisor_notification_uuid",
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
      sup_id: req.query.sup_id,
    },
    limit: 50,
  }).then((notifications) => {
    if (notifications) return notifications;
  });
  if (unreadNotification.length > 0) {
    res.status(200).send({
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      unreadNotification,
    });
    res.end();
    return;
  } else {
    res.status(200).send({
      status: "error",
      message: "No Notification Found",
    });
    res.end();
    return;
  }
});


/**

count of the notificaiton

**/
getAuthenticateJSON = (userReqBody) => {
  Object.keys(userReqBody).forEach((key) => {
    if (
      userReqBody[key] === "select" ||
      userReqBody[key] === "update" ||
      userReqBody[key] === "insert"
    ) {
      delete userReqBody[key];
    }
  });
  return Object.keys(userReqBody).length;
};
const countofNotificationOfTeamLead = async (team_L_id) => {
  return await Database.SuperVisorNotification.findAll({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("supervisor_notification_id")),
        "unreadNotificationCount",
      ],
    ],
    where: {
      isRead: false,
      sup_id,
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



module.exports = { router };
