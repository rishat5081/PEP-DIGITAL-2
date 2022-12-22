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
router.get("/profile", async (req, res) => {
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
});

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

router.get("/progressAnalytics", async (req, res) => {
  // unread notification count
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
  );

  let cityNames = await Database.City.findAll({
    attributes: ["city_name", "city_uuid"],
    include: {
      model: Database.Supervisor,
      attributes: [],
      required: true,
      through: {
        attributes: [],
      },

      where: {
        sup_id: req.query.sup_id,
        sup_isDeleted: 0,
        sup_isPaused: 0,
      },
    },
    where: {
      paused: 0,
      deleted: 0,
    },
  });

  res.send({
    cityNames,
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
  });
});

router.get("/assignArea", async (req, res) => {
  //getting the notification
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_uuid
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
        sup_id: req.query.sup_id,
      },
    },
    where: {
      paused: 0,
      deleted: 0,
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
  let allTeamLeads = await Database.Team_Lead.findAll({
    attributes: ["team_L_id", "team_L_uuid", "team_L_name", "team_L_contact"],
    where: {
      sup_id: req.query.sup_id,
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
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

  let teamMember = await Database.Team_Lead.findAll({
    attributes: ["team_L_id", "team_L_uuid"],
    where: {
      sup_id: req.query.sup_id,
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
    },
    include: {
      model: Database.City_Areas,
      attributes: ["city_name", "city_area_uuid"],
      required: true,
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

  if ((teamMember, areaSectors)) {
    res.status(200).send({
      teamMember,
      allTeamLeads,
      areaSectors,
    });
    res.end();
  } else {
    res.status(404).send({ message: "No Record Found" });
  }
});

router.get("/manageIncentive", async (req, res) => {
  // unread notification count
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
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
        attributes: [],
      },

      where: {
        sup_id: req.query.sup_id,
        sup_isDeleted: 0,
        sup_isPaused: 0,
      },
    },
    where: {
      paused: 0,
      deleted: 0,
    },
  });

  /**
   * Getting the advertisment which are allocated to the supervisor
   */

  let advertisment = await Database.Advertising_Stock_Allocation.findAll({
    attributes: [
      [
        sequelize.fn("SUM", sequelize.col("adver_stock_allocated_Quantity")),
        "sumofQuantity",
      ],
      "adver_stock_id",
    ],
    where: {
      sup_id: req.query.sup_id,
      paused: 0,
      deleted: 0,
      isConsumed: 0,
    },
    include: {
      model: Database.Advertisement_Stock,
      required: true,
      attributes: [
        "adver_stock_id",
        "advert_stock_uuid",
        "adver_stock_name",
        "adver_stock_descritpion",
        "adver_stock_image",
      ],
      where: {
        paused: 0,
        deleted: 0,
      },
    },
    group: ["Advertisement_Stock.adver_stock_id"],
  });

  /**
   * getting the agency types
   */

  let agencyTypes = await Database.AgencyTypes.findAll({
    attributes: ["agencytype_uuid", "type_name"],
    where: {
      isPaused: 0,
      deleted: 0,
    },
  });
  res.status(200).send({
    advertisment,
    cityNames,
    agencyTypes,
  });
});

/***
 * view all assigned gifts route
 */
router.get("/viewAllAssginedGifts", async (req, res) => {
  // unread notification count
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
  );

  let giftAssigned = await Database.Team_Lead_Adver_Stock.findAll({
    attributes: ["total_Quantity", "createdAt"],
    where: {
      sup_id: req.query.sup_id,
      paused: 0,
      deleted: 0,
    },
    include: [
      {
        model: Database.Team_Lead,
        required: true,
        attributes: ["team_L_name"],
        where: {
          team_L_isDeleted: 0,
          team_L_isPaused: 0,
        },
        include: {
          model: Database.City_Areas,
          required: true,
          attributes: ["city_name"],
          paused: 0,
          deleted: 0,
        },
      },
      {
        model: Database.Advertising_Stock_Allocation,
        required: true,
        attributes: ["adver_stock_act_id"],
        include: {
          model: Database.Advertisement_Stock,
          required: true,
          attributes: ["adver_stock_name"],
        },
        where: {
          paused: 0,
          deleted: 0,
        },
      },
    ],
  });
  res.status(200).send({ giftAssigned });
});

/**
 * getting the view agencies route to display all the agencies
 * from the city where the supervisor is currently working on
 */
router.get("/viewAgencies", async (req, res) => {
  // unread notification count
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
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
        sup_id: req.query.sup_id,
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
      sup_id: req.query.sup_id,
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
  res.status(200).send({ getCityArea, cityNameData });
});

/**
 * getting the Convey Message route to display all the team lead
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the area to the user
 */
router.get("/conveyMessage", async (req, res) => {
  //getting the team lead notifications
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
  );

  //getting the team-lead , member
  let teamMember = await Database.Team_Lead.findAll({
    attributes: ["team_L_id", "team_L_uuid", "team_L_name", "team_L_contact"],
    where: {
      sup_id: req.query.sup_id,
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
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
    res.status(200).send({ teamMember });
    unreadNotificationCount = null;
    res.end();
  } else {
    res.status(404).send({ message: "No data found" });
  }
});

/**
 * getting the Convey Message route to display all the team lead
 * from the city where the supervisor is currently working on
 * and also allow the supervisor to allote the area to the user
 */
router.get("/recommendations", async (req, res) => {
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
  );

  //getting the recommendation list from the data

  let allRecommendations = await Database.Advertisement_Recommendation.findAll({
    attributes: [
      "team_lead_forward_status",
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
        model: Database.Team_Lead,
        required: true,
        attributes: ["team_L_name"],
        where: {
          team_L_isDeleted: 0,
          team_L_isPaused: 0,
          sup_id: req.query.sup_id,
        },
      },
    ],
    where: {
      paused: 0,
      team_lead_forward_status: true,
      sup_dateTime: null,
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

  if (allRecommendations) res.status(200).send({ allRecommendations });
  else res.status(404).send({ allRecommendations });
});

//route to display all the approved and delcine recommendations
router.get("/viewRecommendationsHistory", async (req, res) => {
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
  );

  //getting the recommendation list from the data

  let allRecommendations = await Database.Advertisement_Recommendation.findAll({
    attributes: [
      "sup_forward_status",
      "sup_decline_status",
      "sup_decline_descr",
      "sup_dateTime",
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
        model: Database.Team_Lead,
        required: true,
        attributes: ["team_L_name"],
        where: {
          team_L_isDeleted: 0,
          team_L_isPaused: 0,
          sup_id: req.query.sup_id,
        },
      },
    ],
    where: {
      paused: 0,
      [Op.or]: [
        {
          sup_forward_status: true,
        },
        {
          sup_decline_status: true,
        },
      ],
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

  res.status(200).send({ allRecommendations });
  res.end();
});

//route to manage team
router.get("/manageTeam", async (req, res) => {
  //getting the notificaton of the user
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
  );

  // getting the all executive which are no in any team they are working as freelance
  let teamMember = await Database.Team_Lead.findAll({
    attributes: ["team_L_uuid", "team_L_name", "team_L_contact"],
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
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
      sup_id: req.query.sup_id,
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

  res.status(200).send({ teamMember });
  unreadNotificationCount = null;
  res.end();
});

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
