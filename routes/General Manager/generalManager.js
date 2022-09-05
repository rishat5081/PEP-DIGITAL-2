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


//getting recommendations records
router.get(
  "/recommendations/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );

    //getting the recommendation list from the data

    let allRecommendations =
      await Database.Advertisement_Recommendation.findAll({
        attributes: ["mana_approval", "mana_dateTime", "advert_recom_uuid","team_lead_forward_status","team_lead_decline_descr","sup_forward_status","sup_decline_descr"],
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
            model: Database.Managers,
            required: true,
            attributes: ["man_name"],
            where: {
              man_isDeleted: 0,
              man_isPaused: 0,
              gm_id: req.session.profileData.gm_id,
            },
          },
          {
            model: Database.Team_Lead,
            required: true,
            attributes: ["team_L_name"],
            where: {
                team_L_isDeleted: 0,
                team_L_isPaused: 0,
            },
          },
          {
            model: Database.Supervisor,
            required: true,
            attributes: ["sup_name"],
            where: {
                sup_isDeleted: 0,
                sup_isPaused: 0,
            },
          },
        ],
        where: {
          paused: 0,
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
        if (allRecommendations !== null) {
    res.status(200).render("General Manager/viewAllRecommendations", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
      },
      allRecommendations,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
    res.end();
  } else {
    res
      .status(200)
      .redirect(`/generalManager/dashboard/${req.session.profileData.gm_uuid}`);
  }
}
);


/**
 * convey the message to managers
 */
 router.get(
  "/conveyMessage/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    //getting the GM notifications
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );

    //getting the managers
    let managers = await Database.Managers.findAll({
      attributes: ["man_id", "man_uuid", "man_name", "man_contact"],
      where: {
        gm_id: req.session.profileData.gm_id,
        man_isDeleted: 0,
        man_isPaused: 0,
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

    if (managers !== null) {
      res.status(200).render("General Manager/conveyMessageToManagers", {
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.gm_uuid,
        },
        managers,
        url: req.protocol + "://" + req.get("host"),
        user_role: req.session.passport.user.userRole,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        permissions: req.session.permissions.permissionObject,
      });

      unreadNotificationCount = null;
      res.end();
    } else {
      res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
    }
  }
);

//route to manage Managers
router.get(
  "/manageManagers/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    //getting the notificaton of the user
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );
    // getting the all managers
    let teamMember = await Database.Managers.findAll({
      attributes: ["man_uuid", "man_name", "man_contact"],
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
        man_isDeleted: 0,
        man_isPaused: 0,
        gm_id: req.session.profileData.gm_id,
      },
    })
      .then((member) => {
        return member ? member : null;
      })
      .catch((error) => {
        console.error("Error in getting Manager Member");
        console.trace(error);
        return error ? null : true;
      });
      if (teamMember !== null) {

    res.status(200).render("General Manager/manageManagers", {
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
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
  }
  else {
    res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
  } 
}
);


/**
 * getting Manage Incentive 
 */

router.get(
  "/manageIncentive/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    // unread notification count of GM
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );

    /**
     * getting all the Managers from the database
     */
    
    let ManagerInfo = await Database.Managers.findAll({
      attributes: ["man_id", "man_uuid", "man_name","zone_id"],
           
      where: {
        gm_id: req.session.profileData.gm_id,
        man_isDeleted: 0,
        man_isPaused: 0,
      },
    });
 /**
    //  * Getting the advertisment which are allocated to the GM
    //  */

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
        gm_id: req.session.profileData.gm_id,
        paused: 0,
        deleted: 0,
      },
      group: ["adver_stock_id"],
    });
if(ManagerInfo !== null){
    res.status(200).render("General Manager/manageIncentive", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
      },
      advertisment,
      ManagerInfo,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
    advertisment = ManagerInfo = null;
  }
  else {
    res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
  }
}
);


/**
 * view all assigned gifts
 */
/***
 * view all assigned gifts route
 */
 router.get(
  "/viewAllAssginedGifts/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );

    /// getting all assigned gifts to managers
    let giftAssigned = await Database.Advertising_Stock_Allocation.findAll({
      attributes: ["adver_stock_allocated_Quantity", "createdAt"],
      where: {
        gm_id: req.session.profileData.gm_id,
        paused: 0,
        deleted: 0,
      },
      include: [
        {
          model: Database.Managers,
          required: true,
          attributes: ["man_name"],
          where: {
            man_isPaused: 0,
            man_isDeleted: 0,
            gm_id: req.session.profileData.gm_id,
          },
        },
        {
          model: Database.Advertisement_Stock,
          required: true,
          attributes: ["adver_stock_name"],
          where: {
            paused: 0,
            deleted: 0,
            gm_id: req.session.profileData.gm_id,
          },
        },
      ],
    });
if(giftAssigned !== null){
    res.status(200).render("General Manager/viewAllAssignedGifts", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
      },
      giftAssigned,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
  }
  else {
    res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
  }
}
);

/**
 * getting the zone reports from the database
 */
router.get(
  "/zoneReport/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    // unread notification count
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );
// getting cities and zones
    let ZoneInfo = await Database.Zone.findAll({
      attributes: ["zone_id", "zone_uuid", "zone_name"],
       include: {
        model: Database.City,
         attributes: [ "city_id","city_name", "city_uuid","city_code"],
         required: true,
         where: {
        paused: 0, 
        deleted: 0,
       },
    
     
      },
    });
    if(ZoneInfo !== null){
    res.status(200).render("General Manager/zoneReports", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
      },
      ZoneInfo,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
  }
  else {
    res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
  }
}  );


/**
 * getting the count of notifications from the database
 */
 const countofNotificationOfGM = async (gm_id) => {
  return await Database.GMNotifications.findAll({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("gm_Company_notification_id")),
        "unreadNotificationCount",
      ],
    ],
    where: {
      isRead: false,
      gm_id,
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


// /**
//  * making the route for the GM to assign the area to Managers
//  */
 router.get(
  "/assignArea/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    //getting the notification
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );

    // getting managers with zones
    let Zone_with_Mangers = await Database.Zone.findAll({
      attributes: ["zone_id", "zone_uuid", "zone_name"],
      required: true,
       include: {
        model: Database.Managers,
         attributes: [ "man_id","man_name", "man_uuid","man_email"],
         required: true,
         where: {
          man_isDeleted: 0,
          man_isPaused: 0,
          gm_id: req.session.profileData.gm_id,
        },
      
       },
       where: {
        paused: 0,
        deleted: 0,
      },
     
    });
    let Zone = await Database.Zone.findAll({
      attributes: ["zone_id", "zone_uuid", "zone_name"],
      required: true,
    
    where: {
     paused: 0,
     deleted: 0,
   },
    });
    let managers = await Database.Managers.findAll({
      attributes: ["man_id", "man_uuid", "man_name","zone_id"],
      required: true,
    
    where: {
      man_isPaused: 0,
      man_isDeleted: 0,
   },
    });
    if(Zone_with_Mangers,Zone,managers !== null){
    res.status(200).render("General Manager/allocateArea", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
      },
       Zone_with_Mangers,
       Zone,
       managers,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
  }
  else {
    res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
  }
}
);

// /**
//  * making the route for the GM to manage zones
//  */
router.get(
  "/manageZones/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    //getting the notification
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );

 // getting all zones
    let Zone = await Database.Zone.findAll({
      attributes: ["zone_id", "zone_uuid", "zone_name","paused"],
      required: true,
    
    where: {
     deleted: 0,
   },
    });
  
    if(Zone !== null){
    res.status(200).render("General Manager/manageZones", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
      },
       Zone,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
  }
  else {
    res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
  }
}
);


// /**
//  * making the route for the GM to look for promotions
//  */
router.get(
  "/promotions/:gm_uuid",
  isUser_Login,
  isGMAuthentic,
  async (req, res) => {
    //getting the notification
    let unreadNotificationCount = await countofNotificationOfGM(
      req.session.profileData.gm_id
    );

 // getting all company promotions
    let companyPromotions = await Database.Company_Promotion.findAll({
      attributes: ["comp_prom_id", "comp_prom_uuid","comp_prom_name", "comp_prom_desc","prom_status"],
      required: true,
    
    where: {
      prom_deleted: 0,
   },
    });
  
    if(companyPromotions !== null){
    res.status(200).render("General Manager/companyPromotions", {
      url: req.protocol + "://" + req.get("host"),
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.gm_uuid,
      },
       companyPromotions,
      user_role: req.session.passport.user.userRole,
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      permissions: req.session.permissions.permissionObject,
    });
  }
  else {
    res.redirect(`/generalManager/dashboard/${req.session.profileData.gm_id}`); 
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
 * signout the General Manager
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
  res.redirect(`/genralManager/dashboard/${req.session.profileData.gm_uuid}`);
});

module.exports = { router, isGMAuthentic };