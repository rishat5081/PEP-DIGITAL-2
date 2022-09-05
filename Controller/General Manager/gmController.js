const { Console } = require("console");

const router = require("express").Router(),
  fs = require("fs"),
  { Op,Sequelize } = require("sequelize"),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  {
    multerFile_Upload_Function,
  } = require("../../Configuration Files/Multer Js/multer"),
  { isGMAuthentic } = require("../../routes/General Manager/generalManager");


  router
  .route("/generalManager/upload/:gm_uuid")
  .put(isGMAuthentic, async (req, res) => { 
    const userProfileImage = await Database.GM_Company.findOne({
      attributes: ["gm_profile_pic"],
      where: {
        gm_uuid: req.session.profileData.gm_uuid,
        login_id: req.session.passport.user.userInfo.login_id,
      },
    });
    if (userProfileImage.dataValues.gm_profile_pic !== null) {
      fs.unlink(
        `./public/${userProfileImage.dataValues.gm_profile_pic}`,
        (err) => {
          if (err) console.error("There is no such file");
          else console.error("Successfully Deleted Pic");
        }
      );
    }

    multerFile_Upload_Function(req, res, (err) => {
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
              gm_uuid: req.session.profileData.gm_uuid,
              login_id: req.session.passport.user.userInfo.login_id,
            },
          }
        ).then((response) => {
          if (response) {
            req.session.profileData.gm_profile_pic = filePath[1] + filename;
            res.send({
              type: "success",
              messages: "Profile Image Uploaded",
              ProfilePic: filePath[1] + filename,
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
.route("/generalManager/updateProfileInfo/:gm_uuid")
.put(isGMAuthentic, async (req, res) => {
  const dbResponse = await Database.Role_ExtraInfo.findOne({
    attributes: ["salary"],
    include: {
      model: Database.User_Role,
      where: {
        type_name: req.session.passport.user.userRole.type_name,
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
    await Database.GM_Company.update(
      {
        gm_name: req.body.name,
        gm_contact: req.body.contact,
        gm_username: req.body.username,
        gm_salary: dbResponse.dataValues.salary,
      },
      {
        where: {
          login_id: req.session.passport.user.userInfo.login_id,
        },
      }
    )
      .then((response) => {
        if (response) {
          res.status(200).send({
            type: "success",
            messages: "Updated",
            uuid: req.session.profileData.gm_uuid,
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


/**
 * updaing the profile information
 *
 */
 router
 .route("/updateGMProfile/:gm_uuid")
 .put(isGMAuthentic, async (req, res) => {
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
           login_id: req.session.passport.user.userInfo.login_id,
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
           gm_uuid: req.session.profileData.gm_uuid,
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

 
/**
 * sending the message to the specific manager
 */
 router
 .route("/conveyMessageToSpecificManager/:gm_uuid")
 .post(isGMAuthentic, async (req, res) => {
   /**
    * getting the Managers from the database
    */
   let Manager = await Database.Managers.findAll({
     attributes: ["man_id"],
     where: {
       gm_id: req.session.profileData.gm_id,
       man_isDeleted: 0,
       man_isPaused: 0,
       man_uuid: JSON.parse(req.body.employeeList).map((employee) => employee),
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
       Console.error(req.body.messageText)
     })
   ).catch((error) => {
     console.error("Error in creating ManagerNotifications");
     console.trace(error);
     return null;
   });

   if ((Manager, notificationID, messageConveyed === null)) {
     res.status(500).send({ error: "Please try again" });
     Manager = notificationID = messageConveyed = null;
     res.end();
   } else {
     res.status(200).send({ status: "Successfully, Message has been send" });
     Manager = notificationID = messageConveyed = null;
     res.end();
   }
 });

/**
* Controller for sending message to all Managers
*/
router
 .route("/conveyMessageToAllManagers/:gm_uuid")
 .post(isGMAuthentic, async (req, res) => {
   //getting all the Managers
   let Manager = await Database.Managers.findAll({
     attributes: ["man_id"],
     where: {
       gm_id: req.session.profileData.gm_id,
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
   } else {
     res.status(200).send({ status: "Successfully, Message has been send" });
     Manager = messageConveyed = notificationID = null;
     res.end();
   }
 });

/**
 * assigning the gifts to the Managers
 */
 router
 .route("/assignGiftToManager/:gm_uuid")
 .put(isGMAuthentic, async (req, res) => {
   //getting the manager
   let managerInfo = await Database.Managers.findOne({
     where: {
       gm_id: req.session.profileData.gm_id,
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
       gm_id: req.session.profileData.gm_id,
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
       gm_id: req.session.profileData.gm_id,
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
       creatingGifts = managerInfo= getGiftData = null;
     }
   } else {
     res.status(500).send({
       status: "Sorry !!! Please Try Again",
     });
     res.end();
     creatingGifts = managerInfo = getGiftData = null;
   }
 });


 /**
 * getting the analytics from the data base for the specific city
 */
router
.route("/getCityAnalytics/:cityUUID/:gm_uuid")
.post(isGMAuthentic, async (req, res) => {
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
      [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
      [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
      [Sequelize.fn("COUNT", Sequelize.col("*")), "activitiesPerMonth"],
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
      [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
      [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
      [
        Sequelize.fn("COUNT", Sequelize.col("cancelled")),
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
      [Sequelize.literal(`MONTHNAME(createdAt)`), "moonth"],
      [Sequelize.fn("YEAR", Sequelize.col("createdAt")), "Year"],
      [Sequelize.fn("COUNT", Sequelize.col("*")), "agencyCount"],
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
    teamLeadID =
      teamMember =
      activitiesPerMonth =
      cancelledactivitiesPerMonth =
      agencyCount =
        null;
    res.end();
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
    teamLeadID =
      teamMember =
      activitiesPerMonth =
      cancelledactivitiesPerMonth =
      agencyCount =
        null;
  }

});


/**
 * allocating the area to Managers
 */
 router
 .route("/allocateAreaToManager/:gm_uuid")
 .post(isGMAuthentic, async (req, res) => {

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
  let selectedEmployee = JSON.parse(req.body.employees);
 console.log(selectedEmployee)
  let zoneAssigned = await Database.Managers.update({
          zone_id: zoneID.zone_id,
  },
  {
    where: {
      man_uuid: selectedEmployee,
      man_isDeleted: 0,
      man_isPaused: 0,
    },
  });
 
  if ((zoneID, zoneAssigned !== null)) {
    zoneID  = zoneAssigned  = null;
    res.status(200).send({ status: "Zone Assigned Successfully" });
    res.end();
  } else {
    zoneID = null;
    res.status(500).send({ error: "Please try again" });
    res.end();
  }
  ////console.(req.body);
});

/** Gm changing zone Status **/

router
.route("/changeZoneStatus/:gm_uuid")
.post(isGMAuthentic, async (req, res) => {

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

/** Edit Company Promotions **/

router
.route("/editPromotion/:gm_uuid")
.post(isGMAuthentic, async (req, res) => {

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
.route("/deletePromotion/:gm_uuid")
.post(isGMAuthentic, async (req, res) => {

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
 res.status(200).send({ status: "Promotion Status Assigned Successfully" });
 res.end();
} else {
 res.status(500).send({ error: "Please try again" });
 res.end();
}

});

/** Add Company Promotions **/

router
.route("/addPromotion/:gm_uuid")
.post(isGMAuthentic, async (req, res) => {
  let status= req.body.status;

  if(status==="Active"){
const promAdded = await Database.Company_Promotion.create({
    comp_prom_name:req.body.promTitle,
    comp_prom_desc: req.body.description,
    prom_status:1,
    prom_deleted:0,
    gm_id: req.session.profileData.gm_id,
  }).catch((error) => {
    if (error) {
      console.error(
        "Error Adding Manager"
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

}
}
});

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
      gm_id: req.session.profileData.gm_id,
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
        gm_id: req.session.profileData.gm_id,
        isRead: false,
      },
    }
  ).then((response) => {
    if (response) return response;
  });

  if (Notifications) res.status(200).send({ status: "Updated" });
});




module.exports = { router };
