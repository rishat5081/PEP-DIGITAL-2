const {
  multerFile_Upload_ForAPI
} = require("../../Configuration Files/Multer Js/multer");

const router = require("express").Router(),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  { validateToken } = require("../Web/webAPI"),
  sequelize = require("../../Configuration Files/Sequelize/Sequelize"),
  { Op } = require("sequelize"),
  fs = require("fs"),
  pakistanCityName = require("../../resources/pakistanCityName");

//route for the dashboard
router.get("/dashboard", async (req, res) => {
  /**
   * getting the unread notification number
   */

  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
  );

  /**
   * getting the web ADS from the DB to display the user copany information
   */
  let webAds = await Database.WebAds.findAll({
    attributes: ["title", "description", "picPath"],
    where: {
      paused: 0,
      deleted: 0,
      user_role_id: req.query.user_role_id
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
      team_L_id: req.query.team_L_id,
      team_L_uuid: req.query.team_L_uuid,
      team_L_isDeleted: 0,
      team_L_isPaused: 0
    }
  })
    .then(data => {
      if (data) return data;
      else return null;
    })
    .catch(error => {
      if (error) {
        console.error("Error Fetchin Dashboard Data of Team Lead");
        console.trace(error);
        return null;
      }
    });

  let profileData = Object.assign(
    {},
    {
      team_L_name: teamLeadDashboard.dataValues.team_L_name,
      team_L_userProfilePic: teamLeadDashboard.dataValues.team_L_userProfilePic,
      team_L_username: teamLeadDashboard.dataValues.team_L_username,
      team_L_contact: teamLeadDashboard.dataValues.team_L_contact,
      createdAt: teamLeadDashboard.dataValues.createdAt,
      team_L_salary: teamLeadDashboard.dataValues.team_L_salary,
      sup_name: teamLeadDashboard.dataValues.Supervisor.dataValues.sup_name,
      city_name: teamLeadDashboard.dataValues.City_Area.dataValues.city_name
    }
  );

  if (
    (webAds, unreadNotificationCount, profileData, teamLeadDashboard === null)
  ) {
    res.status(500).send({
      message: "Error Fetching Dashboard Details"
    });
    res.end();
    return;
  } else {
    res.status(200).send({
      profileData,
      webAds,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount
    });
    res.end();
    return;
  }
});

//profile of the team lead

router.get("/profileTeamLead", async (req, res) => {
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
      team_L_uuid: req.query.team_L_uuid,
      team_L_isDeleted: 0,
      team_L_isPaused: 0
    }
  });

  // getting the email from the Login Info table
  let LoginEmail = await Database.User_Login_Information.findOne({
    attributes: ["login_email"],
    where: {
      login_id: req.query.login_id,
      paused: 0,
      deleted: 0
    }
  });
  // unread notification count
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_id
  );

  res.status(200).send({
    LoginEmail,
    teamLead,
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount
  });
  res.end();
  return;
});

module.exports = { router };

/**

count of the notificaiton

**/

const countofNotificationOfTeamLead = async team_L_id => {
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
    .then(notifications => {
      if (notifications) return notifications;
      else return null;
    })
    .catch(error => {
      if (error) {
        console.error("Error Fetching Notification Count");
        console.trace(error);
        return null;
      }
    });
};
