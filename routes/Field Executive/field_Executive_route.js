const {
  Activity_Instruction,
  Compaigns,
  List_sub_Activities,
  List_of_Packages,
  Agency_Info,
  Field_Executive,
  Team_Lead,
  City_Areas,
  User_Login_Information,
  Activities,
  ExecutiveNotifications
} = require("../../Configuration Files/Sequelize/Database_Synchronization");
const NotificationText = require("../../Configuration Files/Sequelize/Sequelize Models/Notifications/NotificationText");
const { sequelize } = require("../../Configuration Files/Sequelize/Sequelize Models/Lists of Packages/Activities"),
  AgencyTypes = require("../../Configuration Files/Sequelize/Sequelize Models/Agency Models/AgencyTypes"),
  { Op, QueryTypes } = require("sequelize"),
  express = require("express"),
  router = express.Router(),

  { isUser_Login } = require("../Web_Pages/index"),
  /**
   * importing the pakistan City Name from the resourse folder
   */
  pakistanCityName = require('../../resources/pakistanCityName')



/**
 * Checking the user uuid is same with the 
 * same as the params are then display the page
 * otherwise redirect to the login page
 */
const isUserAuthentic = (req, res, next) => {
  if (req.params.fieldExeUUID === req.session.profileData.field_uuid)
    next()
  else
    res.redirect('/user/signout')
}
/**
* Here in the param it is the field uuiid
*/
router.get("/dashboard/:fieldExeUUID", isUser_Login, isUserAuthentic, async (req, res) => {
  // let Notification = await notificationOfExecutive(req.session.profileData.field_id)
  let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.field_id)

  res.status(200).render("Field Executive/dashboard", {
    info: {
      id: req.session.passport.user.userInfo.login_id,
      uuid: req.session.profileData.field_uuid,
    },
    // Notification,
    unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
    role: req.session.passport.user.userRole,
    permissions: req.session.permissions.permissionObject,
  });
  // Notification = null
  unreadNotificationCount = null
});

/**
 * Determining that the user have to complete the profile
 * if the user is new then he / she should complete the profile then move ahead
 */
/**
 * Here in the param it is the login id
 */

router.get("/completeProfile/:fieldExeUUID", isUser_Login, isUserAuthentic, (req, res) => {
  if (req.session.profileData.field_name === null)
    res.status(200).render(`Field Executive/completeProfile`, {
      message: req.flash("info", "Please Complete your Profile"),
    });
  else {
    res
      .status(200)
      .redirect(`/dashboard/${req.session.profileData.field_uuid}`);
  }
});

/**
 * this is the route for the page to start the activity
 * here the types of the agencies are getting from DB,
 * the compaigns which are going on are also coming from DB
 * also the instruction to start the activity also coming from DB
 */
router.get(
  "/startActivity/:fieldExeUUID",
  isUser_Login, isUserAuthentic,
  async (req, res) => {
    /**
     * getting all the instructions for the activty to start
     */
    let activity_Instruc = await Activity_Instruction.findAll({
      attributes: ["instructionText"],
      where: {
        isPaused: false,
        deleted: false,
      },
    })
      .then((instrucntions) => {
        return instrucntions;
      })
      .catch((error) => {
        return "No Instructions Found " + error;
      });
    /**
     * getting the agency types
     */
    let agencyTypes = await AgencyTypes.findAll({
      attributes: ["agencytype_id", "type_name"],
      isPaused: false,
      deleted: false,
    })
      .then((types) => {
        return types;
      })
      .catch((error) => {
        return "No Types Found";
      });

    /**
     * getting all the compaigns on the basis of the user role
     */

    /**
     * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
     */
    let CompaignsList = await Compaigns.findAll({
      attributes: ["comp_id", "comp_name"],
      where: {
        /**
         * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
         */
        [Op.or]: [
          {
            forFreelancers:
              req.session.passport.user.userRole !== "Field Executive"
                ? true
                : false,
          },
          { forAll: true },
        ],
      },
    })
      .then((compaigns) => {
        if (compaigns) {
          return compaigns;
        }
      })
      .catch((error) => {
        if (error) console.log("Error getting Compaigns" + error);
        return null;
      });
    // let Notification = await notificationOfExecutive(req.session.profileData.field_id)
    let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.field_id)





    res.status(200).render("Field Executive/activity", {
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.field_uuid,
      },
      // Notification,
      unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
      agencyTypes,
      CompaignsList,
      pakistanCityName,
      instrucntions: activity_Instruc,
      role: req.session.passport.user.userRole,
      permissions: req.session.permissions.permissionObject,
    });

    // Notification = null
    unreadNotificationCount = null
  }
);

/**
 * this route is about the activities that are being performed by the
 * field executive when the user have start the activity
 * this route will be used for both,
 * both mean the user enter the new agency
 * or when the user select the agency
 */

router.get(
  "/activities/:agencyID/:activityUUID",
  isUser_Login,
  async (req, res) => {
    if (
      req.params.agencyID != req.session.activityDetails.agencyID ||
      req.params.activityUUID != req.session.activityDetails.activity
    ) {
      res.status(200).render("Web Appendage Pages/error", {
        errorStatus: "Invalid Credentials",
        errorHeading: `The Agency or Activity is not same.`,
      });
    } else {
      const subActivities = await List_sub_Activities.findAll({
        attributes: ["list_id"],
        include: {
          attributes: [
            "list_act_id",
            "list_act_uuid",
            "field_id",
            "comp_id",
            "agency_id",
          ],

          model: Activities,
          // don't use required: false to only return results where List_sub_Activities.Activities is not null
          // required: false,
          where: {
            agency_id: req.session.activityDetails.agencyID,
          },
        },
        raw: true,
      })
        .then((activities) => activities.map((activity) => activity.list_id))
        .then((activityIds) =>
          List_of_Packages.findAll({
            attributes: ["list_uuid", "list_name", "list_description", 'isBank', 'bankAmount'],
            where: {
              list_id: {
                [Op.notIn]: activityIds,
              },
              list_name: {
                [Op.notLike]: "%New Agency%",
              },
            },
          })
        )
        .then((packages) => {
          if (packages) {
            return packages;
          }
        });

      // let Notification = await notificationOfExecutive(req.session.profileData.field_id)
      let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.field_id)

      res.render("Field Executive/subActivitiesOnAgency", {
        subActivities,
        info: {
          id: req.session.passport.user.userInfo.login_id,
          uuid: req.session.profileData.field_uuid,
        },
        // Notification,
        unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
        permissions: req.session.permissions.permissionObject,
      });
      // Notification = null
      unreadNotificationCount = null
    }
  }
);





router.get("/viewAgencies/:fieldExeUUID", isUser_Login, isUserAuthentic, async (req, res) => {

  const AgencyData = await Agency_Info.findAll({
    attributes: ['agency_name', 'agency_address']
  })
  let CompaignsList = await Compaigns.findAll({
    attributes: ["comp_id", "comp_name"],
    where: {
      /**
       * Here we are looking if the user role is NOT field 
       * executive and he is an employee of the company than bring the Compaign name and
       */
      [Op.or]: [
        {
          forFreelancers: req.session.passport.user.userRole !== "Field Executive"
            ? true
            : false,
        },
        { forAll: true },
      ],
    },
  })
    .then((compaigns) => {
      if (compaigns) {
        return compaigns;
      }
    })
    .catch((error) => {
      if (error) console.log("Error getting Compaigns" + error);
      return null;
    });
  // let Notification = await notificationOfExecutive(req.session.profileData.field_id)
  let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.field_id)


  res.render("Field Executive/viewAllAgencies", {
    AgencyData,
    pakistanCityName,
    CompaignsList,
    // Notification,
    unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
    info: {

      id: req.session.passport.user.userInfo.login_id,
      uuid: req.session.profileData.field_uuid,
    },
    permissions: req.session.permissions.permissionObject,
  });
  // Notification = null
  unreadNotificationCount = null
});




router.get('/Profile/:fieldExeUUID',
  isUser_Login,
  isUserAuthentic,
  async (req, res) => {


    const field = await Field_Executive.findOne({
      attributes: {
        exclude: ['field_isDeleted', 'field_isPaused', 'login_id', 'createdAt', 'updateTimestamp', 'team_L_id']
      },
      include: {
        model: Team_Lead,
        attributes: ['team_L_name'],
        required: false,
        include: {
          model: City_Areas,
          attributes: ['city_name'],
          required: false
        }

      },
      where: {
        field_uuid: req.session.profileData.field_uuid
      }
    })
    const LoginEmail = await User_Login_Information.findOne({
      attributes: ['login_email'],
      where: {
        login_id: req.session.passport.user.userInfo.login_id
      }
    })

    // let Notification = await notificationOfExecutive(req.session.profileData.field_id)
    let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.field_id)


    const countOfTargetsActivities = await Activities.findAll({
      attributes: [[sequelize.fn('COUNT', sequelize.col('list_act_id')), 'activityTarget'],
      ],

      where: {
        field_id: 4,
        [Op.and]: sequelize.literal(`monthname(createdAt) = ${5}`),
      }
    })

    const field_executive_info = { ...field.dataValues }
    var teamLead_Info = {},
      City_Area_Info = {}
    if (field.dataValues.Team_Lead) {
      teamLead_Info = { ...field.dataValues.Team_Lead.dataValues };
      City_Area_Info = { ...field.dataValues.Team_Lead.dataValues.City_Area.dataValues };
    }

    res.render("Field Executive/profile", {
      field_executive_info,
      teamLead_Info,
      City_Area_Info,
      LoginEmail,
      countOfTargetsActivities,
      // Notification,
      unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.field_uuid,
      },
      role: req.session.passport.user.userRole,
      permissions: req.session.permissions.permissionObject,
    })
    // Notification = null
    unreadNotificationCount = null
    teamLead_Info = null
  })



/**
 * setting things for the My Sales page 
 * where the user can see all the sales which are made
 * and also the total amount earned
 */
router.get('/mysales/:fieldExeUUID', isUser_Login, isUserAuthentic,
  async (req, res) => {

    const dbResponse = await Activities.findAll({
      attributes: ['list_act_id', 'list_act_uuid'],
      include: [
        {
          model: Agency_Info,
          attributes: ['agency_name'],
          required: false
        },
      ],
      where: {
        field_id: req.session.profileData.field_id
      }
    })
      .then(dbResponse => {
        if (dbResponse)
          return dbResponse
      })
      .catch(error => {
        if (error)
          console.log('Error Fetching Activities : ' + error);
      })



    const subActivities = await List_sub_Activities.findAll({
      attributes: ['list_act_id', [sequelize.fn('sum', sequelize.col('`List_of_Package`.list_amount')), 'SumofValues']],
      include: {
        attributes: [],
        model: List_of_Packages,
        required: true
      },
      group: ['`List_sub_Activities`.list_act_id'],
      where: {
        list_act_id: dbResponse.map(data => data.dataValues.list_act_id)
      }
    })
      .then(dbResponse => {
        if (dbResponse)
          return dbResponse
      })
      .catch(error => {
        if (error)
          console.log('Error Fetching Activities : ' + error);
      })

    let sum = 0;
    subActivities.map(Activity => {
      sum += parseInt(Activity.dataValues.SumofValues)

    })


    // let Notification = await notificationOfExecutive(req.session.profileData.field_id)
    let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.field_id)


    res.render("Field Executive/mySales", {
      dbResponse,
      subActivities,
      totalIncome: sum,
      unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
      // Notification,
      totalActivities: subActivities.length,
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.field_uuid,
      },
      permissions: req.session.permissions.permissionObject,
    })
    sum = null;
    unreadNotificationCount = null
    // Notification = null
  })

router.get('/earning/:fieldExeUUID', isUser_Login, isUserAuthentic, async (req, res) => {
  res.send("My Earning")
})
router.get('/progressAnalytics/:fieldExeUUID', isUser_Login, isUserAuthentic, async (req, res) => {
  res.send("My Analytics")
})

router.get('/withdraws/:fieldExeUUID', isUser_Login, isUserAuthentic, async (req, res) => {
  res.send("My Withdraws")
})



router.get('/completedActivity/:activityUUID'
  , isUser_Login
  ,
  async (req, res) => {

    const activitiesResponse = await Activities.findAll({
      attributes: ['list_act_id', 'list_act_uuid', 'createdAt'],
      include: [
        {
          model: Agency_Info,
          attributes: ['agency_name'],
          required: false
        },
        {
          model: List_sub_Activities,
          attributes: ['list_sub_act_id', 'list_id', 'createdAt', 'list_act_id'],
          required: true,
          include: {
            model: List_of_Packages,
            attributes: ['list_name', 'list_amount', 'isBank', 'bankAmount', 'commissionAmount'],
            required: true,
          }
        }
      ],
      where: {
        list_act_uuid: req.params.activityUUID
      }
    })
      .then(dbResponse => {
        if (dbResponse)
          return dbResponse
      })
      .catch(error => {
        if (error)
          console.log('Error Fetching Activities : ' + error);
      })
    const agencyInfo = activitiesResponse[0] !== null ? { ...activitiesResponse[0].Agency_Info.dataValues } : null
    const Activity_Info = Object.assign({}, {
      list_act_id: activitiesResponse[0].dataValues.list_act_id,
      list_act_uuid: activitiesResponse[0].dataValues.list_act_uuid,
      createdAt: activitiesResponse[0].dataValues.createdAt,
    });
    const subActivities = [...activitiesResponse[0].List_sub_Activities]


    const sumOf_Activities = await List_sub_Activities.findAll({
      attributes: [[sequelize.fn('sum', sequelize.col('`List_of_Package`.list_amount')), 'SumofValues'],
      [sequelize.literal('SUM(`List_of_Package`.bankAmount/100*`List_of_Package`.commissionAmount)'), 'Commission']],
      include: {
        attributes: [],
        model: List_of_Packages,
        required: true
      },
      group: ['`List_sub_Activities`.list_act_id'],
      where: {
        list_act_id: activitiesResponse.map(data => data.dataValues.list_act_id)
      }
    })
      .then(dbResponse => {
        if (dbResponse)
          return dbResponse
      })
      .catch(error => {
        if (error)
          console.log('Error Fetching Sum of Activities : ' + error);
      })

    // let Notification = await notificationOfExecutive(req.session.profileData.field_id)
    let unreadNotificationCount = await countofNotificationOfExecutive(req.session.profileData.field_id)

    res.render("Field Executive/activityComplete", {
      sumOf_Activities: sumOf_Activities[0].dataValues,
      agencyInfo,
      Activity_Info,
      // Notification,
      subActivities,
      unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
      info: {
        id: req.session.passport.user.userInfo.login_id,
        uuid: req.session.profileData.field_uuid,
      },
      permissions: req.session.permissions.permissionObject,
    })
    // Notification = null
    unreadNotificationCount = null
  })



// router.get('/notification', isUser_Login, async (req, res) => {
//   res.send("My Notifications")
// })

router.get('/notification', isUser_Login, async (req, res) => {

  const unreadNotificationCount = await countofNotificationOfExecutive(4)
  const unreadNotification = await ExecutiveNotifications.findAll({
    attributes: ['execu_notification_uuid', 'notification_text', 'isRead', 'createdAt'],
    where: {
      isPaused: false,
      deleted: false,
      field_id: 4
    },
    include: {
      model: NotificationText,
      attributes: ['notification_title', 'notification_icon'],
      required: true
    },
    limit: 50
  }).then((notifications) => {
    if (notifications)
      return notifications
  })
  res.render("Field Executive/notification", {
    unreadNotificationCount: unreadNotificationCount[0].dataValues.unreadNotificationCount,
    unreadNotification,
    info: {
      id: req.session.passport.user.userInfo.login_id,
      uuid: req.session.profileData.field_uuid,
    },
    permissions: req.session.permissions.permissionObject,
  })
})


router.get('/bank', async (req, res) => {
  res.render("Field Executive/bankDesposit")
})

router.get("/signout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
})



module.exports = { router }

const notificationOfExecutive = async (field_id) => {
  return await ExecutiveNotifications.findAll({
    attributes: ['execu_notification_uuid', 'notification_text'],
    where: {
      isPaused: false,
      deleted: false,
      field_id
    },
    include: {
      model: NotificationText,
      attributes: ['notification_title', 'notification_icon'],
      required: true
    },
    limit: 50
  }).then((notifications) => {
    if (notifications)
      return notifications
  })
}

const countofNotificationOfExecutive = async (field_id) => {
  return await ExecutiveNotifications.findAll({
    attributes: [[sequelize.fn('COUNT', sequelize.col('execu_notification_id')), 'unreadNotificationCount']],
    where: {
      isRead: false,
      field_id
    }
  }).then((notifications) => {
    if (notifications)
      return notifications
  })
}



// async function a() {

//   await Activities.findAll({
//     attributes: [[sequelize.fn('COUNT', sequelize.col('list_act_id')), 'tottt'],
//     ],

//     where: {
//       field_id: 4,
//       [Op.and]: sequelize.literal(`monthname(createdAt) = ${new Date(Date.now()).getMonth()}`),
//     }
//   })
//     .then(r => {
//       console.log(r);
//     })


// }

// a()


// console.log(new Date(Date.now()).toLocaleString('default', { month: 'long' }));


const funcc = async () => {
  const activitiesResponse = await Activities.findAll({
    attributes: ['list_act_id', 'list_act_uuid'],
    include: [
      // {
      //   model: Agency_Info,
      //   attributes: ['agency_name'],
      //   required: false
      // },
      {
        model: List_sub_Activities,
        attributes: ['list_sub_act_id', 'list_id', 'list_act_id',
          [sequelize.fn('sum', sequelize.col('`List_sub_Activities->List_of_Package`.bankAmount')), 'SumofValues']],
        required: true,
        include: {
          model: List_of_Packages,
          attributes: ['list_name', 'isBank', 'bankAmount', 'commissionAmount'],
          required: true,
          where: {
            isBank: true
          }
        }
      }
    ],
    group: ['`List_sub_Activities`.list_sub_act_id'],
    where: {
      // list_act_uuid: '8e68581b-9c66-4dc0-83a0-167132e022bc'
      field_id: 4
    }
  })
    .then(dbResponse => {
      if (dbResponse)

        dbResponse.map(data => console.log(data.dataValues))
      //return dbResponse
    })
    .catch(error => {
      if (error)
        console.log('Error Fetching Activities : ' + error);
    })

  // SELECT`Activities`.`list_act_id`, `Activities`.`list_act_uuid`, `Activities`.`createdAt`, 
  // `List_sub_Activities`.`list_sub_act_id` AS`List_sub_Activities.list_sub_act_id`, 
  // `List_sub_Activities`.`list_id` AS`List_sub_Activities.list_id`, 
  // `List_sub_Activities`.`createdAt` AS`List_sub_Activities.createdAt`, 
  // `List_sub_Activities`.`list_act_id` AS`List_sub_Activities.list_act_id`, 
  // sum(`List_sub_Activities->List_of_Package`.`list_amount`) AS`List_sub_Activities.SumofValues`,
  //  `List_sub_Activities->List_of_Package`.`list_id` AS`List_sub_Activities.List_of_Package.list_id`,
  //   `List_sub_Activities->List_of_Package`.`list_name` AS`List_sub_Activities.List_of_Package.list_name`,
  //    `List_sub_Activities->List_of_Package`.`list_amount` AS`List_sub_Activities.List_of_Package.list_amount`, 
  //    `List_sub_Activities->List_of_Package`.`isBank` AS`List_sub_Activities.List_of_Package.isBank`, 
  //    `List_sub_Activities->List_of_Package`.`bankAmount` AS`List_sub_Activities.List_of_Package.bankAmount`, 
  //    `List_sub_Activities->List_of_Package`.`commissionAmount` AS`List_sub_Activities.List_of_Package.commissionAmount` 
  //    FROM`Activities` AS`Activities` INNER JOIN`list_sub_activities` AS`List_sub_Activities` 
  //    ON`Activities`.`list_act_id` = `List_sub_Activities`.`list_act_id` INNER JOIN`lists` 
  //    AS`List_sub_Activities->List_of_Package` 
  //    ON`List_sub_Activities`.`list_id` = `List_sub_Activities->List_of_Package`.`list_id`
  //     AND`List_sub_Activities->List_of_Package`.`isBank` = true 
  // WHERE`Activities`.`field_id` = 4 GROUP BY`List_sub_Activities`.`list_act_id`;










  // console.log(activitiesResponse);
  // const agencyInfo = activitiesResponse[0] !== null ? { ...activitiesResponse[0].Agency_Info.dataValues } : null
  // const Activity_Info = Object.assign({}, {
  //   list_act_id: activitiesResponse[0].dataValues.list_act_id,
  //   list_act_uuid: activitiesResponse[0].dataValues.list_act_uuid,
  //   createdAt: activitiesResponse[0].dataValues.createdAt,
  // });
  // const subActivities = [...activitiesResponse[0].List_sub_Activities]


  // const sumOf_Activities = await List_sub_Activities.findAll({
  //   attributes: [[sequelize.fn('sum', sequelize.col('`List_of_Package`.list_amount')), 'SumofValues'],
  //   [sequelize.literal('SUM(`List_of_Package`.bankAmount/100*`List_of_Package`.commissionAmount)'), 'Commission']],
  //   include: {
  //     attributes: [],
  //     model: List_of_Packages,
  //     required: true
  //   },
  //   group: ['`List_sub_Activities`.list_act_id'],
  //   where: {
  //     list_act_id: activitiesResponse.map(data => data.dataValues.list_act_id)
  //   }
  // })
  //   .then(dbResponse => {
  //     if (dbResponse)
  //       return dbResponse
  //   })
  //   .catch(error => {
  //     if (error)
  //       console.log('Error Fetching Sum of Activities : ' + error);
  //   })


  // console.log(parseInt(sumOf_Activities[0].dataValues.SumofValues) + Math.ceil(sumOf_Activities[0].dataValues.Commission));
}
// funcc()


// Activities.findAll({
//   attributes: ['list_act_id', 'list_act_uuid'],
//   include: [
//     {
//       model: Agency_Info,
//       attributes: ['agency_name'],
//       required: false
//     },
//     // {
//     //   model: List_sub_Activities,
//     //   attributes: [[sequelize.fn('sum', sequelize.col('`List_sub_Activities->List_of_Package`.list_amount')), 'SumofValues']],
//     //   required: true,
//     //   include: {
//     //     attributes: [],
//     //     model: List_of_Packages,
//     //     required: true
//     //   },
//     // }
//   ],
//   // group: ['`List_sub_Activities`.list_act_id'],
//   where: {
//     field_id: 4
//   }
// })
//   .then(dbResponse => {
//     return dbResponse
//   }
//     //dbResponse.map(data => data.getDataValue('list_act_id'))
//     // for (const iterator of dbResponse) {
//     //   //console.log(iterator);
//     //   console.log(iterator.dataValues);
//     // }
//   )
//   // .then(Act_IDs => {
//   //   console.log(Act_IDs);
//   // })
//   .catch(error => {
//     if (error)
//       console.log('Error Fetching Activities : ' + error);
//   })

























// SELECT SUM(l.list_amount) FROM`list_sub_activities`
// as s INNER JOIN lists as l on l.list_id = s.list_id GROUP BY s.list_act_id

// List_sub_Activities.findAll({
//   attributes: ['list_act_id', [sequelize.fn('sum', sequelize.col('`List_of_Package`.list_amount')), 'SumofValues']],
//   include: {
//     attributes: [],
//     model: List_of_Packages,
//     required: true
//   },
//   group: ['`List_sub_Activities`.list_act_id'],
//   where: {
//     list_act_id: 40
//   }
// })
//   .then(dbResponse => {
//     console.log(dbResponse.length);
//     for (const iterator of dbResponse) {
//       //console.log(iterator);
//       console.log(iterator.dataValues);
//     }

//   })
//   .catch(error => {
//     if (error)
//       console.log('Error Fetching Activities : ' + error);
//   })




  // SELECT sum(`List_of_Package`.`list_amount`) AS `SumofValues` 
  // FROM `list_sub_activities` AS `List_sub_Activities` 
  // INNER JOIN `lists` AS `List_of_Package` 
  // ON `List_sub_Activities`.`list_id` = `List_of_Package`.`list_id` 
  // GROUP BY `List_sub_Activities`.`list_act_id`
