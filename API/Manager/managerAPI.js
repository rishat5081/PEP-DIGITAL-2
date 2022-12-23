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


    /**
 * getting the dashboard details of the Manager
 */
router.get(
    "/dashboard",
  
    async (req, res) => {
      //getting the count of the notificaiton
      let unreadNotificationCount = await countofNotificationOfManager(
        req.query.man_id
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
          man_id: req.query.man_id,
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
          man_name: managerDashboard.dataValues.man_name,
          man_userProfilePic: managerDashboard.dataValues.man_userProfilePic,
          man_username: managerDashboard.dataValues.man_username,
          man_contact: managerDashboard.dataValues.man_contact,
          createdAt: managerDashboard.dataValues.createdAt,
          man_salary: managerDashboard.dataValues.man_salary,
          d_name: managerDashboard.dataValues.Department.dataValues.d_name,
          zone_name: managerDashboard.dataValues.Zone.dataValues.zone_name,
        }
      );
  
      // if (!(webAds, unreadNotificationCount, profileData, managerDashboard)) {
      //   res.status(500).redirect("/manager/signout");
      //   res.end();
      // } else {
      res.status(200).send({
      
        url: req.protocol + "://" + req.get("host"),
        profileData,
        webAds,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
  
      res.end();
      return;
      // }
      //   res.send({ js: "sjdbnk" });
    }
  );

  // API FOR ALLOCATE AREA PAGE
  
  router.get(
    "/assignArea",
    
    async (req, res) => {
      //getting the notification
      let unreadNotificationCount = await countofNotificationOfManager(
        req.query.man_id
      );
  
      let supervisor_and_City = await Database.Supervisor.findAll({
        attributes: ["sup_id", "man_id", "sup_name", "sup_contact"],
        where: {
          sup_isDeleted: 0,
          sup_isPaused: 0,
          man_id: req.query.man_id,
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
          man_id: req.query.man_id,
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
          zone_id: req.query.zone_id,
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
        res.status(200).send( {
          url: req.protocol + "://" + req.get("host"),
         
          supervisor_and_City,
          supervisor,
          city,
          unreadNotificationCount:
            unreadNotificationCount[0].dataValues.unreadNotificationCount,
        });
        res.end();
    } else {
        res.status(400).send({ status: "error", message: "Invalid parameters" });
      }
    });

  // API for CONVEY MESSAGE TO SUPERVISOR PAGE
  router.get(
    "/conveyMessage",

    async (req, res) => {
      //getting the team lead notifications
      let unreadNotificationCount = await countofNotificationOfManager(
        req.query.man_id
      );
  
      //getting the team-lead , member
      let teamMember = await Database.Supervisor.findAll({
        attributes: ["sup_id", "sup_uuid", "sup_name", "sup_contact"],
        where: {
          man_id: req.query.man_id,
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
        res.status(200).send({
         
          teamMember,
          url: req.protocol + "://" + req.get("host"),
          unreadNotificationCount:
            unreadNotificationCount[0].dataValues.unreadNotificationCount,
        });
  
        res.end();
    } else {
        res.status(400).send({ status: "error", message: "Invalid parameters" });
      }
    });


    // API FOR MANAGE INCENTIVE PAGE 
    router.get(
        "/manageIncentive",
        async (req, res) => {
          // unread notification count
          let unreadNotificationCount = await countofNotificationOfManager(
            req.query.man_id
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
              man_id: req.query.man_id,
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
              man_id: req.query.man_id,
              paused: 0,
              deleted: 0,
            },
            group: ["adver_stock_id"],
          });
      if(advertisment, superVisorsInfo !== null){
          res.status(200).send({
            url: req.protocol + "://" + req.get("host"),
            advertisment,
            superVisorsInfo,
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount,
            });
            res.end();
          } else {
              res.status(200).send({
                status: "error",
                message: "No Record found",
              });
              res.end();
              return;
            }
          });


      // API FOR MANAGE TEAM PAGE
      router.get(
        "/manageTeam",
      
        async (req, res) => {
          //getting the notificaton of the user
          let unreadNotificationCount = await countofNotificationOfManager(
            req.query.man_id
          );
          // getting the all executive which are no in any team they are working as freelance
          let teamMember = await Database.Supervisor.findAll({
            attributes: ["sup_uuid", "sup_name", "sup_contact"],
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
              sup_isDeleted: 0,
              sup_isPaused: 0,
              man_id: req.query.man_id,
            },
          })
            .then((member) => {
              return member ? member : null;
            })
            .catch((error) => {
              console.error("Error in getting Supervisor Member");
              console.trace(error);
              return error ? null : true;
            });
      if(teamMember ){
          res.status(200).send({
           
            teamMember,
            url: req.protocol + "://" + req.get("host"),
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount,
            });
            res.end();
          } else {
              res.status(200).send({
                status: "error",
                message: "No Record found",
              });
              res.end();
              return;
            }
          });

      //API FOR NOTIFICATION PAGE
      router.get("/notification",
       async (req, res) => {
        /**
         * getting the count of the unread notifications
         */
        const unreadNotificationCount = await countofNotificationOfManager(
          req.query.man_id
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
            man_id: req.query.man_id,
          },
          limit: 50,
        }).then((notifications) => {
          if (notifications) return notifications;
        });
        res.send({
          unreadNotificationCount:
            unreadNotificationCount[0].dataValues.unreadNotificationCount,
          unreadNotification,
          url: req.protocol + "://" + req.get("host"),
          
        });
      });

      //API FOR PROFILE PAGE
      router.get(
        "/Profile",
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
              man_uuid: req.query.man_uuid,
              man_isDeleted: 0,
              man_isPaused: 0,
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
          let unreadNotificationCount = await countofNotificationOfManager(
            req.query.man_id
          );
      if(LoginEmail, managerData !== null){
          res.send({
            url: req.protocol + "://" + req.get("host"),
            LoginEmail,
            managerData,
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount,
            });
            res.end();
          } else {
              res.status(200).send({
                status: "error",
                message: "No Record found",
              });
              res.end();
              return;
            }
          });

      //API FOR VIEW ALL AGENCIES PAGE
      router.get(
        "/viewAgencies",
   
        async (req, res) => {
          // unread notification count
          let unreadNotificationCount = await countofNotificationOfManager(
            req.query.man_id
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
                man_id: req.query.man_id,
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
          if(getCityArea,cityNameData !== null){
          res.status(200).send({
            url: req.protocol + "://" + req.get("host"),
          
            getCityArea,
            cityNameData,
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount,
            });
            res.end();
          } else {
              res.status(200).send({
                status: "error",
                message: "No Record found",
              });
              res.end();
              return;
            }
          });


      // API FRO ALL ASSIGNED GIFT PAGE
      router.get(
        "/viewAllAssginedGift",
       
        async (req, res) => {
          // unread notification count
          let unreadNotificationCount = await countofNotificationOfManager(
            req.query.man_id
          );
      
          let giftAssigned = await Database.Advertising_Stock_Allocation.findAll({
            attributes: ["adver_stock_allocated_Quantity", "createdAt"],
            where: {
              man_id: req.query.man_id,
              paused: 0,
              deleted: 0,
            },
            include: [
              {
                model: Database.Supervisor,
                required: true,
                attributes: ["sup_name"],
                where: {
                  sup_isPaused: 0,
                  sup_isDeleted: 0,
                  man_id: req.query.man_id,
                },
              },
              {
                model: Database.Advertisement_Stock,
                required: true,
                attributes: ["adver_stock_name"],
                where: {
                  paused: 0,
                  deleted: 0,
                  man_id: req.query.man_id,
                },
              },
            ],
          });
          if(giftAssigned){
          res.status(200).send({
            url: req.protocol + "://" + req.get("host"),
           
            giftAssigned,
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount,
            });
            res.end();
          } else {
              res.status(200).send({
                status: "error",
                message: "No Record found",
              });
              res.end();
              return;
            }
          });

      //API FOR VIEW aLL RECOMMENDATION
      //getting recommendations
router.get(
    "/recommendations",
    async (req, res) => {
      let unreadNotificationCount = await countofNotificationOfManager(
        req.query.man_id
      );
  
      //getting the recommendation list from the data
  
      let allRecommendations =
        await Database.Advertisement_Recommendation.findAll({
          attributes: ["sup_forward_status", "sup_dateTime", "advert_recom_uuid"],
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
              model: Database.Supervisor,
              required: true,
              attributes: ["sup_name"],
              where: {
                sup_isDeleted: 0,
                sup_isPaused: 0,
                man_id: req.query.man_id,
              },
            },
          ],
          where: {
            paused: 0,
            sup_forward_status: true,
            mana_dateTime: null,
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
  if(allRecommendations){
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
        
        allRecommendations,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
    } else {
        res.status(200).send({
          status: "error",
          message: "No Record found",
        });
        res.end();
        return;
      }
    });
  //API for recommendation history page
  router.get(
    "/viewRecommendationsHistory",

    async (req, res) => {
      let unreadNotificationCount = await countofNotificationOfManager(
        req.query.man_id
      );
  
      //getting the recommendation list from the data
  
      let allRecommendations =
        await Database.Advertisement_Recommendation.findAll({
          attributes: ["mana_approval", "mana_dateTime", "advert_recom_uuid"],
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
              model: Database.Supervisor,
              required: true,
              attributes: ["sup_name"],
              where: {
                sup_isDeleted: 0,
                sup_isPaused: 0,
                man_id: req.query.man_id,
              },
            },
          ],
          where: {
            paused: 0,
            [Op.or]: [
              {
                mana_approval: true,
              },
              {
                mana_approval: false,
              },
            ],
            mana_dateTime: { [Op.ne]: null },
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
  if(allRecommendations){
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
       
        allRecommendations,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
      });
      res.end();
    } else {
        res.status(200).send({
          status: "error",
          message: "No Record found",
        });
        res.end();
        return;
      }
    });
    
    /**
     * 
     * 
     * APIs for Manager Controllers
     * 
     * 
     */


    router
  .route("/allocateAreaToSupervisor")
  .post(async (req, res) => {
    //getting the sector ID from the database
    let sectorID = await Database.City.findOne({
      attributes: ["city_id"],
      where: {
        city_uuid: req.body.selectedArea,
        deleted: 0,
        paused: 0,
      },
    }).catch((error) => {
      console.error("Error in getting city");
      console.trace(error);
      return error ? null : true;
    });
    // let selectedEmployee = JSON.parse();


    //getting the supervisor information from the database
    let supervisorID = await Database.Supervisor.findAll({
      attributes: ["sup_id"],
      where: {
        sup_uuid: req.body.employees,
        sup_isDeleted: 0,
        sup_isPaused: 0,
      },
    }).catch((error) => {
      console.error("Error in getting Supervisor");
      console.trace(error);
      return error ? null : true;
    });

    let assignArea = await Database.City_and_Supervisor_associate.bulkCreate(
      supervisorID.map((supervisor) => {
        return {
          sup_id: supervisor.sup_id,
          city_id: sectorID.city_id,
        };
      })
    ).catch((error) => {
      console.error("Error in creating the Supervisor and City associate");
      console.trace(error);
      return error ? null : true;
    });

    if ((sectorID, supervisorID, assignArea !== null)) {
      res.status(200).send({ status: "Area Assigned Successfully" });
      res.end();
    } else {
      res.status(200).send({ error: "Area already Alloted to supervisor." });
      res.end();
    }
    ////console.(req.body);
  });


// API for CONVEY MESSAGE PAGE
// API TO CONVEY MESSAGE TO SPECIFIC SUPERVISOR
  router
  .route("/conveyMessageToSpecificSupervisor")
  .post(async (req, res) => {
    /**
     * getting the team memebers from the database
     */
    let selectedEmployee=req.body.employeeList;
    let superVisors = await Database.Supervisor.findAll({
      attributes: ["sup_id"],
      where: {
        man_id: req.query.man_id,
        sup_isDeleted: 0,
        sup_isPaused: 0,
        sup_uuid: selectedEmployee.map(
          (uuid) => uuid
        ),
      },
    }).catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Supervisor");
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
              [Op.like]: "%Manager%",
            },
          },
          {
            notification_title: {
              [Op.like]: "%Message from your Manager%",
            },
          },
        ],
      },
    }).catch((error) => {
      console.error("Error in finding Notification Text");
      console.trace(error);
      return null;
    });

    let messageConveyed = await Database.SuperVisorNotification.bulkCreate(
      superVisors.map((member) => {
        return {
          sup_id: member.dataValues.sup_id,
          notification_text: req.body.messageText,
          notification_id: notificationID.dataValues.notification_id,
        };
      })
    ).catch((error) => {
      console.error("Error in creating Manager Notifications");
      console.trace(error);
      return null;
    });

    if ((superVisors, notificationID, messageConveyed === null)) {
      res.status(400).send({ error: "Please try again" });
      res.end();
    } else {
      res.status(200).send({ status: "Successfully, Message has been send" });
      res.end();
    }
  });



  // API TO CONVEY MESSAGE TO ALL SUPERVISOR
router
.route("/conveyMessageToAllSupervisor")
.post(async (req, res) => {
  //getting all the supervisorssuperVisors
  let superVisors = await Database.Supervisor.findAll({
    attributes: ["sup_id"],
    where: {
      man_id: req.query.man_id,
      sup_isDeleted: 0,
      sup_isPaused: 0,
    },
  }).catch((error) => {
    if (error) {
      console.error("Error Fetching the Data of Supervisor");
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
            [Op.like]: "%Manager%",
          },
        },
        {
          notification_title: {
            [Op.like]: "%Message from your Manager%",
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
   * creating the notificaiton text for the supervisor
   */
  let messageConveyed = await Database.SuperVisorNotification.bulkCreate(
    superVisors.map((member) => {
      return {
        sup_id: member.dataValues.sup_id,
        notification_text: req.body.messageText,
        notification_id: notificationID.dataValues.notification_id,
      };
    })
  ).catch((error) => {
    console.error("Error in creating SuperVisors Notifications");
    console.trace(error);
    return null;
  });

  if ((superVisors, notificationID, messageConveyed === null)) {
    res.status(400).send({ error: "Please try again" });
    res.end();
  } else {
    res.status(200).send({ status: "Successfully, Message has been send" });
    res.end();
  }
});


//API FOR MANAGE INCENTIVE PAGE
/**
 *  API for assigning the gifts to the supervisor
 */
router
  .route("/assignGiftToSupervisor")
  .put(async (req, res) => {
    //getting the teams from the req.param teamLeadUUID
    let supervisorInfo = await Database.Supervisor.findOne({
      where: {
        sup_uuid:req.body.superviosr,
        // man_id: req.query.man_id,
        sup_isDeleted: 0,
        sup_isPaused: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error(
          "Error Fetching the Data of Supervisor for Assigning Gift"
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
        man_id: req.query.man_id,
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

   
    if (
      getGiftData.dataValues.adver_stock_total_Quantity > +req.body.giftAssigned
    ) {
      let creatingGifts = await Database.Advertising_Stock_Allocation.create({
        adver_stock_allocated_Quantity: +req.body.giftAssigned,
        adver_stock_id: getGiftData.dataValues.adver_stock_id,
        sup_id: supervisorInfo.dataValues.sup_id,
        man_id: req.query.man_id,
      }).catch((error) => {
        if (error) {
          console.error(
            "Error Creating the stock of Advertisement Allocation Stock from Manager to  Supervisor"
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
      }
    } else {
      res.status(400).send({
        status: "Some Information Missing",
      });
      res.end();
    }
  });


  // API FOR MANAGE TEAM PAGE 
  // API FOR REMOVING SUPERVISOR FROM MANAGER'S TEAM 
  router.route("/removeSupervisorfromteam").put(async (req, res) => {
    // checking the user inofrmation from the database and also getting the role and field id
    const supervisorInfo = await Database.User_Login_Information.findOne({
      attributes: ["login_id", "user_role_id"],
      include: {
        model: Database.Supervisor,
        required: true,
        attributes: ["sup_id"],
        where: {
          //using the UUID from the front end
          sup_uuid: req.body.id,
          sup_isDeleted: false,
          sup_isPaused: false,
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
          console.log("Error Getting the Supervisor Info");
          console.trace(err);
          return null;
        }
      });
  
    //  and adding the Field Executive to the NULL
    const updateExecutiveToTeam = await sequelize
      .query(
        `UPDATE supervisor SET man_id = NULL WHERE sup_uuid = '${req.body.id}';`,
        null,
        { raw: true }
      )
      .then((response) => {
        return response;
      })
  
      .catch((err) => {
        if (err) {
          console.log("Error Updating the Supervisor Info");
          console.trace(err);
          return null;
        }
      });
  
    //update the role of the user to Field Executive
  
    if (updateExecutiveToTeam) {
      // adding the role information into the roleChanged table
      const roleChanged = await Database.ChangeSupervisorRoleLogs.create({
        previousRole: supervisorInfo.dataValues.user_role_id,
        newRole: 0,
        sup_id: supervisorInfo.dataValues.Supervisor.dataValues.sup_id,
        man_id: req.query.man_id,
      }).catch((err) => {
        if (err) {
          console.log("Error Creating the User Role Change Info");
          console.trace(err);
          return null;
        }
      });
  
      //sending the response to the user
      if ((supervisorInfo, updateExecutiveToTeam, roleChanged)) {
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

  //API FOR NOTIFICATIONS
  /**
 * reading all the notification to isRead to true
 * so it will make the notification is read
 */
router.route("/readAllManagerNotifications").post(async (req, res) => {
  const Notifications = await Database.ManagerNotifications.update(
    {
      isRead: true,
    },
    {
      where: {
        man_id: req.query.man_id,
        isRead: false,
      },
    }
  ).then((response) => {
    if (response) return response;
  });

  if (Notifications) res.status(200).send({ status: "Updated" });
});
      
//APIS FOR PROFLE PAGE
/**
 * updaing the profile information
 *
 */
router
  .route("/updateManagerProfile")
  .put(async (req, res) => {
    let userReqBody = { ...req.body };
    let lengthofUser_Req = Object.keys(userReqBody).length;

    if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {
      /**
       * Updating the email if the user entered the new email address
       */
      const emailUpdate = await Database.User_Login_Information.update(
        {
          login_email: req.body.email,
        },
        {
          where: {
            login_id: req.query.login_id,
            paused: 0,
            deleted: 0,
          },
        }
      );

      const updateExecutiveInfo = await Database.Managers.update(
        {
          man_name: req.body.fullname,
          man_contact: req.body.contact,
          man_username: req.body.username,
        },
        {
          where: {
            man_uuid: req.query.man_uuid,
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
router.post("/manager/upload",async (req, res) => {
  multerFile_Upload_ForAPI(req, res, (err) => {
    if (err) {
      return res.send({ messages: err, type: "danger" });
    } else {
      let filename = req.files[0].filename;
      let filePath = req.files[0].destination.split("./public");

      Database.Managers.update(
        {
          man_userProfilePic: filePath[1] + filename,
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


// API FOR UPDATING MANAGER PROFILE DATA 
router
  .route("/manager/updateProfileInfo")
  .put(async (req, res) => {
    console.log(req.body.name)
    const dbResponse = await Database.Role_ExtraInfo.findOne({
      attributes: ["target", "commission", "salary"],
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
        .status(500)
        .send({
          type: "danger",
          messages: "Error! Please try Again! ",
        })
        .end();
    } else {
      await Database.Managers.update(
        {
          man_name: req.body.name,
          man_DOB: req.body.dob,
          man_contact: req.body.contact,
          man_username: req.body.username,
          man_target: dbResponse.dataValues.target,
          man_salary: dbResponse.dataValues.salary,
          man_commission: dbResponse.dataValues.commission,
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
              uuid: req.query.man_uuid,
            });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({
            type: "danger",
            messages: "Error! Can not update the Profile. Please Try Again! ",
          });
        });
    }
  });

  // APIs FOR VIEW ALL AGAENCIES PAGE
  /**
 * Controller for sending message to all the team member
 */
router
  .route("/getCityAgencies")
  .post(async (req, res) => {
    /**
     * checking if the req.body
     *
     */
    if (req.body) {
      let agencies = await Database.City_Areas.findOne({
        attributes: ["city_area_id"],
        where: {
          city_area_uuid: req.body.cityAreaUUID,
          deleted: 0,
          paused: 0,
        },
      })
        .then((cityData) =>
          Database.Team_Lead.findAll({
            attributes: ["team_L_id"],
            where: {
              team_L_isDeleted: 0,
              team_L_isPaused: 0,
              city_area_id: cityData.city_area_id,
            },
            include: {
              model: Database.Field_Executive,
              required: true,
              attributes: ["field_id"],
              where: {
                field_isDeleted: 0,
                field_isPaused: 0,
              },
            },
          })
        )
        .then((teamLead) => teamLead.map((team) => team.Field_Executives))
        .then((teamLead) => {
          let fieldExecutive = [];
          teamLead.forEach((team) => {
            team.forEach((field) => {
              fieldExecutive.push(field.field_id);
            });
          });
          return fieldExecutive;
        })
        .then((fieldExecutive) =>
          Database.Agency_Info.findAll({
            attributes: {
              exclude: ["updateTimestamp", "field_id"],
            },
            where: {
              field_id: fieldExecutive,
            },
          })
        )
        .catch((error) => {
          if (error) {
            console.error("Error Fetching the Data of Agencies Information");
            console.trace(error);
            return null;
          }
        });
      // checking if the response of database is null or not
      if (agencies === null) {
        res.status(400).send({ error: "Please try again" });
        agencies = null;
        res.end();
      } else {
        res
          .status(200)
          .send({ status: "Successfully, Fetched Agencies", agencies });
        res.end();
      }
    } else {
      res.status(400).send({ error: "Please try again" });
      res.end();
    }
  });


/**
 * API for pausing the agency
 */
router
  .route("/pauseAgencyByManager")
  .put( async (req, res) => {
    /**
     * checking if the req.body
     *
     */
    let agencies = await Database.Agency_Info.findOne({
      where: {
        agency_uuid: req.body.agencyUUID,
      },
    })
      .then((agency) => {
        agency.update(
          {
            isPaused: agency.dataValues.isPaused === true ? false : true,
          },
          {
            sup_id: 0,
            man_id: req.query.man_id,
            individualHooks: true,
          }
        );
      })
      .catch((error) => {
        if (error) {
          console.error("Error Fetching the Data of Agencies Information");
          console.trace(error);
          return null;
        }
      });
    // checking if the response of database is null or not
    if (agencies === null) {
      res.status(400).send({ error: "Please try again" });
      res.end();
    } else {
      res
        .status(200)
        .send({ status: "Successfully, Action Done Against Agency" });
      res.end();
    }
  });

  /**
 * Controller for deleting the agency
 */
router
.route("/managerDeleteAgency")
.put(async (req, res) => {
  /**
   * checking if the req.body
   *
   */
  let agencies = await Database.Agency_Info.findOne({
    where: {
      agency_uuid: req.body.agencyUUID,
    },
  })
    .then((agency) => {
      agency.update(
        {
          deleted: agency.dataValues.deleted === true ? false : true,
        },
        {
          sup_id: 0,
          man_id: req.query.man_id,
          individualHooks: true,
        }
      );
    })
    .catch((error) => {
      if (error) {
        console.error("Error Fetching the Data of Agencies Information");
        console.trace(error);
        return null;
      }
    });
  // checking if the response of database is null or not
  if (agencies === null) {
    res.status(400).send({ error: "Please try again" });
    res.end();
  } else {
    res
      .status(200)
      .send({ status: "Successfully, Action Done Against Agency" });
    res.end();
  }
});

//APIs for View ALL RECOMMENDATIONS PAGE
router
  .route("/manager/declineRecommendation")
  .put(async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Advertisement_Recommendation.findOne({
      where: {
        advert_recom_uuid: req.body.uuid,
        deleted: false,
        paused: false,
        status: true,
        team_lead_forward_status: true,
        sup_forward_status: true,
      },
    })
      .then((result) => {
        if (result) {
          result.update({
            man_id: req.query.man_id,
            mana_dateTime: new Date().toUTCString(),
            mana_approval: false,
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
      recommendationID = null;
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

//API FOR APPROVING RECOMMENDATION
router
  .route("/manager/approveRecommendation")
  .put( async (req, res) => {
    //getting the recommendation ID from the database
    let recommendationID = await Database.Advertisement_Recommendation.findOne({
      where: {
        advert_recom_uuid: req.body.uuid,
        deleted: false,
        paused: false,
        status: true,
        team_lead_forward_status: true,
        sup_forward_status: true,
      },
    })
      .then((result) => {
        if (result) {
          result.update({
            man_id: req.query.man_id,
            mana_dateTime: new Date().toUTCString(),
            mana_approval: true,
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
      recommendationID = null;
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

// end of router

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
  
