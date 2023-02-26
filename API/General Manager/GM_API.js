const { get } = require("prompt");
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


    /*** 
     * 
     * API for routes
     * 
     */

    /**
 * getting the dashboard details of the General Manager
 */

router.get( "/dashboard",
    async (req, res) => {
      //getting the count of the notificaiton
      let unreadNotificationCount = await countofNotificationOfGM (
        req.query.gm_id
      );
  
      /**
       * getting the web ADS from the DB to display the user company information
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
          gm_id: req.query.gm_id,
          // gm_isDeleted: 0,
          // gm_isPaused: 0,
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
          gm_name: GMDashboard.dataValues.gm_name,
          gm_profile_pic: GMDashboard.dataValues.gm_profile_pic,
          // gm_username: GMDashboard.dataValues.gm_username,
          gm_contact: GMDashboard.dataValues.gm_contact,
          createdAt: GMDashboard.dataValues.createdAt,
          gm_salary: GMDashboard.dataValues.gm_salary,
          comp_name: GMDashboard.dataValues.Companies_Access.dataValues.comp_name,
        }
      );
  
  
        if ( GMDashboard, profileData!== null) {
  
      res.status(200).send( {
     
        url: req.protocol + "://" + req.get("host"),
        profileData,
        webAds,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
  
      
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Find GM");
        res.end();
        return;
      }
    } 
  );
  
  //API for Assign Area
  router.get("/assignArea",
    async (req, res) => {
      //getting the notification
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
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
            gm_id: req.query.gm_id,
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
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
         Zone_with_Mangers,
         Zone,
         managers,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  }
  );


  //API FOR COMPANY PROMOTION PAGE
  router.get("/promotions",
    async (req, res) => {
      //getting the notification
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
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
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
         companyPromotions,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  }
  );

  //API FOR convey message to manager page
  router.get("/conveyMessage",
    async (req, res) => {
      //getting the GM notifications
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
      );
  
      //getting the managers
      let managers = await Database.Managers.findAll({
        attributes: ["man_id", "man_uuid", "man_name", "man_contact"],
        where: {
          gm_id: req.query.gm_id,
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
        res.status(200).send({
         
          managers,
          url: req.protocol + "://" + req.get("host"),
          unreadNotificationCount:
            unreadNotificationCount[0].dataValues.unreadNotificationCount,
        });
        res.end();
        return
         }
         else {
          res.status(200).send("Unable to Fetch Record");
          res.end();
          return;
        }
    }
  );


  //API FOR Manage Incentive PAGE
  router.get("/manageIncentive",
    async (req, res) => {
      // unread notification count of GM
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
      );
  
      /**
       * getting all the Managers from the database
       */
      
      let ManagerInfo = await Database.Managers.findAll({
        attributes: ["man_id", "man_uuid", "man_name","zone_id"],
             
        where: {
          gm_id: req.query.gm_id,
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
          gm_id: req.query.gm_id,
          paused: 0,
          deleted: 0,
        },
        group: ["adver_stock_id"],
      });
  if(ManagerInfo !== null){
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
        advertisment,
        ManagerInfo,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  }
  );


  //API FOR MANAGE MANAGERS PAGE
  router.get("/manageManagers",
    async (req, res) => {
      //getting the notificaton of the user
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
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
          gm_id: req.query.gm_id,
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
  
      res.status(200).send({
        teamMember,
        url: req.protocol + "://" + req.get("host"),
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  }
  );

  //API FOR MANAGE ZONES
  router.get("/manageZones",
    async (req, res) => {
      //getting the notification
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
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
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
         Zone,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  }
  );

  //API FOR NOTIFICATION PAGE
  router.get("/notification",
  async (req, res) => {
    /**
     * getting the count of the unread notifications
     */
    const unreadNotificationCount = await countofNotificationOfGM(
      req.query.gm_id
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
        gm_id: req.query.gm_id,
      },
      limit: 50,
    }).then((notifications) => {
      if (notifications) return notifications;
    });
    if(unreadNotification !== null){
    res.send({
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount,
      unreadNotification,
      url: req.protocol + "://" + req.get("host"),
     
    });
    res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  });


  //API FOR PROFILE
  router.get("/Profile",
    async (req, res) => {
      /**
       * getiing the user details for the profile
       */
  
      let GMData = await Database.GM_Company.findOne({
        attributes: {
          exclude: [
         
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
          gm_uuid: req.query.gm_uuid,
     
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
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
      );
      if (GMData !== null) {
      res.send({
        url: req.protocol + "://" + req.get("host"), 
        LoginEmail,
        GMData,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  }
  );

  //API FOR VIEW ALL ASSIGNED GIFT PAGE
  router.get("/viewAllAssginedGifts",

    async (req, res) => {
      // unread notification count
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
      );
  
      /// getting all assigned gifts to managers
      let giftAssigned = await Database.Advertising_Stock_Allocation.findAll({
        attributes: ["adver_stock_allocated_Quantity", "createdAt"],
        where: {
          gm_id: req.query.gm_id,
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
              gm_id: req.query.gm_id,
            },
          },
          {
            model: Database.Advertisement_Stock,
            required: true,
            attributes: ["adver_stock_name"],
            where: {
              paused: 0,
              deleted: 0,
              gm_id: req.query.gm_id,
            },
          },
        ],
      });
  if(giftAssigned !== null){
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
        giftAssigned,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  }
  );

  //API FOR VIEW ALL RECOMMENDATIONS
  router.get("/recommendations",
    async (req, res) => {
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
      );
  
      //getting the recommendation list from the data
  
      let allRecommendations =
        await Database.Advertisement_Recommendation.findAll({
          attributes: ["mana_approval", "mana_dateTime", "advert_recom_uuid","team_lead_forward_status","team_lead_decline_descr",
          "sup_forward_status","sup_decline_descr"],
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
                gm_id: req.query.gm_id,
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
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
        allRecommendations,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
      return
       }
       else {
        res.status(200).send("Unable to Fetch Record");
        res.end();
        return;
      }
  }
  );

  //API FOR ZONE REPORT
  router.get("/zoneReport",
    async (req, res) => {
      // unread notification count
      let unreadNotificationCount = await countofNotificationOfGM(
        req.query.gm_id
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
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
        ZoneInfo,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
    res.end();
    return
     }
     else {
      res.status(200).send("Unable to Fetch Record");
      res.end();
      return;
    }
  });


  /***
   * 
   * API FOR CONTROLLERS
   * 
   */

  /**
 * allocating the area to Managers
 */
 router
 .route("/allocateAreaToManager")
 .post(async (req, res) => {

  //getting the zone ID from the database
  let zoneID = await Database.Zone.findOne({
    attributes: ["zone_id"],
    where: {
      zone_uuid: req.body.selectedArea,
      deleted: 0,
      paused: 0,
    },
  }).catch((error) => {
    console.error("Error in getting zone");
    console.trace(error);
    return error ? null : true;
  });
  // let selectedEmployee = JSON.parse(req.body.employees);
  let zoneAssigned = await Database.Managers.update({
          zone_id: zoneID.zone_id,
  },
  {
    where: {
      man_uuid: req.body.employees,
      man_isDeleted: 0,
      man_isPaused: 0,
    },
  });
 
  if ((zoneID, zoneAssigned !== null)) {
    res.status(200).send({ status: "Zone Assigned Successfully" });
    res.end();
  } else {
    res.status(500).send({ error: "Please try again" });
    res.end();
  }
});


/** Edit Company Promotions **/

router
.route("/editPromotion")
.post(async (req, res) => {

let Status = req.body.status;
if((Status === "Active")){ 
const promUpdate = await Database.Company_Promotion.update({
  prom_status: 1,
  comp_prom_desc:req.body.description,
},
{
where: {
comp_prom_uuid: req.body.prom_uuid,
prom_deleted: 0
},
});
if ((promUpdate !== null)) {
 res.status(200).send({ status: "Promotion Status Assigned Successfully" });
 res.end();
} else {
 res.status(500).send({ error: "Please try again" });
 res.end();
}

}
else{
  const promUpdate = await Database.Company_Promotion.update({
    prom_status: 0,
    comp_prom_desc:req.body.description,
  },
  {
  where: {
  comp_prom_uuid: req.body.prom_uuid,
  prom_deleted: 0
  },
  });
  if ((promUpdate !== null)) {
   res.status(200).send({ status: "Promotion Status Assigned Successfully" });
   res.end();
  } else {
   res.status(500).send({ error: "Please try again" });
   res.end();
  }
 }

});

/** Delete Company Promotions **/
router
.route("/deletePromotion")
.post(async (req, res) => {

const promDeleted = await Database.Company_Promotion.update({
  prom_deleted: 1,
},
{
where: {
comp_prom_uuid: req.body.prom_uuid,
prom_deleted: 0
},
});
if ((promDeleted !== null)) {
 res.status(200).send({ status: "Promotion Deleted Successfully" });
 res.end();
} else {
 res.status(500).send({ error: "Please try again" });
 res.end();
}

});

router
.route("/addPromotion")
.post(async (req, res) => {
  let status= req.body.status;

  if(status==="Active"){
const promAdded = await Database.Company_Promotion.create({
    comp_prom_name:req.body.promTitle,
    comp_prom_desc: req.body.description,
    prom_status:1,
    prom_deleted:0,
    gm_id: req.query.gm_id,
  }).catch((error) => {
    if (error) {
      console.error(
        "Error Adding Promotion"
      );
      console.trace(error);
      return null;
    }
  })


  if (promAdded) {
    res.status(200).send({
      status: "Successfully Added Promotion",
    });
    res.end();
  } else {
  res.status(500).send({
    status: "Sorry !!! Please Try Again",
  });
  res.end();
  return

}
}
else{
  const promAdded = await Database.Company_Promotion.create({
      comp_prom_name:req.body.promTitle,
      comp_prom_desc: req.body.description,
      prom_status:0,
      prom_deleted:0,
      gm_id: req.query.gm_id,
    }).catch((error) => {
      if (error) {
        console.error(
          "Error Adding Promotion"
        );
        console.trace(error);
        return null;
      }
    })
  
  
    if (promAdded) {
      res.status(200).send({
        status: "Successfully Added Promotion",
      });
      res.end();
      return
    } else {
    res.status(500).send({
      status: "Sorry !!! Please Try Again",
    });
    res.end();
    return
  
  }
  }
});

/** Convey Message to Managers APIs */

/**
 * sending the message to the specific manager
 */
 router
 .route("/conveyMessageToSpecificManager")
 .post( async (req, res) => {
   /**
    * getting the Managers from the database
    */
   let selectedEmployee=req.body.employeeList;
   let Manager = await Database.Managers.findAll({
     attributes: ["man_id"],
     where: {
       gm_id: req.query.gm_id,
       man_isDeleted: 0,
       man_isPaused: 0,
       man_uuid: selectedEmployee.map(
        (uuid) => uuid
      ),
     },
   }).catch((error) => {
     if (error) {
       console.error("Error Fetching the Data of Managers");
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
             [Op.like]: "%General Manager%",
           },
         },
         {
           notification_title: {
             [Op.like]: "%Message from your General Manager%",
           },
         },
       ],
     },
   }).catch((error) => {
     console.error("Error in finding Notification Text");
     console.trace(error);
     return null;
   });

   let messageConveyed = await Database.ManagerNotifications.bulkCreate(
     Manager.map((member) => {
       return {
         man_id: member.dataValues.man_id,
         notification_text: req.body.messageText,
         notification_id: notificationID.dataValues.notification_id,
       };
     })
   ).catch((error) => {
     console.error("Error in creating ManagerNotifications");
     console.trace(error);
     return null;
   });

   if ((Manager, notificationID, messageConveyed === null)) {
     res.status(400).send({ error: "Please try again" });
     res.end();
     return
   } else {
     res.status(200).send({ status: "Successfully, Message has been send" });
     res.end();
   }
 });

 /**
* Controller for sending message to all Managers
*/
router
.route("/conveyMessageToAllManagers")
.post(async (req, res) => {
  //getting all the Managers
  let Manager = await Database.Managers.findAll({
    attributes: ["man_id"],
    where: {
      gm_id: req.query.gm_id,
      man_isDeleted: 0,
      man_isPaused: 0,
    },
  }).catch((error) => {
    if (error) {
      console.error("Error Fetching the Data of Manager");
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
            [Op.like]: "%General Manager%",
          },
        },
        {
          notification_title: {
            [Op.like]: "%Message from your General Manager%",
          },
        },
      ],
    },
  }).catch((error) => {
    console.error("Error in finding Notification Text");
    console.trace(error);
    return null;
  });

  /**
   * creating the notificaiton text for the Manager
   */
  let messageConveyed = await Database.ManagerNotifications.bulkCreate(
   Manager.map((member) => {
      return {
        man_id: member.dataValues.man_id,
        notification_text: req.body.messageText,
        notification_id: notificationID.dataValues.notification_id,
      };
    })
  ).catch((error) => {
    console.error("Error in creating Manager Notifications");
    console.trace(error);
    return null;
  });

  if ((Manager, notificationID, messageConveyed === null)) {
    res.status(500).send({ error: "Please try again" });
    Manager = notificationID = messageConveyed = null;
    res.end();
    return
  } else {
    res.status(200).send({ status: "Successfully, Message has been send" });
    res.end();
    return
  }
});

/**
 * assigning the gifts to the Managers
 */
router
.route("/assignGiftToManager")
.put(async (req, res) => {
  //getting the manager
  let managerInfo = await Database.Managers.findOne({
    where: {
      gm_id: req.query.gm_id,
      man_isDeleted: 0,
      man_isPaused: 0,
    },
  }).catch((error) => {
    if (error) {
      console.error(
        "Error Fetching the Data of Manager for Assigning Gift"
      );
      console.trace(error);
      return null;
    }
  });

  let getGiftData = await Database.Advertisement_Stock.findOne({
    attributes: ["adver_stock_id", "adver_stock_total_Quantity"],
    where: {
      advert_stock_uuid: req.body.gift,
      paused: 0,
      deleted: 0,
      gm_id: req.query.gm_id,
    },
  }).catch((error) => {
    if (error) {
      console.error(
        "Error Fetching the Data of Advertisement Stock for Assigning Gift"
      );
      console.trace(error);
      return null;
    }
  });

  // /**
  //  * here is the critical code for the assigning the gift..
  //  * here if the user ask to allocate the gift
  //  * the  total sum of the gift is taken care of
  //  * first if the user enter the
  //  */
  if (
    getGiftData.dataValues.adver_stock_total_Quantity > +req.body.giftAssigned
  ) {
    let creatingGifts = await Database.Advertising_Stock_Allocation.create({
      adver_stock_allocated_Quantity: +req.body.giftAssigned,
      adver_stock_id: getGiftData.dataValues.adver_stock_id,
      man_id: managerInfo.dataValues.man_id,
      gm_id: req.query.gm_id,
    }).catch((error) => {
      if (error) {
        console.error(
          "Error Creating the stock of Advertisement Allocation Stock from General Manager to  Manager"
        );
        console.trace(error);
        return null;
      }
    });

    if (creatingGifts) {
      res.status(200).send({
        status: "Successfully Gift Assgined",
      });
      res.end();
return
    }
  } else {
    res.status(400).send({
      status: "Sorry !!! Please Try Again",
    });
    res.end();
return
  }
});

/** Remove Manager from Team */
router.route("/removeManagerfromteam").put(async (req, res) => {
  // checking the user inofrmation from the database and also getting the role and field id
  const managerInfo = await Database.User_Login_Information.findOne({
    attributes: ["login_id", "user_role_id"],
    include: {
      model: Database.Managers,
      required: true,
      attributes: ["man_id"],
      where: {
        //using the UUID from the front end
        man_uuid: req.body.id,
        man_isDeleted: false,
        man_isPaused: false,
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
        console.log("Error Getting the Manager Info");
        console.trace(err);
        return null;
      }
    });

  //  and adding the gm_id against manager to the NULL
  const updateManager = await sequelize
    .query(
      `UPDATE managers SET gm_id = NULL WHERE man_uuid = '${req.body.id}';`,
      null,
      { raw: true }
    )
    .then((response) => {
      return response;
    })

    .catch((err) => {
      if (err) {
        console.log("Error Updating the Manager Info");
        console.trace(err);
        return null;
      }
    });

  //update the role of the user to Field Executive

  if (updateManager) {
    // adding the role information into the roleChanged table
    const roleChanged = await Database.ChangeManagerRoleLogs.create({
      previousRole: managerInfo.dataValues.user_role_id,
      newRole: 0,
      man_id: managerInfo.dataValues.Manager.dataValues.man_id,
      gm_id: req.query.gm_id,
    }).catch((err) => {
      if (err) {
        console.log("Error Creating the User Role Change Info");
        console.trace(err);
        return null;
      }
    });

    //sending the response to the user
    if ((managerInfo, updateManager, roleChanged)) {
      res.status(200).send({
        status: "Done",
      });
      res.end();
    } else {
      res.status(400).send({
        error: "error",
      });
      res.end();
    }
  } else {
    res.status(400).send({
      error: "error",
    });
    res.end();
  }
});

/** Gm changing zone Status **/

router
.route("/changeZoneStatus")
.post(async (req, res) => {

let zoneStatus = req.body.selectedValue;
if((zoneStatus === "Active")){
 
 zoneupdate = await Database.Zone.update({
 paused: 0,
},
{
where: {
zone_uuid: req.body.Zone_uuid,
deleted: 0
},
});
if ((zoneupdate !== null)) {
 res.status(200).send({ status: "Zone Status Assigned Successfully" });
 res.end();
} else {
 res.status(500).send({ error: "Please try again" });
 res.end();
}

}
else{
 const zoneupdate = await Database.Zone.update({
   paused: 1,
 },
 {
 where: {
 zone_uuid: req.body.Zone_uuid,
 deleted: 0
 },
});
if ((zoneupdate !== null)) {
 res.status(200).send({ status: "Zone Status Assigned Successfully" });
 res.end();
} else {
 res.status(500).send({ error: "Please try again" });
 res.end();
}
}

});

/**
 * reading all the notification to isRead to true
 * so it will make the notification is read
 */
router.route("/readAllGMNotifications").post(async (req, res) => {
  const Notifications = await Database.GMNotifications.update(
    {
      isRead: true,
    },
    {
      where: {
        gm_id: req.query.gm_id,
        isRead: false,
      },
    }
  ).then((response) => {
    if (response) return response;
  });

  if (Notifications) res.status(200).send({ status: "Updated" });
});

//APIs for Profile page
router
.route("/updateGMProfile")
.put(async (req, res) => {
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
          login_id: req.query.login_id,
          paused: 0,
          deleted: 0,
        },
      }
    );

    const updateExecutiveInfo = await Database.GM_Company.update(
      {
        gm_name: userReqBody.fullname,
        gm_contact: userReqBody.contact,
        gm_username: userReqBody.username,
      },
      {
        where: {
          gm_uuid: req.query.gm_uuid,
        },
      }
    );
    if (emailUpdate && updateExecutiveInfo) {
      res.status(200).send({ status: "Information Updated" });
    } else {
      console.trace(
        "There is an error while updating the Information of User @ Line"
      );
      res.status(404).send({
        error: "error",
        details: "Error! while updating your information.",
      });
    }
  } else
    res.status(404).send({ error: "error", details: "Invalid entered data" });
});

// for upload profile pic
router
.route("/generalManager/upload")
.put(async (req, res) => { 
  multerFile_Upload_ForAPI(req, res, (err) => {
    if (err) {
      return res.send({ messages: err, type: "danger" });
    } else {
      let filename = req.files[0].filename;
      let filePath = req.files[0].destination.split("./public");

      Database.GM_Company.update(
        {
          gm_profile_pic: filePath[1] + filename,
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

  /**
 * Update information
 * like full name, contact and username
 */
  router
  .route("/generalManager/updateProfileInfo")
  .put(async (req, res) => {
    console.log(req.query.type_name,req.query.login_id,req.body.name,req.query.gm_uuid)
    const dbResponse = await Database.Role_ExtraInfo.findOne({
      attributes: ["salary"],
      include: {
        model: Database.User_Role,
        where: {
          type_name: req.query.type_name,
        },
      },
      where: {
        paused: 0,
        deleted: 0,
      },
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error) {
          console.error("Error! Can not Fetch Commissions and Target from DB");
          console.trace(error);
          return null;
        }
      });
  
    if (dbResponse === null) {
      res
        .status(400)
        .send({
          type: "danger",
          messages: "Error! Please try Again! ",
        })
        .end();
    } else {
      await Database.GM_Company.update(
        {
          gm_name: req.body.name,
          gm_contact: req.body.contact,
          // gm_username: req.body.username,
          gm_salary: dbResponse.dataValues.salary,
        },
        {
          where: {
            login_id: req.query.login_id,
          },
        }
      )
        .then((response) => {
          if (response) {
            res.status(200).send({
              type: "success",
              messages: "Updated",
              uuid: req.query.gm_uuid,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(400).send({
            type: "danger",
            messages: "Error! Can not update the Profile. Please Try Again! ",
          });
        });
    }
  });


   /**
 * getting the analytics from the data base for the specific city
 */
router
.route("/getCityAnalytics/:cityUUID")
.post(async (req, res) => {
  //getting the teams from the city UUID
  //getting the City id from City table
  let teamLeadID = await Database.City.findAll({
    attributes: ["city_id"],
    where: {
      city_uuid: req.params.cityUUID,
      deleted: 0,
      paused: 0,
    },
  })
    //getting the city id which is recieved from the prarmeter
    .then((cityID) => cityID.map((city) => city.city_id))
    .then((cityAssosiate) =>
      //finding the city id from the assosiate and also validating the sup id from the session
      Database.City_and_Supervisor_associate.findAll({
        where: {
          city_id: cityAssosiate,
          deleted: 0,
          paused: 0,
        },
      })
    )
    //making an array from the previous promise city supervisor assosiate id
    .then((cityAssosiate) =>
      cityAssosiate.map(
        (cityAssosiate_id) => cityAssosiate_id.city_supp_assos_id
      )
    )
    //getting the
    .then((cityAssosiate) =>
      Database.City_Areas.findAll({
        where: {
          city_supp_assos_id: cityAssosiate,
          deleted: 0,
          paused: 0,
        },
      })
    )
    .then((cityAreas) => cityAreas.map((area) => area.city_area_id))
    .then((cityAreas_id) =>
      Database.Team_Lead.findAll({
        attributes: ["team_L_id", "team_L_uuid", "team_L_name"],
        where: {
          city_area_id: cityAreas_id,
          team_L_isDeleted: 0,
          team_L_isPaused: 0,
        },
      })
    );

  /**
   * getting the members from the database
   */

  let teamMember = await Database.Field_Executive.findAll({
    attributes: ["field_id", "field_uuid", "field_name"],
    where: {
      team_L_id: teamLeadID.map((team) => team.team_L_id),
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
  let activitiesPerMonth = await Database.Activities.findAll({
    attributes: [
      [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
      [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
      [sequelize.fn("COUNT", sequelize.col("*")), "activitiesPerMonth"],
      // [
      //   sequelize.fn("COUNT", sequelize.col("cancelled")),
      //   "cancelledactivitiesPerMonth"
      // ]
    ],
    group: ["moonth", "Year"],
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

  let cancelledactivitiesPerMonth = await Database.Activities.findAll({
    attributes: [
      [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
      [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
      [
        sequelize.fn("COUNT", sequelize.col("cancelled")),
        "cancelledactivitiesPerMonth",
      ],
    ],
    group: ["moonth", "Year"],
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
  let agencyCount = await Database.Agency_Info.findAll({
    attributes: [
      [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
      [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
      [sequelize.fn("COUNT", sequelize.col("*")), "agencyCount"],
    ],
    group: ["moonth", "Year"],
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

  if (
    (teamLeadID,
    teamMember,
    activitiesPerMonth,
    cancelledactivitiesPerMonth,
    agencyCount)
  ) {
    res.status(200).send({
      status: "Displaying the Data",
      activitiesPerMonth,
      cancelledactivitiesPerMonth,
      agencyCount,
      teamLeadID,
    });
    res.end();
    return
  } else {
    res.status(200).send({
      status: "Not Found",
      message: "No Record Found",
      teamLeadID,
      teamMember,
      activitiesPerMonth,
      cancelledactivitiesPerMonth,
      agencyCount,
    });
    res.end();
  return
  }

});

  module.exports = { router };


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