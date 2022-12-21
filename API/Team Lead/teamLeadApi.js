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
      user_role_id: req.query.user_role_id,
    },
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
          sup_isDeleted: 0,
        },
      },
      {
        model: Database.City_Areas,
        required: true,
        attributes: ["city_name"],
        where: {
          deleted: 0,
          paused: 0,
        },
      },
    ],
    where: {
      team_L_id: req.query.team_L_id,
      team_L_uuid: req.query.team_L_uuid,
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
    },
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
      team_L_name: teamLeadDashboard.dataValues.team_L_name,
      team_L_userProfilePic: teamLeadDashboard.dataValues.team_L_userProfilePic,
      team_L_username: teamLeadDashboard.dataValues.team_L_username,
      team_L_contact: teamLeadDashboard.dataValues.team_L_contact,
      createdAt: teamLeadDashboard.dataValues.createdAt,
      team_L_salary: teamLeadDashboard.dataValues.team_L_salary,
      sup_name: teamLeadDashboard.dataValues.Supervisor.dataValues.sup_name,
      city_name: teamLeadDashboard.dataValues.City_Area.dataValues.city_name,
    }
  );

  if (
    (webAds, unreadNotificationCount, profileData, teamLeadDashboard === null)
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
        "city_area_id",
      ],
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
          sup_isDeleted: 0,
        },
        include: {
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
      },
      {
        model: Database.City_Areas,
        required: true,
        attributes: ["city_name"],
        where: {
          paused: 0,
          deleted: 0,
        },
      },
    ],
    where: {
      team_L_uuid: req.query.team_L_uuid,
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
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
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_id
  );

  res.status(200).send({
    LoginEmail,
    teamLead,
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
  });
  res.end();
  return;
});

//Assign Area

router.get("/assignArea", async (req, res) => {
  //getting the notification
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
  );

  //getting the team lead city areas

  let areaSectors = await Database.City_Sectors.findAll({
    attributes: ["sector_name", "city_sector_uuid", "sector_code"],
    where: {
      paused: 0,
      deleted: 0,
      city_area_id: req.query.city_area_id,
    },
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
  let allTeamMember = await Database.Field_Executive.findAll({
    attributes: ["field_id", "field_uuid", "field_name", "field_contact"],
    where: {
      team_L_id: req.query.team_L_id,
      field_isDeleted: 0,
      field_isPaused: 0,
    },
  })
    .then((member) => {
      return member ? member : null;
    })
    .catch((error) => {
      console.error("Error in getting all the team members from the Database");
      console.trace(error);
      return error ? null : true;
    });
  //getting the team member names and UUID

  let teamMember = await Database.Field_Executive.findAll({
    attributes: ["field_id", "field_uuid"],
    where: {
      team_L_id: req.query.team_L_id,
      field_isDeleted: 0,
      field_isPaused: 0,
    },
    include: {
      model: Database.City_Sectors,
      attributes: ["sector_name", "city_sector_uuid"],
      required: true,
      through: {
        attributes: [],
        where: {
          paused: 0,
          deleted: 0,
        },
      },
      where: {
        paused: 0,
        deleted: 0,
      },
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

  //end of getting data from DB

  if ((areaSectors, teamMember)) {
    res.status(200).send({
      areaSectors,
      teamMember,
      allTeamMember,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
    res.end();
    return;
  } else {
    res
      .status(500)
      .send({ message: "Error Getting Details of the Area Assign" });
    res.end();
    return;
  }
});

// addFreelance to the team
router.get("/addFreelance", async (req, res) => {
  //getting the notificaton of the user
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
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
        deleted: 0,
      },
    },
    where: {
      field_isDeleted: 0,
      field_isPaused: 0,
      team_L_id: null,
    },
  })
    .then((member) => {
      return member ? member : null;
    })
    .catch((error) => {
      console.error("Error in getting Member");
      console.trace(error);
      return error ? null : true;
    });

  if (teamMember && unreadNotificationCount) {
    res.status(200).send({
      teamMember,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
    res.end();
    return;
  } else {
    res.status(500).send({
      message: "Error Fetching the Details of the Freelancers",
    });
    res.end();
    return;
  }
});

// route for the managing the team
//route to manage team
router.get("/manageTeam", async (req, res) => {
  //getting the notificaton of the user
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
  );

  // getting the all executive which are no in any team they are working as freelance
  let teamMember = await Database.Field_Executive.findAll({
    attributes: ["field_uuid", "field_name", "field_contact"],
    include: {
      model: Database.User_Login_Information,
      required: true,
      attributes: ["login_email", "createdAt"],
      where: {
        paused: 0,
        deleted: 0,
      },
    },
    where: {
      field_isDeleted: 0,
      field_isPaused: 0,
      team_L_id: req.query.team_L_id,
    },
  })
    .then((member) => {
      return member ? member : null;
    })
    .catch((error) => {
      console.error("Error in getting Member");
      console.trace(error);
      return error ? null : true;
    });

  res.status(200).send({
    teamMember,
    url: req.protocol + "://" + req.get("host"),
  });

  res.end();
});

//convey the message page
router.get("/conveyMessage", async (req, res) => {
  //getting the team lead notifications
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
  );

  //getting the team-lead , member
  let teamMember = await Database.Field_Executive.findAll({
    attributes: ["field_id", "field_uuid", "field_name", "field_contact"],
    where: {
      team_L_id: req.query.team_L_id,
      field_isDeleted: 0,
      field_isPaused: 0,
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
    res.status(200).send({
      teamMember,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
    unreadNotificationCount = null;
    res.end();
  } else {
    res.status(400).send({ status: "error", message: "Invalid parameters" });
  }
});

//manage Incentive
router.get("/manageIncentive", async (req, res) => {
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
  );

  //getting the recommendation list from the data

  let recommendation = await Database.Executive_Recommendation.findAll({
    attributes: ["exec_recomm_uuid", "Recommendation"],
    where: {
      deleted: false,
      paused: false,
    },
  }).catch((error) => {
    if (error) {
      console.error("Error Fetching the Data of Executive Recommendation");
      console.trace(error);
      return null;
    }
  });
  /**
   * getting the members from the database
   */

  let teamMembers = await Database.Field_Executive.findAll({
    attributes: ["field_id", "field_uuid", "field_name"],
    where: {
      team_L_id: req.query.team_L_id,
      field_isDeleted: 0,
      field_isPaused: 0,
    },
  }).catch((error) => {
    if (error) {
      console.error("Error Fetching the Data of Executive");
      console.trace(error);
      return null;
    }
  });

  if (recommendation.length > 0 && teamMembers.length > 0) {
    res.status(200).send({
      recommendation,
      teamMembers,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
    res.end();
    return;
  } else {
    res.status(200).send({
      status: "error",
      message: "No Record found",
    });
    res.end();
    return;
  }
});

//displaying the pending recommendations
router.get("/recommendations", async (req, res) => {
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
  );

  //getting the recommendation list from the data

  let allRecommendations = await Database.Advertisement_Recommendation.findAll({
    attributes: [
      "team_lead_forward_status",
      "status",
      "createdAt",
      "advert_recom_uuid",
    ],
    include: [
      {
        model: Database.Agency_Info,
        required: true,
        attributes: ["agency_name", "agency_city"],
        where: {
          deleted: 0,
          isPaused: 0,
        },
      },
      {
        model: Database.AdvertismentGift,
        required: true,
        attributes: ["adver_gift_name"],
        where: {
          deleted: 0,
          paused: 0,
        },
      },
      {
        model: Database.Field_Executive,
        required: true,
        attributes: ["field_name"],
        where: {
          field_isDeleted: 0,
          field_isPaused: 0,
          team_L_id: req.query.team_L_id,
        },
      },
    ],
    where: {
      paused: 0,
      status: 0,
      deleted: 0,
    },
  })
    .then((result) => {
      if (result) return result;
      else return null;
    })
    .catch((err) => {
      if (err) {
        console.log("Error Getting all the recommendation");
        console.trace(err);
        return null;
      }
    });

  if (allRecommendations.length > 0) {
    res.status(200).send({
      allRecommendations,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
    res.end();
    return;
  } else {
    res.status(200).send({
      status: "error",
      message: "No Record Found",
    });
    res.end();
    return;
  }
});

//view the recommendation history
router.get("/viewRecommendationsHistory", async (req, res) => {
  let unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
  );

  //getting the recommendation list from the data

  let allRecommendations = await Database.Advertisement_Recommendation.findAll({
    attributes: [
      "team_lead_forward_status",
      "team_lead_decline_status",
      "team_lead_decline_descr",
      "team_lead_dateTime",
      "advert_recom_uuid",
    ],
    include: [
      {
        model: Database.Agency_Info,
        required: true,
        attributes: ["agency_name", "agency_city"],
        where: {
          deleted: 0,
          isPaused: 0,
        },
      },
      {
        model: Database.AdvertismentGift,
        required: true,
        attributes: ["adver_gift_name"],
        where: {
          deleted: 0,
          paused: 0,
        },
      },
      {
        model: Database.Field_Executive,
        required: true,
        attributes: ["field_name"],
        where: {
          field_isDeleted: 0,
          field_isPaused: 0,
          team_L_id: req.query.team_L_id,
        },
      },
    ],
    where: {
      paused: 0,
      status: 1,
      deleted: 0,
    },
  })
    .then((result) => {
      if (result) return result;
      else return null;
    })
    .catch((err) => {
      if (err) {
        console.log("Error Getting all the recommendation");
        console.trace(err);
        return null;
      }
    });

  if (allRecommendations.length > 0) {
    res.status(200).send({
      allRecommendations,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
    res.end();
    return;
  } else {
    res.status(200).send({
      status: "error",
      message: "No Record Found",
    });
    res.end();
    return;
  }
});

//view all the notificatons
router.get("/notification", async (req, res) => {
  /**
   * getting the count of the unread notifications
   */
  const unreadNotificationCount = await countofNotificationOfTeamLead(
    req.query.team_L_uuid
  );
  const unreadNotification = await Database.TeamLead_Notifications.findAll({
    attributes: [
      "teamLead_notification_uuid",
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
      team_L_id: req.query.team_L_id,
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

// view progress report page
router.get(
  "/progressReport",
  async (req, res) => {
    /**
     * getting the team lead notification
     */
    let unreadNotificationCount = await countofNotificationOfTeamLead(
      req.query.team_L_uuid
    );

    /**
     * getting the members from the database
     */

    let teamMember = await Database.Field_Executive.findAll({
      attributes: ["field_id", "field_uuid", "field_name"],
      where: {
        team_L_id: req.query.team_L_id,
        field_isDeleted: 0,
        field_isPaused: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Executive");
        console.trace(error);
        return null;
      }
    });

    /**
     * getting the activities per month from the db
     */
    const activitiesPerMonth = await Database.Activities.findAll({
      attributes: [
        "field_id",
        [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
        [sequelize.fn("COUNT", sequelize.col("*")), "activitiesPerMonth"],
        // [
        //   sequelize.fn("COUNT", sequelize.col("cancelled")),
        //   "cancelledactivitiesPerMonth"
        // ]
      ],
      group: ["moonth", "Year", "field_id"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        paused: false,
      },
    })
      .then((dbResponse) => {
        if (dbResponse.length > 0) return dbResponse;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error(
            "There is an error which fetching activities per month " + error
          );
          return null;
        }
      });

    /**
     * getting the cancelled activities from the db
     */

    const cancelledactivitiesPerMonth = await Database.Activities.findAll({
      attributes: [
        "field_id",
        [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
        [
          sequelize.fn("COUNT", sequelize.col("cancelled")),
          "cancelledactivitiesPerMonth",
        ],
      ],
      group: ["moonth", "Year", "field_id"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        paused: false,
        cancelled: true,
      },
    })
      .then((dbResponse) => {
        if (dbResponse.length > 0) return dbResponse;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.error(
            "There is an error which fetching activities per month " + error
          );
          return null;
        }
      });

    /**
     * getting the agency per month from the db
     */
    const agencyCount = await Database.Agency_Info.findAll({
      attributes: [
        "field_id",
        [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
        [sequelize.fn("COUNT", sequelize.col("*")), "agencyCount"],
      ],
      group: ["moonth", "Year", "field_id"],
      where: {
        field_id: teamMember.map((member) => member.field_id),
        deleted: false,
        isPaused: false,
      },
    })
      .then((dbResponse) => {
        if (dbResponse.length > 0) return dbResponse;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.trace(error);
          console.error(
            "There is an error which fetching activities per month"
          );
          return null;
        }
      });

    res.status(200).send({
      url: req.protocol + "://" + req.get("host"),
      
      agencyCount,
      teamMember,
      cancelledactivitiesPerMonth,
      activitiesPerMonth,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });

    res.end();
  }
);

/**
 *
 *
 *
 *
 *
 *
 **
 *
 *
 *
 * ************************* Controllers *************************
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
 ***/
router.post("/uploadProfilePhoto", async (req, res) => {
  multerFile_Upload_ForAPI(req, res, (err) => {
    if (err) {
      return res.send({ messages: err, type: "danger" });
    } else {
      let filename = req.files[0].filename;
      let filePath = req.files[0].destination.split("./public");

      Database.Team_Lead.update(
        {
          team_L_userProfilePic: filePath[1] + filename,
        },
        {
          where: {
            login_id: req.body.login_id,
          },
        }
      ).then((response) => {
        if (response) {
          res.send({
            type: "success",
            messages: "Profile Image Uploaded",
            profileImage: filePath[1] + filename,
          });
        } else {
          res.send({
            type: "danger",
            messages: "Error! in Uploading Image! ",
          });
        }
      });
    }
  });
});

router.route("/updateProfileInfo").post(async (req, res) => {
  const dbResponse = await Database.Role_ExtraInfo.findOne({
    include: {
      model: Database.User_Role,
      attributes: [],
      where: {
        type_name: {
          [Op.like]: "%Team Lead%",
          [Op.like]: "%Team%",
        },
      },
    },
    attributes: ["target", "commission", "salary"],
    where: {
      paused: 0,
      deleted: 0,
    },
  })
    .then((response) => {
      if (response) return response;
      else return null;
    })
    .catch((error) => {
      if (error) {
        console.error("Error! Can not Fetch Commissions and Target from DB");
        console.trace(error);
        return null;
      }
    });

  if (dbResponse !== null) {
    const updateStatus = await Database.Team_Lead.update(
      {
        team_L_name: req.body.name,
        team_L_contact: req.body.contact,
        team_L_username: req.body.username,
        team_L_target: dbResponse.dataValues.target,
        team_L_salary: dbResponse.dataValues.salary,
        team_L_commission: dbResponse.dataValues.commission,
      },
      {
        where: {
          login_id: req.body.login_id,
        },
      }
    )
      .then((response) => {
        //console.(response);
        if (response) {
          return response;
        } else {
          return null;
        }
      })
      .catch((error) => {
        if (error) {
          console.error("Error Updating the Team lead Info");
          console.trace(error);
          return null;
        }
      });

    if (updateStatus !== null) {
      res.status(200).send({
        type: "success",
        messages: "Updated",
        uuid: req.body.login_uuid,
      });
      res.end();
    } else {
      res.status(503).send({
        type: "danger",
        messages: "Error! Internal Error! ",
      });
      res.end();
    }
  } else {
    res.status(503).send({
      type: "danger",
      messages: "Error! Internal Error! ",
    });
  }
});

router.route("/updateProfileInfo").post(async (req, res) => {
  const dbResponse = await Database.Role_ExtraInfo.findOne({
    include: {
      model: Database.User_Role,
      attributes: [],
      where: {
        type_name: {
          [Op.like]: "%Team Lead%",
          [Op.like]: "%Team%",
        },
      },
    },
    attributes: ["target", "commission", "salary"],
    where: {
      paused: 0,
      deleted: 0,
    },
  })
    .then((response) => {
      if (response) return response;
      else return null;
    })
    .catch((error) => {
      if (error) {
        console.error("Error! Can not Fetch Commissions and Target from DB");
        console.trace(error);
        return null;
      }
    });

  if (dbResponse !== null) {
    const updateStatus = await Database.Team_Lead.update(
      {
        team_L_name: req.body.name,
        team_L_contact: req.body.contact,
        team_L_username: req.body.username,
        team_L_target: dbResponse.dataValues.target,
        team_L_salary: dbResponse.dataValues.salary,
        team_L_commission: dbResponse.dataValues.commission,
      },
      {
        where: {
          login_id: req.body.login_id,
        },
      }
    )
      .then((response) => {
        //console.(response);
        if (response) {
          return response;
        } else {
          return null;
        }
      })
      .catch((error) => {
        if (error) {
          console.error("Error Updating the Team lead Info");
          console.trace(error);
          return null;
        }
      });

    if (updateStatus !== null) {
      res.status(200).send({
        type: "success",
        messages: "Updated",
      });
      res.end();
    } else {
      res.status(400).send({
        type: "danger",
        messages: "Error! Can not update the information",
      });
      res.end();
    }
  } else {
    res.status(400).send({
      type: "danger",
      messages: "Error! No Role Details found",
    });
  }
});

router.route("/updateTeamLeadProfile").post(async (req, res) => {
  let userReqBody = { ...req.body };
  let lengthofUser_Req = Object.keys(userReqBody).length;

  if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {
    /**
     * Updating the email if the user entered the new email address
     */
    const emailUpdate = await Database.User_Login_Information.update(
      {
        login_email: userReqBody.email,
      },
      {
        where: {
          login_id: req.body.login_id,
          paused: 0,
          deleted: 0,
        },
      }
    );

    const updateExecutiveInfo = await Database.Team_Lead.update(
      {
        team_L_name: userReqBody.fullname,
        team_L_contact: userReqBody.contact,
        team_L_username: userReqBody.username,
      },
      {
        where: {
          team_L_uuid: req.body.team_L_uuid,
        },
      }
    );
    if (emailUpdate && updateExecutiveInfo) {
      res.status(200).send({ status: "Information Updated" });
    } else {
      console.trace(
        "There is an error while updating the Information of User @ Line"
      );
      res.status(500).send({
        error: "error",
        details: "Error! while updating your information.",
      });
    }
  } else
    res.status(400).send({ error: "error", details: "Invalid entered data" });
});

router.route("/addMembertoTeam").post(async (req, res) => {
  //checking the user inofrmation from the database and also getting the role and field id
  const fieldExecutive = await Database.User_Login_Information.findOne({
    attributes: ["login_id", "user_role_id"],
    include: {
      model: Database.Field_Executive,
      required: true,
      attributes: ["field_id"],
      where: {
        //using the UUID from the front end
        field_uuid: req.body.field_uuid,
        field_isDeleted: false,
        field_isPaused: false,
      },
    },
    where: {
      deleted: false,
      paused: false,
    },
  });

  //getting the role id of the field executive  from the database so i may not be static
  //it should be dynamic but the type must mathces Field Executive

  const userRole = await Database.User_Role.findOne({
    attributes: ["user_role_id"],
    where: {
      deleted: false,
      paused: false,
      type_name: {
        [Op.like]: [`Field Executive`],
        [Op.like]: [`%Field Executive%`],
      },
    },
  });

  //update the role of the user to Field Executive

  //update the role of the user to Field Executive

  if (fieldExecutive) {
    const updateRole = await Database.User_Login_Information.update(
      {
        user_role_id: userRole.dataValues.user_role_id,
      },
      {
        where: {
          login_id: fieldExecutive.dataValues.login_id,
          deleted: false,
          paused: false,
        },
      }
    );
    //and adding the Field Executive to the Team lead

    const updateExecutiveToTeam = await Database.Field_Executive.update(
      {
        team_L_id: req.body.team_L_id,
      },
      {
        where: {
          field_uuid: req.body.field_uuid,
          field_id:
            fieldExecutive.dataValues.Field_Executive.dataValues.field_id,
        },
      }
    );

    // adding the role information into the roleChanged table
    const roleChanged = await Database.changeRoleLogs.create({
      previousRole: fieldExecutive.dataValues.user_role_id,
      newRole: userRole.dataValues.user_role_id,
      field_id: fieldExecutive.dataValues.Field_Executive.dataValues.field_id,
      team_L_id: req.body.team_L_id,
    });

    //sending the response to the user
    if ((fieldExecutive, userRole, updateExecutiveToTeam, roleChanged)) {
      res.status(200).send({
        status: "Done",
      });
    } else {
      res.status(400).send({
        error: "error",
      });
    }
  } else {
    res.status(400).send({
      error: "no field executive found",
    });
  }
});

router.route("/allocateSectorToExecutive").post(async (req, res) => {
  //getting the sector ID from the database
  let sectorID = await Database.City_Sectors.findOne({
    attributes: ["city_sector_id"],
    where: {
      city_sector_uuid: req.body.selectedArea,
      deleted: 0,
      paused: 0,
    },
  });
  let selectedEmployee = req.body.employees;

  let executiveID = await Database.Field_Executive.findAll({
    attributes: ["field_id"],
    where: {
      field_uuid: selectedEmployee.map((uuid) => uuid),
      field_isDeleted: 0,
      field_isPaused: 0,
    },
  });

  //console.(sectorID);
  //console.(selectedEmployee);
  //console.(executiveID);

  let assignArea = await Database.City_Sector_Assosiate.bulkCreate(
    executiveID.map((employee) => {
      return {
        field_id: employee.field_id,
        city_sector_id: sectorID.city_sector_id,
      };
    })
  );

  if ((sectorID, selectedEmployee, executiveID, assignArea !== null)) {
    res.status(200).send({ status: "Area Assigned Successfully" });
    res.end();
  } else {
    res.status(500).send({ error: "Please try again" });
    res.end();
  }
});

router.route("/removeSectorToExecutive").put(async (req, res) => {
  //getting the sector ID from the database
  let sectorID = await Database.City_Sectors.findOne({
    include: {
      model: Database.Field_Executive,
      required: true,
      through: {
        attributes: ["city_sector_assos_uuid"],
      },
      where: {
        field_uuid: req.body.executiveUUID,
        field_isDeleted: 0,
        field_isPaused: 0,
        team_L_id: req.body.team_L_id,
      },
    },
    where: {
      city_sector_uuid: req.body.selectedArea,
      deleted: 0,
      paused: 0,
    },
  })
    .then((result) => {
      if (result) {
        return result.dataValues.Field_Executives[0].City_Sector_Assosiate
          .dataValues;
      }
    })
    .catch((err) => {
      if (err) {
        console.error("Error Fetching Remove Sector Information");
        console.trace(err);
        return null;
      }
    });

  if (sectorID) {
    let executiveID = await Database.City_Sector_Assosiate.update(
      {
        paused: 1,
      },
      {
        where: {
          city_sector_assos_uuid: sectorID.city_sector_assos_uuid,
          deleted: 0,
          paused: 0,
        },
      }
    )
      .then((result) => {
        return result;
      })
      .catch((err) => {
        if (err) {
          console.error("Error Fetching Remove Sector Information");
          console.trace(err);
          return null;
        }
      });

    if (executiveID) {
      res.status(200).send({
        status: "success",
        message: "Area Removed Successfully",
        executiveID,
      });
      sectorID = executiveID = null;
      res.end();
    } else {
      sectorID = executiveID = null;
      res.status(500).send({ error: "Please try again" });
      res.end();
    }
  } else {
    res.status(400).send({ status: false, message: "Area not found" });
    res.end();
  }
});

/**
 * sending the message to the specific team member
 */
router.route("/conveyMessageToSpecific").post(async (req, res) => {
  /**
   * getting the team memebers from the database
   */
  let teamMember = await Database.Field_Executive.findAll({
    attributes: ["field_id"],
    where: {
      team_L_id: req.body.team_L_id,
      field_isDeleted: 0,
      field_isPaused: 0,
      field_uuid: req.body.employeeList.map((employee) => employee),
    },
  }).catch((error) => {
    if (error) {
      console.error("Error Fetching the Data of Executive");
      console.trace(error);
      return null;
    }
  });

  let notificationID = await Database.NotificationText.findOne({
    attributes: ["notification_id"],
    where: {
      [Op.or]: [
        {
          notification_title: {
            [Op.like]: "%Team%",
          },
        },
        {
          notification_title: {
            [Op.like]: "%Team Member%",
          },
        },
      ],
    },
  }).catch((error) => {
    console.error("Error in creating ExecutiveNotifications");
    console.trace(error);
    return null;
  });

  let messageConveyed = await Database.ExecutiveNotifications.bulkCreate(
    teamMember.map((member) => {
      return {
        field_id: member.dataValues.field_id,
        notification_text: req.body.messageText,
        notification_id: notificationID.dataValues.notification_id,
      };
    })
  ).catch((error) => {
    console.error("Error in creating ExecutiveNotifications");
    console.trace(error);
    return null;
  });

  if (teamMember || notificationID || messageConveyed) {
    res.status(400).send({ error: "Please try again" });
    res.end();
  } else {
    res.status(200).send({ status: "Successfully, Message has been send" });
  }
});

//APIs FOR CONVEY MESSAGE PAGE
/**
   * Controller for sending message to all the team member
   */
router.route("/conveyMessageToAll").post(async (req, res) => {
  let teamMember = await Database.Field_Executive.findAll({
    attributes: ["field_id"],
    where: {
      team_L_id: req.query.team_L_id,
      field_isDeleted: 0,
      field_isPaused: 0,
    },
  }).catch((error) => {
    if (error) {
      console.error("Error Fetching the Data of Executive");
      console.trace(error);
      return null;
    }
  });

  let notificationID = await Database.NotificationText.findOne({
    attributes: ["notification_id"],
    where: {
      [Op.or]: [
        {
          notification_title: {
            [Op.like]: "%Team%",
          },
        },
        {
          notification_title: {
            [Op.like]: "%Team Member%",
          },
        },
      ],
    },
  }).catch((error) => {
    console.error("Error in creating ExecutiveNotifications");
    console.trace(error);
    return null;
  });

  let messageConveyed = await Database.ExecutiveNotifications.bulkCreate(
    teamMember.map((member) => {
      return {
        field_id: member.dataValues.field_id,
        notification_text: req.body.messageText,
        notification_id: notificationID.dataValues.notification_id,
      };
    })
  ).catch((error) => {
    console.error("Error in creating ExecutiveNotifications");
    console.trace(error);
    return null;
  });

  if ((teamMember, notificationID, messageConveyed === null)) {
    res.status(400).send({ error: "Please try again" });
    res.end();
  } else {
    res.status(200).send({ status: "Successfully, Message has been send" });
  }
});

//APIs for MANAGE INCENTIVE PAGE
  //submitting the recommendation to
  router.route("/submitRecommendation").post(async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Executive_Recommendation.findOne({
      attributes: ["exec_recomm_id"],
      where: {
        exec_recomm_uuid: req.body.selectedRecommendation,
        deleted: 0,
        paused: 0,
      },
    });
    let selectedEmployee = req.body.employeeList;

    let executiveID = await Database.Field_Executive.findAll({
      attributes: ["field_id"],
      where: {
        field_uuid: selectedEmployee.map((uuid) => uuid),
        field_isDeleted: 0,
        field_isPaused: 0,
      },
    });

    let addRecommendation = await Database.Recommendation_for_Executive.bulkCreate(
      executiveID.map((employee) => {
        return {
          field_id: employee.field_id,
          team_L_id: req.query.team_L_id,
          exec_recomm_id: recommendationID.exec_recomm_id,
          recommendationDetails: req.body.recommendationText,
          recommendationTitle: req.body.title,
        };
      })
    );

    if (
      (recommendationID,
      selectedEmployee,
      executiveID,
      addRecommendation !== null)
    ) {
      res.status(200).send({ status: "Recommendation Added Successfully" });
      res.end();
    } else {
      res.status(400).send({ error: "Please try again" });
      res.end();
    }
  });

  //apis for manage TEAM PAGE
  /**
   * remove a member to the team
   */

  router.route("/removeMembertoTeam").put(async (req, res) => {
    // checking the user inofrmation from the database and also getting the role and field id
    const fieldExecutive = await Database.User_Login_Information.findOne({
      attributes: ["login_id", "user_role_id"],
      include: {
        model: Database.Field_Executive,
        required: true,
        attributes: ["field_id"],
        where: {
          //using the UUID from the front end
          field_uuid: req.body.id,
          field_isDeleted: false,
          field_isPaused: false,
        },
      },
      where: {
        deleted: false,
        paused: false,
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        if (err) {
          console.log("Error Getting the Field Executive Info");
          console.trace(err);
          return null;
        }
      });

    //getting the role id of the field executive  from the database so i may not be static
    //it should be dynamic but the type must mathces Field Executive

    const userRole = await Database.User_Role.findOne({
      attributes: ["user_role_id"],
      where: {
        deleted: false,
        paused: false,
        type_name: {
          [Op.like]: [`Freelance Field Executive`],
          [Op.like]: [`%Freelance%`],
        },
      },
    }).catch((err) => {
      if (err) {
        console.log("Error Getting the User Role Info");
        console.trace(err);
        return null;
      }
    });
    //  and adding the Field Executive to the NULL
    const updateExecutiveToTeam = await sequelize
      .query(
        `UPDATE field_executive SET team_L_id = NULL WHERE field_uuid = '${req.body.id}';`,
        null,
        { raw: true }
      )
      .then((response) => {
        console.log("Creating Database.... Please Wait");
        console.log(response);
      })

      .catch((err) => {
        if (err) {
          console.log("Error Updating the Team Lead Info");
          console.trace(err);
          return null;
        }
      });

    //update the role of the user to Field Executive

    const updateRole = await Database.User_Login_Information.update(
      {
        user_role_id: userRole.dataValues.user_role_id,
      },
      {
        where: {
          login_id: fieldExecutive.dataValues.login_id,
          deleted: false,
          paused: false,
        },
      }
    ).catch((err) => {
      if (err) {
        console.log("Error Updating the User Role Info");
        console.trace(err);
        return null;
      }
    });

    // adding the role information into the roleChanged table
    const roleChanged = await Database.changeRoleLogs
      .create({
        previousRole: fieldExecutive.dataValues.user_role_id,
        newRole: userRole.dataValues.user_role_id,
        field_id: fieldExecutive.dataValues.Field_Executive.dataValues.field_id,
        team_L_id: req.query.team_L_id,
      })
      .catch((err) => {
        if (err) {
          console.log("Error Creating the User Role Change Info");
          console.trace(err);
          return null;
        }
      });

    //sending the response to the user
    if ((fieldExecutive, userRole, updateExecutiveToTeam, roleChanged)) {
      res.status(200).send({
        status: "Done",
      });
    } else {
      res.status(400).send({
        error: "error",
      });
    }
  });

  //API for notification page
  /**
   * Unread all team lead notification
   */

  router.route("/unreadTeamAllNotifications").post(async (req, res) => {
    const Notifications = await Database.TeamLead_Notifications.update(
      {
        isRead: true,
      },
      {
        where: {
          team_L_id: req.query.team_L_id,
          isRead: false,
        },
      }
    ).then((response) => {
      if (response) return response;
    });

    if (Notifications) res.send({ status: "Updated" });
  });

  //APIs FOR VIEW ALL RECOMMENDATIONS PAGE
  //decline recommendation
  router
  .route("/teamlead/declineRecommendation").put(async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Advertisement_Recommendation.findOne({
      where: {
        advert_recom_uuid: req.body.declineRecommendationUUID,
        deleted: false,
        paused: false,
        status: false,
        team_L_id: null,
        team_lead_dateTime: null,
      },
    })
      .then((result) => {
        if (result) {
          result.update({
            team_L_id: req.query.team_L_id,
            team_lead_dateTime: new Date().toUTCString(),
            status: true,
            team_lead_decline_status: true,
            team_lead_decline_descr: req.body.reason,
          });
        } else {
          return null;
        }
      })
      .catch((err) => {
        if (err) {
          console.log("Error Getting all the recommendation");
          console.trace(err);
          return null;
        }
      });

    if (recommendationID !== null) {
      res.status(200).send({
        status: "Updated",
        message: "Recommendation Marked Successfully",
      });
      res.end();
    } else {
      res.status(400).send({
        status: "Already Updated",
        message: "Recommendation is already marked. Try Again",
        recommendationID,
      });
      res.end();
    }
  });

  //approve recommendation
  
  //pause the field executive  recommendation to
  router
  .route("/teamlead/approveRecommendation").put(async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Advertisement_Recommendation.findOne({

      where: {
        advert_recom_uuid: req.body.uuid,
        deleted: false,
        paused: false,
        status: false,
        team_L_id: null,
        team_lead_dateTime: null,
      },
    })
      .then((result) => {
        if (result) {
          result.update({
            team_L_id: req.query.team_L_id,
            team_lead_dateTime: new Date().toUTCString(),
            status: true,
            team_lead_forward_status: true,
          });
        } else {
          return null;
        }
      })
      .catch((err) => {
        if (err) {
          console.log("Error Getting all the recommendation");
          console.trace(err);
          return null;
        }
      });

    if (recommendationID !== null) {
      res.status(200).send({
        status: "Updated",
        message: "Recommendation Marked Successfully",
      });
      res.end();
    } else {
      res.status(400).send({
        status: "Already Updated",
        message: "Recommendation is already marked. Try Again",
        recommendationID,
      });
      res.end();
    }
  });


module.exports = { router };

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
  return await Database.TeamLead_Notifications.findAll({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("teamLead_notification_id")),
        "unreadNotificationCount",
      ],
    ],
    where: {
      isRead: false,
      team_L_id,
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
