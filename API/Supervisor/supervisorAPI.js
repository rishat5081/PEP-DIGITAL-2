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
* 
* 
* APIs for supervisor routes
* 
* 
*/
  /**
   * Api for supervisor dashboard
   */
 
 router.get(
   "/dashboard",
   // validateToken,
   async (req, res) => {
     let unreadNotificationCount = await countofNotificationOfSuperVisor(
       req.query.sup_id
     );
 
     const webAds = await Database.WebAds.findAll({
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
    sup_uuid:req.query.sup_uuid,
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
      console.error("Error Fetchin Dashboard Data of SuperVisor");
      console.trace(error);
      return null;
    }
  });
  if(supervisorDashboard !== null){


let profileData = Object.assign(
  {},
  {
    sup_name: supervisorDashboard.dataValues.sup_name,
    sup_userProfilePic: supervisorDashboard.dataValues.sup_userProfilePic,
    sup_username: supervisorDashboard.dataValues.sup_username,
    sup_contact: supervisorDashboard.dataValues.sup_contact,
    createdAt: supervisorDashboard.dataValues.createdAt,
    sup_salary: supervisorDashboard.dataValues.sup_salary,
    man_name: supervisorDashboard.dataValues.Manager.dataValues.man_name,
    Cities: supervisorDashboard.dataValues.Cities,
  }
);

if (
  (webAds,
  unreadNotificationCount,
  profileData,
  supervisorDashboard === null)
) {
  res.status(500).send({
    message: "Error Fetching Dashboard Details",
  });
  res.end();
  return;
} else {
     res.status(200).send({
       url: req.protocol + "://" + req.get("host"),
       profileData,
       webAds,
       unreadNotificationCount:
         unreadNotificationCount[0].dataValues.unreadNotificationCount
     });
    
    res.end();
  }
}
else{
  res.status(500).send({status:"error", message:"Data not found!!"});
    res.end();
}   
   });


// Supervisor  Profile

router.get(
"/profileSupervisor",
// validateToken,
async (req, res) => {
  let unreadNotificationCount = await countofNotificationOfSuperVisor(
    req.query.sup_id
  );
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
      sup_id: req.query.sup_id,
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
  if(!supervisorData || !LoginEmail){
    res.status(404).send({
      status:"error",
      message: "No User Found!!",
    });
    res.end();
    return;
  } else {
  res.status(200).send({
    url: req.protocol + "://" + req.get("host"),
    LoginEmail,
    supervisorData,
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
  });
  res.end();
  return;
}
});
 
// API For Assign Area
router.get(
  "/assignArea",
  async (req, res) => {
    //getting the notification
    let unreadNotificationCount = await countofNotificationOfSuperVisor(
      req.query.sup_id
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
        console.error(
          "Error in getting all the team members from the Database"
        );
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

    if ((!teamMember || !areaSectors || !allTeamLeads)) {
      res
          .status(404)
          .send({status:"error", message: "Error Getting Details of the Area Assign" });
        res.end();
        return;
      
      } else {
        res.status(200).send({
          url: req.protocol + "://" + req.get("host"),
          teamMember,
          allTeamLeads,
          areaSectors,
          unreadNotificationCount:
            unreadNotificationCount[0].dataValues.unreadNotificationCount,
          });
          res.end();
          return;
        
      }
    });



    // API For convey message page
    router.get(
      "/conveyMessage",
      async (req, res) => {
        //getting the supervisor notifications
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
    
        if (teamMember.length !== 0) {
          res.status(200).send({
            url: req.protocol + "://" + req.get("host"),
            teamMember,
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount,
            });
            res.end();
          } else {
            res.status(404).send({ status: "error", message: "Invalid parameters" });
          }
        });



    // API For Manage Incentive
    router.get(
      "/manageIncentive",
     
      async (req, res) => {
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
        if (!agencyTypes|| !advertisment|| !cityNames  ) {
          res.status(404).send({
            status: "error",
            message: "No Record found",
          });
          res.end();
          return;
       
        } else {
          res.status(200).send({
            url: req.protocol + "://" + req.get("host"),
            advertisment,
            cityNames,
            agencyTypes,
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount,
            });
            res.end();
            return;
         
        }
      });


    // API For Manage Team
router.get(
"/manageTeam",

async (req, res) => {
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

    if(teamMember.length >0){
    
  res.status(200).send({
    url: req.protocol + "://" + req.get("host"),
    teamMember,
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
  });
  res.end();
  return;
} else {
  res.status(404).send({
    status: "error",
    message: "No Record found",
  });
  res.end();
  return;
}
});

// API For progress Analytics
router.get(
"/progressAnalytics",

async (req, res) => {
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
  if(cityNames.length>0){
    res.status(200).send({
    
    url: req.protocol + "://" + req.get("host"),
    cityNames,
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
    });
      res.end();
      return;
    } else {
      res.status(404).send({
        status: "error",
        message: "No Record found",
      });
      res.end();
      return;
    }
  });
  
  // API For all agencies page
  router.get(
    "/viewAgencies",
    async (req, res) => {
      // unread notification count
      let unreadNotificationCount = await countofNotificationOfSuperVisor(
        req.query.sup_uuid
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
      if(getCityArea.length>0 , cityNameData.length >0){
      res.status(200).send({
        url: req.protocol + "://" + req.get("host"),
        getCityArea,
        cityNameData,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        });
        res.end();
        return;
      } else {
        res.status(404).send({
          status: "error",
          message: "No Record found",
        });
        res.end();
        return;
      }
    });

    // API for all assigned gifts
    router.get(
      "/viewAllAssginedGifts",
      async (req, res) => {
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
        if(giftAssigned.length >0){
        res.status(200).send({
          url: req.protocol + "://" + req.get("host"),
          giftAssigned,
          unreadNotificationCount:
            unreadNotificationCount[0].dataValues.unreadNotificationCount,
          });
          res.end();
          return;
        } else {
          res.status(404).send({
            status: "error",
            message: "No Record found",
          });
          res.end();
          return;
        }
      });

      // API FOR ALL RECOMMENDATIONS
      router.get(
        "/recommendations",
        async (req, res) => {
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
                team_lead_forward_status: 1,
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
      if(allRecommendations !==null){
          res.status(200).send({
            url: req.protocol + "://" + req.get("host"),
            allRecommendations,
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount,
            });
            res.end();
            return;
          } else {
            res.status(404).send({
              status: "error",
              message: "No Record found",
            });
            res.end();
            return;
          }
        });
        

        // API FOR RECOMMENDATION HISTORY
        router.get(
          "/viewRecommendationsHistory",
       
          async (req, res) => {
            let unreadNotificationCount = await countofNotificationOfSuperVisor(
              req.query.sup_id
            );
        
            //getting the recommendation list from the data
        
            let allRecommendations =
              await Database.Advertisement_Recommendation.findAll({
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
        if(allRecommendations.length>0){
            res.status(200).send({
              url: req.protocol + "://" + req.get("host"),
              allRecommendations,
              unreadNotificationCount:
                unreadNotificationCount[0].dataValues.unreadNotificationCount,
              });
              res.end();
              return;
            } else {
              res.status(404).send({
                status: "error",
                message: "No Record found",
              });
              res.end();
              return;
            }
          });


    // API For Notification page
        router.get("/notification",  async (req, res) => {
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
            res.status(404).send({
              status: "error",
              message: "No Notification Found",
            });
            res.end();
            return;
          }
        });



/**
 * 
 * 
 * APIs for controllers
 * 
 * 
 */

// update profile photo
 router.post("/supervisor/upload", async (req, res) => {
  multerFile_Upload_ForAPI(req, res, (err) => {
    if (err) {
      return res.send({ messages: err, type: "danger" });
    } else {
      let filename = req.files[0].filename;
      let filePath = req.files[0].destination.split("./public");

      Database.Supervisor.update(
        {
          sup_userProfilePic: filePath[1] + filename,
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


/// update Profile info for supervisor

//discuss this API  WITH Saad

router.route("/supervisor/updateProfileInfo").post(async (req, res) => {
const dbResponse = await Database.Role_ExtraInfo.findOne({
  include: {
    model: Database.User_Role,
    attributes: [],
    where: {
      type_name: {
        [Op.like]: "%Supervisor%",
        [Op.like]: "%SuperVisor%",
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
    // console.log(response)
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
  const updateStatus = await Database.Supervisor.update(
    {
      sup_name: req.body.name,
      sup_DOB: req.body.dob,
      sup_contact: req.body.contact,
      sup_username: req.body.username,
      sup_target: dbResponse.dataValues.target,
      sup_salary: dbResponse.dataValues.salary,
      sup_commission: dbResponse.dataValues.commission,
    },
    {
      where: {
        login_id: req.query.login_id,
      },
    }
  )
    .then((response) => {
      if (response) {
        return response;
      } else {
        return null;
      }
    })
    .catch((error) => {
      if (error) {
        console.error("Error Updating the Supervisor Info");
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
}
 else {
  res.status(503).send({
    type: "danger",
    messages: "Error! Internal Error! ",
  });
}
});


//update supervisor email
router.route("/updateSupervisorProfile").post(async (req, res) => {
let userReqBody = { ...req.body };
// console.log(req.body )
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

  const SupervisorInfo = await Database.Supervisor.update(
    {
      sup_name: req.body.fullname,
      sup_contact: req.body.contact,
      sup_username: req.body.username,
    },
    {
      where: {
        sup_id: req.query.sup_id,
      },
    }
  );
  if (emailUpdate && SupervisorInfo) {
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

// API FOR ALLOCATE AREA PAGE CONTROLLERS
router.route("/allocateAreaToTeamLead").post(async (req, res) => {
  //getting the sector ID from the database
  let sectorID = await Database.City_Areas.findOne({
    attributes: ["city_area_id"],
    where: {
      city_area_uuid: req.body.selectedArea,
      deleted: 0,
      paused: 0,
    },
  });
  let executiveID = await Database.Team_Lead.update(
    {
      city_area_id: sectorID.dataValues.city_area_id,
    },
    {
      where: {
        team_L_uuid: req.body.employees,
        team_L_isDeleted: 0,
        team_L_isPaused: 0,
      },
    }
  );

  if ((sectorID, executiveID !== null)) {
    res.status(200).send({ status: "Area Assigned Successfully" });
    res.end();
  } else {
    res.status(500).send({ error: "Please try again" });
    res.end();
  }

});


// API FOR CONVEY MESSAGE PAGE
// API FOR CONVEY MESSAGE TO SPECIFIC TEAMLEAD
router
.route("/conveyMessageToSpecificTeamLead")
.post(async (req, res) => {
  /**
   * getting the team memebers from the database
   */
  let selectedEmployee=req.body.employeeList
  let teamMember = await Database.Team_Lead.findAll({
    attributes: ["team_L_id"],
    where: {
      sup_id: req.query.sup_id,
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
      team_L_uuid:  selectedEmployee.map(
        (uuid) => uuid
      ),
      
    
    },
  }).catch((error) => {
    if (error) {
      console.error("Error Fetching the Data of Team Lead");
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
            [Op.like]: "%Supervisor%",
          },
        },
        {
          notification_title: {
            [Op.like]: "%Message from your Supervisor%",
          },
        },
      ],
    },
  }).catch((error) => {
    console.error("Error in finding Notification Text");
    console.trace(error);
    return null;
  });

  let messageConveyed = await Database.TeamLead_Notifications.bulkCreate(
    teamMember.map((member) => {
      return {
        team_L_id: member.dataValues.team_L_id,
        notification_text: req.body.messageText,
        notification_id: notificationID.dataValues.notification_id,
      };
    })
  ).catch((error) => {
    console.error("Error in creating ExecutiveNotifications");
    console.trace(error);
    return null;
  });

  if ((!teamMember || !notificationID || !messageConveyed)) {
    res.status(400).send({ error: "Please try again" });
    res.end();
  } else {
    res.status(200).send({ status: "Successfully, Message has been send" });
    res.end();
  }
});


// API FOR CONVEY MESSAGE TO ALL TEAMLEADS
router
.route("/conveyMessageToAllTeamLead")
.post(async (req, res) => {
  let teamMember = await Database.Team_Lead.findAll({
    attributes: ["team_L_id"],
    where: {
      sup_id: req.query.sup_id,
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
    },
  }).catch((error) => {
    if (error) {
      console.error("Error Fetching the Data of Team Lead");
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
            [Op.like]: "%Supervisor%",
          },
        },
        {
          notification_title: {
            [Op.like]: "%Message from your Supervisor%",
          },
        },
      ],
    },
  }).catch((error) => {
    console.error("Error in finding Notification Text");
    console.trace(error);
    return null;
  });

  let messageConveyed = await Database.TeamLead_Notifications.bulkCreate(
    teamMember.map((member) => {
      return {
        team_L_id: member.dataValues.team_L_id,
        notification_text: req.body.messageText,
        notification_id: notificationID.dataValues.notification_id,
      };
    })
  ).catch((error) => {
    console.error("Error in creating TeamLead Notifications");
    console.trace(error);
    return null;
  });

  if ((teamMember, notificationID, messageConveyed === null)) {
    res.status(400).send({ error: "Please try again" });
    res.end();
  } else {
    res.status(200).send({ status: "Successfully, Message has been send" });
    res.end();
  }
});

// APIs FOR MANAGE INCENTIVE PAGE
//API FOR GET TEAMLEAD 
router
.route("/getTeamLead/:cityUUID")
.get(async (req, res) => {
  //getting the teams from the req.param teamLeadUUID

  let teamLeadCityAreas = await Database.City.findAll({
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
        attributes: ["city_supp_assos_id"],
        where: {
          city_id: cityAssosiate,
          sup_id: req.query.sup_id,
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
        attributes: ["city_area_id", "city_area_uuid", "city_name"],
        where: {
          city_supp_assos_id: cityAssosiate,
          deleted: 0,
          paused: 0,
        },
      })
    );

  let teamLeads = await Database.Team_Lead.findAll({
    attributes: ["team_L_id", "team_L_uuid", "team_L_name", "city_area_id"],
    where: {
      city_area_id: teamLeadCityAreas.map((area) => area.city_area_id),
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
    },
  });

  if ((teamLeadCityAreas, teamLeads)) {
    res.status(200).send({
      status: "Displaying team lead",
      teamLeadCityAreas,
      teamLeads,
    });
    res.end();
  } else {
    res.status(404).send({ error: "No Record Found" });
    res.end();
  }

  //console.(req.body);
});

// APIs for assigning gift to selected teamleads

 /**
 *
 * 
 *    database error occurs here
 * 
 *  */
 
router
.route("/assignGiftToSelective")
.post(async (req, res) => {
  //getting the teams from the req.param teamLeadUUID

  let teamLeadInfo = await Database.City_Areas.findOne({
    attributes: ["city_area_id"],
    where: {
      city_area_uuid: req.body.cityArea,
      deleted: 0,
      paused: 0,
    },
  })
    //getting the city id which is recieved from the prarmeter
    .then((cityID) => cityID.city_area_id)
    .then((cityAssosiate) =>
      //finding the city id from the assosiate and also validating the sup id from the session
      Database.Team_Lead.findOne({
        attributes: ["team_L_id"],
        where: {
          team_L_uuid: req.body.teamLead,
          city_area_id: cityAssosiate,
          sup_id: req.query.sup_id,
          team_L_isDeleted: 0,
          team_L_isPaused: 0,
        },
      })
    )
    .catch((error) => {
      if (error) {
        console.error(
          "Error Fetching the Data of Team Lead for Assigning Gift"
        );
        console.trace(error);
        return null;
      }
    });

  let getGiftData = await Database.Advertising_Stock_Allocation.findAll({
    attributes: [
      "adver_stock_act_id",
      "adver_stock_id",
      "adver_stock_allocated_Quantity",
      "used",
    ],
    include: {
      model: Database.Advertisement_Stock,
      required: true,
      attributes: ["adver_stock_name"],
      where: {
        advert_stock_uuid: req.body.gift,
        paused: 0,
        deleted: 0,
      },
    },
    where: {
      isConsumed: 0,
      paused: 0,
      deleted: 0,
      sup_id: req.query.sup_id,
    },
  });

  /**
   * here is the critical code for the assigning the gift..
   * here if the user ask to allocate the gift
   * the  total sum of the gift is taken care of
   * first if the user enter the
   */
  let newObject = [];
  if (getGiftData.length > 0) {
    let sum = 0,
      temp = 0;
    getGiftData.some((data) => {
      if (data.adver_stock_allocated_Quantity > +req.body.giftAssigned) {
        temp = data.adver_stock_allocated_Quantity - req.body.giftAssigned;
        data.adver_stock_allocated_Quantity = temp;
        data.used = req.body.giftAssigned;
        newObject.push({
          quantity: data.adver_stock_allocated_Quantity,
          used: +data.used,
          isConsumed:
            data.adver_stock_allocated_Quantity === 0 ? true : false, // : true ? false,
          adver_stock_act_id: data.adver_stock_act_id,
        });

        return true;
      } else {
        if (sum !== +req.body.giftAssigned) {
          if (temp === 0) {
            temp =
              data.adver_stock_allocated_Quantity - req.body.giftAssigned;
            sum += data.adver_stock_allocated_Quantity;

            data.adver_stock_allocated_Quantity -= sum;
            data.used = data.adver_stock_allocated_Quantity;

            newObject.push({
              quantity: data.adver_stock_allocated_Quantity,
              used: sum,
              isConsumed:
                data.adver_stock_allocated_Quantity === 0 ? true : false, // : true ? false,
              adver_stock_act_id: data.adver_stock_act_id,
            });
          } else {
            sum += -temp;
            data.used = -temp;
            temp = data.adver_stock_allocated_Quantity - -temp;
            data.adver_stock_allocated_Quantity = temp;

            newObject.push({
              quantity: data.adver_stock_allocated_Quantity,
              used: +data.used,
              isConsumed:
                data.adver_stock_allocated_Quantity === 0 ? true : false, // : true ? false,
              adver_stock_act_id: data.adver_stock_act_id,
            });
          }
        }
      }
    });

    /**
     * now updating and allocating the record to the team lead
     */

    let allocateGift_ToTeamLead =
      await Database.Team_Lead_Adver_Stock.bulkCreate(
        newObject.map((data) => {
          return {
            team_L_id: teamLeadInfo.team_L_id,
            sup_id: req.query.sup_id,
            adver_stock_act_id: data.adver_stock_act_id,
            total_Quantity: data.used,
          };
        })
      );

    /**
     * and now updating the advertisment record
     */

    newObject.forEach(async (data) => {
      await Database.Advertising_Stock_Allocation.update(
        {
          adver_stock_allocated_Quantity: data.quantity,
          isConsumed: data.isConsumed,
          used: sequelize.literal(`used + ${data.used}`),
        },
        {
          where: {
            sup_id: req.query.sup_id,
            adver_stock_act_id: data.adver_stock_act_id,
          },
        }
      );
    });

    if (allocateGift_ToTeamLead) {
      res
        .status(200)
        .send({ status: "Successfully Gift Allocated to Team Lead" });
      sum =
        temp =
        newObject =
        teamLeadInfo =
        getGiftData =
        allocateGift_ToTeamLead =
          0;
      res.end();
    }
  } else {
    res
      .status(400)
      .send({ error: "There is error getting Advertising Stock" });
    res.end();
  }
});


// API for manage Team page
// removing teamlead form teamlead
router.route("/removeTeamLeadfromteamm").put(async (req, res) => {
  // checking the user inofrmation from the database and also getting the role and field id
  const teamleadInfo = await Database.User_Login_Information.findOne({
    attributes: ["login_id", "user_role_id"],
    include: {
      model: Database.Team_Lead,
      required: true,
      attributes: ["team_L_id"],
      where: {
        //using the UUID from the front end
        team_L_uuid: req.body.id,
        team_L_isDeleted: false,
        team_L_isPaused: false,
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
        console.log("Error Getting the TeamLead Info");
        console.trace(err);
        return null;
      }
    });

  //  and adding the Field Executive to the NULL
  const updateExecutiveToTeam = await sequelize
    .query(
      `UPDATE team_lead SET sup_id = NULL WHERE team_L_uuid = '${req.body.id}';`,
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

  // adding the role information into the roleChanged table
  const roleChanged = await Database.ChangeTeamLeadRoleLogs.create({
    previousRole: teamleadInfo.dataValues.user_role_id,
    newRole: 0,
    team_L_id: teamleadInfo.dataValues.Team_Lead.dataValues.team_L_id,
    sup_id: req.query.sup_id,
  }).catch((err) => {
    if (err) {
      console.log("Error Creating the User Role Change Info");
      console.trace(err);
      return null;
    }
  });

  //sending the response to the user
  if ((!teamleadInfo || !updateExecutiveToTeam || !roleChanged)) {
    // ask mutti if 400 or 500??
    res.status(400).send({
      error: "error",
      message:"Error removing teamlead"
    });
    
  } else {
    res.status(200).send({
      status: "Done",
    });
    
  }
  res.end()
});

// API for notification page
router.route("/readAllSupervisorNotifications").post(async (req, res) => {
  const Notifications = await Database.SuperVisorNotification.update(
    {
      isRead: true,
    },
    {
      where: {
        sup_id: req.query.sup_id,
        isRead: false,
      },
    }
  ).then((response) => {
    if (response) return response;
  });

  if (Notifications) {
  res.status(200).send({ status: "Updated" });
  }else{
    res.status(404).send({error :"error"})
  }
});

// APIs for progress of executive page

// API for getting city analytics
router
.route("/getCityAnalytics/:cityUUID")
.get(async (req, res) => {
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
          sup_id: req.query.sup_id,
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
      //   Sequelize.fn("COUNT", Sequelize.col("cancelled")),
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
  } else {
    res.status(404).send({
      status: "Not Found",
      message: "No Record Found",
      teamLeadID,
      teamMember,
      activitiesPerMonth,
      cancelledactivitiesPerMonth,
      agencyCount,
    });
    res.end();
  
  }
  ////console.(req.body);
});

// API for teamlead analytics

router
.route("/getTeamLeadAnalytics/:teamLeadUUID")
.get( async (req, res) => {
  //getting the teams from the req.param teamLeadUUID

  let teamLeadID = await Database.Team_Lead.findAll({
    attributes: ["team_L_id", "team_L_uuid", "team_L_name"],
    where: {
      team_L_uuid: req.params.teamLeadUUID,
      team_L_isDeleted: 0,
      team_L_isPaused: 0,
    },
  });

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

  if (teamMember.length > 0) {
    let activitiesPerMonth = await Database.Activities.findAll({
      attributes: [
        [sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
        [sequelize.fn("YEAR", sequelize.col("createdAt")), "Year"],
        [sequelize.fn("COUNT", sequelize.col("*")), "activitiesPerMonth"],
        // [
        //   Sequelize.fn("COUNT", Sequelize.col("cancelled")),
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
      });
   
      res.end();
    } else {
      res.status(404).send({
        status:"Not Found",
        message: "No Activities Found",
        activitiesPerMonth,
        cancelledactivitiesPerMonth,
        agencyCount,
      });
      res.end();
   
    }
  } else {
  
    res.status(404).send({ error: "No Record Found" });
    res.end();
  }

  ////console.(req.body);
});

//APIs for all agency page
// API for getting agencies w.r.t city
router
.route("/getAgenciesFromCityArea")
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
            sup_id: req.query.sup_id,
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
        fieldExecutive = null;
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
    if (agencies.length<=0) {
      res.status(404).send({ error: "Not Found",message:"No Record Found!!" });
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


// API for pausing Agency
router
.route("/pauseAgency")
.post(async (req, res) => {
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
          sup_id: req.query.sup_id,
          man_id: 0,
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


//API for deleting Agency
router
.route("/deleteAgency")
.post(async (req, res) => {
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
          sup_id: req.query.sup_id,
          man_id: 0,
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



// APIs for all recommendation page

// API for decline recommendation
router
.route("/supervisor/declineRecommendation")
.put(async (req, res) => {
  //getting the recommendation ID from the database
  let recommendationID = await Database.Advertisement_Recommendation.findOne({
    where: {
      advert_recom_uuid: req.body.uuid,
      deleted: false,
      paused: false,
      status: true,
      team_lead_forward_status: true,
    },
  })
    .then((result) => {
      if (result) {
        result.update({
          sup_id: req.query.sup_id,
          sup_dateTime: new Date().toUTCString(),
          sup_decline_status: true,
          sup_decline_descr: req.body.reason,
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

//API For approve recommendation
router
.route("/supervisor/approveRecommendation")
.put(async (req, res) => {
  //getting the recommendation ID from the database
  let recommendationID = await Database.Advertisement_Recommendation.findOne({
    where: {
      advert_recom_uuid: req.body.uuid,
      deleted: false,
      paused: false,
      status: true,
      team_lead_forward_status: true,
    },
  })
    .then((result) => {
      if (result) {
        result.update({
          sup_id: req.query.sup_id,
          sup_dateTime: new Date().toUTCString(),
          sup_forward_status: true,
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

/*
End of the router

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
const countofNotificationOfSuperVisor = async (sup_id) => {
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



