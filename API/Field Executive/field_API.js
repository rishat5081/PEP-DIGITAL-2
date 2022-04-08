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

/**
 * Here in the param it is the field uuiid
 */

router.get(
  "/dashboard",
  // validateToken,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );

    const webAds = await Database.WebAds.findAll({
      attributes: ["title", "description", "picPath"],
      where: {
        paused: 0,
        deleted: 0,
        user_role_id: req.query.user_role_id
      }
    });
    let profileData = await Database.Field_Executive.findOne({
      attributes: [
        "field_name",
        "field_userProfilePic",
        "createdAt",
        "field_DOB"
      ],
      where: {
        field_uuid: req.query.field_uuid
      }
    });

    res.status(200).send([
      {
        url: req.protocol + "://" + req.get("host"),
        profileData,
        webAds,
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount
      }
    ]);
    unreadNotificationCount = null;
  }
);

//route profile
router.get(
  "/Profile",
  // validateToken,
  async (req, res) => {
    /**
     * getiing the user details for the profile
     */

    const field = await Database.Field_Executive.findOne({
      attributes: {
        exclude: [
          "field_isDeleted",
          "field_isPaused",
          "login_id",
          "createdAt",
          "updateTimestamp",
          "team_L_id"
        ]
      },
      /**
       * getting the inner join with team lead
       */
      include: {
        model: Database.Team_Lead,
        attributes: ["team_L_name"],
        required: false,
        where: {
          team_L_isDeleted: 0,
          team_L_isPaused: 0
        },
        /**
         * getting the inner join with team lead -> City_Areas
         */
        include: {
          model: Database.City_Areas,
          attributes: ["city_name"],
          required: false,
          where: {
            paused: 0,
            deleted: 0
          }
        }
      },
      where: {
        field_uuid: req.query.field_uuid,
        field_isPaused: 0,
        field_isDeleted: 0
      }
    });

    const LoginEmail = await Database.User_Login_Information.findOne({
      attributes: ["login_email"],
      where: {
        login_id: req.query.login_id,
        paused: 0,
        deleted: 0
      }
    });

    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );

    const countOfTargetsActivities = await Database.Activities.findAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("list_act_id")), "activityTarget"]
      ],
      where: {
        field_id: req.query.field_id,
        [Op.and]: sequelize.literal(
          `month(createdAt) = '${new Date(Date.now()).getMonth()}'`
        ),
        paused: 0,
        deleted: 0,
        cancelled: 0
      }
    });

    if ((countOfTargetsActivities, field)) {
      const field_executive_info = { ...field.dataValues };
      var teamLead_Info = {},
        City_Area_Info = {};

      if (field.dataValues.Team_Lead) {
        teamLead_Info = { ...field.dataValues.Team_Lead.dataValues };
        City_Area_Info = {
          ...field.dataValues.Team_Lead.dataValues.City_Area.dataValues
        };
      }

      res.status(200).send([
        {
          status: "Found",
          field_executive_info,
          teamLead_Info,
          City_Area_Info,
          LoginEmail,
          url: req.protocol + "://" + req.get("host"),
          countOfTargetsActivities,
          unreadNotificationCount:
            unreadNotificationCount[0].dataValues.unreadNotificationCount
        }
      ]);
    } else {
      res.status(200).send({
        status: "Invalid",
        message: "The system is unable to find the user. \nPlease try again"
      });
    }
    unreadNotificationCount = null;
    teamLead_Info = null;
  }
);

//controller for upload picture
router.route("/updateProfile").post(async (req, res) => {
  let emaiUpdate = await Database.User_Login_Information.update(
    {
      login_email: req.body.email
    },
    {
      where: {
        login_id: req.body.login_id
      }
    }
  )
    .then(response => {
      if (response) return response;
      else return null;
    })
    .catch(error => {
      if (error) return error;
      else return null;
    });

  if (emaiUpdate) {
    Database.Field_Executive.update(
      {
        field_name: req.body.name,
        field_DOB: req.body.dob,
        field_contact: req.body.contact,
        field_username: req.body.username
      },
      {
        where: {
          login_id: req.body.login_id
        }
      }
    )
      .then(response => {
        if (response) {
          res.send([
            {
              status: "success",
              messages: "Updated"
            }
          ]);
          res.end();
        }
      })
      .catch(error => {
        console.error(error);
        res.send({
          status: "failed",
          messages: "Please Try Again"
        });
        res.end();
      });
  } else {
    res.send({
      status: "failed",
      messages: "Please Try Again"
    });
    res.end();
  }
});

//controller for upload picture
router.route("/uploadImage").post(async (req, res) => {
  const fileUploadStatus = new Promise((resolve, reject) => {
    multerFile_Upload_ForAPI(req, res, err => {
      if (err) reject(err);
      else resolve(req.files);
    });
  });

  const fileDetails = await fileUploadStatus.catch(err => {
    if (err) {
      console.log(err);
      return null;
    }
  });

  if (fileDetails === null) {
    res.send("Wrong");
    res.end();
  } else {
    const userProfileImage = await Database.Field_Executive.findOne({
      attributes: ["field_userProfilePic"],
      where: {
        login_id: req.body.login_id
      }
    });
    if (userProfileImage.dataValues.field_userProfilePic !== null) {
      fs.unlink(
        `./public/${userProfileImage.dataValues.field_userProfilePic}`,
        err => {
          if (err) console.error("There is no such file");
          else console.error("Successfully Deleted Pic");
        }
      );
    }
    //updating the
    if ((fileDetails, userProfileImage)) {
      let filename = fileDetails[0].filename;
      let filePath = fileDetails[0].destination.split("./public");

      //req.session.profileData.field_userProfilePic = filePath[1] + filename;
      Database.Field_Executive.update(
        {
          field_userProfilePic: filePath[1] + filename
        },
        {
          where: {
            login_id: req.body.login_id
          }
        }
      ).then(response => {
        if (response) {
          res.send([
            {
              status: "success",
              messages: "Profile Image Uploaded",
              url: req.protocol + "://" + req.get("host"),
              ProfilePic: filePath[1] + filename
            }
          ]);
        } else {
          res.send({
            type: "danger",
            messages: "Error! in Uploading Image! "
          });
        }
      });
    }
  }
});

//controller for
// /updating the profile information on new login
router.route("/updateProfileInfo").post(async (req, res) => {
  const dbResponse = await Database.Role_ExtraInfo.findOne({
    attributes: ["target", "commission", "salary"],
    include: {
      model: Database.User_Role,
      where: {
        type_name: req.body.type_name
      }
    },
    where: {
      paused: 0,
      deleted: 0
    }
  })
    .then(response => {
      return response;
    })
    .catch(error => {
      console.log(error);
      console.error(
        "Error! Can not Fetch Commissions and Target from DB" + error
      );
      return null;
    });

  if (dbResponse) {
    Database.Field_Executive.update(
      {
        field_name: req.body.name,
        field_DOB: req.body.dob,
        field_contact: req.body.contact,
        field_username: req.body.username,
        field_target: dbResponse.dataValues.target,
        field_salary: dbResponse.dataValues.salary,
        field_commission: dbResponse.dataValues.commission
      },
      {
        where: {
          login_id: req.body.login_id
        }
      }
    )
      .then(response => {
        if (response) {
          res.send([
            {
              status: "success",
              messages: "Updated"
            }
          ]);
          res.end();
        }
      })
      .catch(error => {
        console.error(error);
        res.send({
          status: "failed",
          messages: "Please Try Again"
        });
        res.end();
      });
  } else {
    res.send({
      status: "failed",
      messages: "Please Try Again"
    });
    res.end();
  }
});

//view all sales
router.get(
  "/viewSales",
  //  validateToken,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );
    const dbResponse = await Database.Activities.findAll({
      attributes: ["list_act_id", "list_act_uuid"],
      include: [
        {
          model: Database.Agency_Info,
          attributes: ["agency_name"],
          required: false
        }
      ],
      where: {
        field_id: req.query.field_id
      }
    })
      .then(dbResponse => {
        if (dbResponse) return dbResponse;
      })
      .catch(error => {
        if (error) console.error("Error Fetching Activities : " + error);
      });

    const subActivities = await Database.List_sub_Activities.findAll({
      attributes: [
        "list_act_id",
        [
          sequelize.fn("sum", sequelize.col("`List_of_Package`.list_amount")),
          "SumofValues"
        ],
        [
          sequelize.literal(
            "SUM(`List_of_Package`.bankAmount/100*`List_of_Package`.commissionAmount)"
          ),
          "Commission"
        ]
      ],
      include: {
        attributes: [],
        model: Database.List_of_Packages,
        required: true,
        where: {
          list_deleted: 0,
          list_paused: 0
        }
      },
      group: ["`List_sub_Activities`.list_act_id"],
      where: {
        list_act_id: dbResponse.map(data => data.dataValues.list_act_id)
      }
    })
      .then(dbResponse => {
        if (dbResponse) return dbResponse;
      })
      .catch(error => {
        if (error) console.error("Error Fetching Activities : " + error);
      });

    res.status(200).send([
      {
        dbResponse,
        subActivities,
        url: req.protocol + "://" + req.get("host"),
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        totalActivities: subActivities.length
      }
    ]);
    unreadNotificationCount = null;
  }
);

//view the activity completition details
router.get(
  "/viewCompletedActivity",
  //  validateToken,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );
    //view the complete activity details
    const activitiesResponse = await Database.Activities.findAll({
      attributes: ["list_act_id", "list_act_uuid", "createdAt"],
      include: [
        {
          model: Database.Agency_Info,
          attributes: ["agency_name"],
          required: false,
          where: {
            deleted: 0,
            isPaused: 0
          }
        },
        {
          model: Database.List_sub_Activities,
          attributes: [
            "list_sub_act_id",
            "list_id",
            "createdAt",
            "list_act_id"
          ],
          required: true,
          include: {
            model: Database.List_of_Packages,
            attributes: [
              "list_name",
              "list_amount",
              "isBank",
              "bankAmount",
              "commissionAmount"
            ],
            required: true,
            where: {
              list_deleted: 0,
              list_paused: 0
            }
          },
          where: {
            list_deleted: 0,
            list_paused: 0
          }
        }
      ],
      where: {
        list_act_uuid: req.query.activityUUID,
        deleted: 0,
        paused: 0
      }
    })
      .then(dbResponse => {
        if (dbResponse) return dbResponse;
        else return null;
      })
      .catch(error => {
        if (error) {
          console.error("Error Fetching Activities : " + error);
          return null;
        }
      });

    /**
     * if the record is fetched the it will ge the activity detials and extract the actvitiy info
     * and make a new array of th esubactivities to get the sum of the packages from the list table
     */

    if (activitiesResponse) {
      const agencyInfo = activitiesResponse[0]; //!== null ? { ...activitiesResponse[0].Agency_Info.dataValues } : null
      const Activity_Info = Object.assign(
        {},
        {
          list_act_id: activitiesResponse[0].dataValues.list_act_id,
          list_act_uuid: activitiesResponse[0].dataValues.list_act_uuid,
          createdAt: activitiesResponse[0].dataValues.createdAt
        }
      );
      const subActivities = [...activitiesResponse[0].List_sub_Activities];

      const sumOf_Activities = await Database.List_sub_Activities.findAll({
        attributes: [
          [
            sequelize.fn("sum", sequelize.col("`List_of_Package`.list_amount")),
            "SumofValues"
          ],
          [
            sequelize.literal(
              "SUM(`List_of_Package`.bankAmount/100*`List_of_Package`.commissionAmount)"
            ),
            "Commission"
          ]
        ],
        include: {
          attributes: [],
          model: Database.List_of_Packages,
          where: {
            list_deleted: 0,
            list_paused: 0
          },
          required: true
        },
        group: ["`List_sub_Activities`.list_act_id"],
        where: {
          list_act_id: activitiesResponse.map(
            data => data.dataValues.list_act_id
          ),
          list_deleted: 0,
          list_paused: 0
        }
      })
        .then(dbResponse => {
          if (dbResponse) return dbResponse;
          else return null;
        })
        .catch(error => {
          if (error)
            console.error("Error Fetching Sum of Activities : " + error);
        });

      res.status(200).send([
        {
          sumOf_Activities: sumOf_Activities[0].dataValues,
          agencyInfo,
          Activity_Info,
          subActivities,
          url: req.protocol + "://" + req.get("host"),
          unreadNotificationCount:
            unreadNotificationCount[0].dataValues.unreadNotificationCount
        }
      ]);
      unreadNotificationCount = null;
    } else if (activitiesResponse === null) {
      res.redirect(`/user/dashboard/${req.session.profileData.field_uuid}`);
    }
  }
);

//get route for the bank deposit transaction details
router.get("/bankDeposit", async (req, res) => {
  /**
   * Getting the pep bank account details from the database
   */
  const companyDetails = await Database.PEP_Banks_Details.findAll({
    attributes: ["bankAccount", "bankIBAN", "bankBranchCode", "bankAddress"],
    include: {
      model: Database.Banks_List,
      required: true,
      attributes: ["bankName"]
    },
    where: {
      deleted: false,
      paused: false
    }
  });

  /**
   * Getting all the banks name from the DB
   */
  const bankList = await Database.Banks_List.findAll({
    attributes: ["bankName"],
    where: {
      paused: false,
      deleted: false
    }
  });

  /**
   * getting the activities id and also uuid
   */

  var activitiesResponse = await Database.Activities.findOne({
    attributes: ["list_act_id", "list_act_uuid"],
    where: {
      list_act_uuid: req.query.activityUUID
    }
  })
    .then(dbResponse => {
      if (dbResponse) return dbResponse;
      else return null;
    })
    .catch(error => {
      if (error) {
        console.error("Error Fetching Activities : " + error);
        return null;
      }
    });

  /**
   * if the activities are found then go with the Sum of the packages
   */
  if (activitiesResponse) {
    const sumOf_Activities = await Database.List_sub_Activities.findOne({
      attributes: [
        [
          sequelize.fn("sum", sequelize.col("`List_of_Package`.bankAmount")),
          "SumofValues"
        ]
      ],
      include: {
        attributes: [],
        model: Database.List_of_Packages,
        required: true,
        where: {
          list_deleted: 0,
          list_paused: 0
        }
      },
      group: ["`List_sub_Activities`.list_act_id"],
      where: {
        list_act_id: activitiesResponse.dataValues.list_act_id
      }
    })
      .then(dbResponse => {
        if (dbResponse) return dbResponse;
        else return null;
      })
      .catch(error => {
        if (error) {
          console.error("Error Fetching Sum of Activities : " + error);
          return null;
        }
      });
    /**
     * check if the sum is valid then render the page other wise redirect to dashboard
     */

    if (sumOf_Activities) {
      res.send([
        {
          bankList,
          companyDetails,
          sumOf_Activities,
          url: req.protocol + "://" + req.get("host"),
          activityDetails: activitiesResponse
        }
      ]);
    } else {
      res.status(200).send([
        {
          status: "error",
          message: "No Information Found with this Activity ID"
        }
      ]);
    }
  } else {
    res.status(200).send([
      {
        status: "error",
        message: "No Information Found with this Activity ID"
      }
    ]);
  }
});

//controller for adding the bank deposit
router.route("/addBankDepositSlipDetails").post(async (req, res) => {
  /**
   * Checking for the req.body is null or not
   */
  if (Object.keys(req.body).length > 0) {
    await Database.Executive_Pending_Earning.findOne({
      where: {
        list_act_id: +req.body.list_act_id,
        paused: 0,
        deleted: 0,
        withdrawed: 0,
        bank_sale: 1,
        field_id: +req.body.field_id
      }
    })
      .then(pendingEarning => {
        if (pendingEarning) {
          if (pendingEarning.dataValues.bank_deposited) {
            res.status(200).send({
              status: "Deposited",
              message: "This Activity is already Deposited"
            });
            res.end();
            return;
          } else {
            pendingEarning
              .update({
                bankName: req.body.bankName,
                depositedAmount: req.body.depositedAmount,
                totalAmount: req.body.totalAmount,
                bank_deposited: 1,
                bank_deposited_referenceNumber: req.body.transactionid,
                bank_datetime: req.body.tranaction_date
              })
              .then(updateStatus => {
                if (updateStatus) {
                  res.status(200).send({
                    status: "Added",
                    message: "Information added successfully"
                  });
                  return;
                } else {
                  res.status(200).send({
                    updateStatus,
                    error: "There is an Issue in Updating. Please Try Again."
                  });
                  return;
                }
              });
          }
        } else {
          res.status(200).send({
            status: "Error",
            message: "There is no details with this activity.",
            pendingEarning
          });
          return;
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).send({
          error: "There is an Issue in Submitting. Please Try Again."
        });
      });
  }
});

//get
//route for contact form about complain
router.get("/contactAboutActivity", async (req, res) => {
  const activity = await Database.Activities.findOne({
    attributes: ["list_act_id"],
    where: {
      deleted: 0,
      paused: 0,
      list_act_uuid: req.query.activityUUID,
      field_id: req.query.field_id
    }
  })
    .then()
    .catch(error => {
      if (error) {
        console.error("Error fetching Activity Details");
        console.trace(error);
        return null;
      }
    });

  if (activity === null) {
    res.send([{ status: "Error", message: "No Activity Found" }]);
    res.end();
    return;
  } else {
    res.send([
      {
        status: "success",
        message: "Activity Found",
        activityUUID: req.query.activityUUID,
        url: req.protocol + "://" + req.get("host")
      }
    ]);
    res.end();
  }
});

//post
// controller for the adding the complain about the activity
router.route("/addComplaint").post(async (req, res) => {
  const activity = await Database.Activities.findOne({
    attributes: ["list_act_id"],
    where: {
      deleted: 0,
      paused: 0,
      list_act_uuid: req.body.activityUUID,
      field_id: req.body.field_id
    }
  })
    .then()
    .catch(error => {
      if (error) {
        console.error("Error fetching Activity Details");
        return null;
      }
    });

  if (activity === null) {
    res
      .status(200)
      .send({ status: "Error", message: "No Activity Found with this ID" });
    res.end();
  } else {
    const complain = await Database.ComplainsOfActivities.create({
      subject: req.body.subject,
      message: req.body.complainMessage,
      list_act_id: activity.dataValues.list_act_id,
      field_id: req.body.field_id
    })
      .then()
      .catch(error => {
        if (error) {
          console.error("Error at creating Complain");
          console.trace(error);
          return null;
        }
      });

    if (complain === null) {
      res.status(500).send({
        status: "Not Created",
        message: "Service Unavailable .Please try again later."
      });
    } else
      res
        .status(200)
        .send({ status: "Created", message: "Complain Added Successfully" });
  }
});

//GET
//start of the activity
router.get(
  "/startActivity",
  //  validateToken,
  async (req, res) => {
    let unreadNotificationCount = await countofNotificationOfExecutive(
      req.query.field_id
    );
    /**
     * getting all the instructions for the activty to start
     */
    let activity_Instruc = await Database.Activity_Instruction.findAll({
      attributes: ["instructionText"],
      where: {
        isPaused: false,
        deleted: false
      }
    })
      .then(instrucntions => {
        return instrucntions;
      })
      .catch(error => {
        if (error) {
          console.error("No Instructions Found " + error);
          return null;
        }
      });
    /**
     * getting the agency types
     */
    let agencyTypes = await Database.AgencyTypes.findAll({
      attributes: ["agencytype_id", "type_name"],
      where: {
        isPaused: false,
        deleted: false
      }
    })
      .then(types => {
        return types;
      })
      .catch(error => {
        if (error) {
          console.error("No Types Found");
          return null;
        }
      });

    /**
     * getting all the compaigns on the basis of the user role
     */

    /**
     * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
     */
    let CompaignsList = await Database.Compaigns.findAll({
      attributes: ["comp_id", "comp_name"],
      where: {
        /**
         * Here we are looking if the user role is NOT field executive and he is an employee of the company than bring the Compaign name and
         */
        [Op.or]: [
          {
            forFreelancers:
              req.query.userRole === "Field Executive" ? false : true
          },
          { forAll: true }
        ]
      }
    })
      .then(compaigns => {
        if (compaigns) {
          return compaigns;
        }
      })
      .catch(error => {
        if (error) console.error("Error getting Compaigns" + error);
        return null;
      });

    res.status(200).send([
      {
        url: req.protocol + "://" + req.get("host"),
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        agencyTypes,
        CompaignsList,
        pakistanCityName,
        instrucntions: activity_Instruc
      }
    ]);

    // Notification = null
    unreadNotificationCount = null;
  }
);

//controller API to handle the start API
router.route("/initiateActvity").post(async (req, res, next) => {
  let userReqBody = { ...req.body };

  let latitude = (Math.round(+userReqBody.latitude * 100) / 100).toFixed(2);
  let longitude = (Math.round(+userReqBody.longitude * 100) / 100).toFixed(2);
  let lengthofUser_Req = Object.keys(userReqBody).length;

  //console.(userReqBody);
  Object.keys(userReqBody).forEach(key => {
    if (
      userReqBody[key] === "select" ||
      userReqBody[key] === "update" ||
      userReqBody[key] === "insert"
    ) {
      delete userReqBody[key];
    }
  });

  if (Object.keys(userReqBody).length !== lengthofUser_Req)
    res.send({ error: "Invalid text" });
  else {
    const dbResponse = await Database.Agency_Info.findOne({
      where: {
        deleted: false,
        isPaused: false,
        [Op.or]: {
          agency_name: {
            [Op.like]: `%${req.body.agencyName}%`
          },
          agency_Longitude: {
            [Op.like]: `${longitude}`
          },
          agency_Latitude: {
            [Op.like]: `${latitude}`
          }
          //   agency_city: req.body.agencyCityName,
        }
      }
    })
      .then(response => {
        if (response) {
          return response;
        }
      })
      .catch(error => {
        console.log(error);
        console.trace(error);
        res.send({
          error: "Sorry! The System ran into Error. \n Please try again."
        });
        res.end();
        return;
      });

    if (dbResponse) {
      res.status(200).send({
        response: "Agency is already registered",
        help:
          "Tip: \nYou are working great. \n This Agency is already registered.\n Try Harder",
        message: "Please visit registered agency page."
      });
      res.end();
      return;
    } else {
      next();
    }
  }
  userReqBody = null;
  latitude = null;
  longitude = null;
});

router.route("/initiateActvity").post(async (req, res) => {
  /**
   * Creating an agency
   */
  const dbResponse = await Database.Agency_Info.create({
    agency_name: req.body.agencyName,
    agency_type: req.body.agencyType,
    agency_Contact: req.body.agencyContact,
    agency_address: req.body.agencyAddress,
    agency_Longitude: req.body.longitude,
    agency_Latitude: req.body.latitude,
    agency_owner_Name: req.body.agencyOwner,
    contactedPerson: req.body.contactedPerson,
    contactedPerson_Number: req.body.contactedPerson_Number,
    field_id: req.body.field_id,
    agency_city: req.body.agencyCityName
  })
    .then(response => {
      if (response) return response;
    })
    .catch(error => {
      if (error) {
        console.log(error);
        console.trace(error);
        res.send({
          error: "Sorry! Error in Adding new Agency! \n Please Try Again"
        });
        res.end();
        return;
      }
    });

  if (dbResponse) {
    /**
     * Creating an Activity of the agency
     */
    const compapignActivity = await Database.Activities.create({
      comp_id: req.body.CompaignID,
      field_id: req.body.field_id,

      agency_id: dbResponse.dataValues.agency_id
    })
      .then(response => {
        if (response) return response;
      })
      .catch(error => {
        if (error) {
          console.error(
            "Error! Creating a new Compaign Activity at Start Activity Controller" +
              error
          );
          return null;
        }
      });

    if (compapignActivity) {
      /**
       * Getting the list of the new agency, like the field_executive added the agency
       * getting the lists amount from db
       */
      const newAgencyDetails = await Database.List_of_Packages.findOne({
        attributes: {
          exclude: [
            "list_deleted",
            "list_paused",
            "createdAt",
            "updateTimestamp"
          ]
        },
        where: {
          list_name: {
            [Op.like]: [`%New Agency%`]
          },
          list_deleted: false,
          list_paused: false
        }
      });

      if (newAgencyDetails) {
        /**
         * if the list agency list details are fetched than go ahead
         * and add the sub activity and start the activities
         */
        const sub_Activities = Database.List_sub_Activities.create({
          list_id: newAgencyDetails.dataValues.list_id,
          list_act_id: compapignActivity.dataValues.list_act_id
        })
          .then(response => {
            if (response) return response;
          })
          .catch(error => {
            if (error) {
              console.error("There is error to start Sub Activity \n" + error);
              return null;
            }
          });

        /**
         * sending the user to move to the acitivity page
         */
        if (sub_Activities) {
          //   req.session.activityDetails = {
          //     activity: compapignActivity.list_act_uuid,
          //     agencyID: dbResponse.dataValues.agency_id,
          //   };
          res.send({
            success: "Activity Started Successfully ",
            activity: compapignActivity.list_act_uuid,
            agencyID: dbResponse.dataValues.agency_id
          });
        }
      } else {
        res.send({
          error: "There is error to start Sub Activity "
        });
      }
    }
  }
});

//route for the activities displayed on the screen
router.get("/activities", async (req, res) => {
  let unreadNotificationCount = await countofNotificationOfExecutive(
    req.query.field_id
  );
  let subActivities = await Database.List_sub_Activities.findAll({
    attributes: ["list_id"],
    where: {
      list_deleted: 0,
      list_paused: 0
    },
    include: {
      attributes: [
        "list_act_id",
        "list_act_uuid",
        "field_id",
        "comp_id",
        "agency_id"
      ],

      model: Database.Activities,
      // don't use required: false to only return results where List_sub_Activities.Activities is not null
      // required: false,
      where: {
        agency_id: +req.query.agencyID,
        paused: 0,
        deleted: 0
      }
    },
    raw: true
  })
    .then(activities => activities.map(activity => activity.list_id))
    .then(activitiesList => {
      if (activitiesList) return activitiesList;
      else return null;
    })
    .catch(err => {
      if (err) {
        console.log("Error in Fetching Packages");
        console.trace(err);
        return null;
      }
    });

  if (subActivities === null) {
    res.send({
      status: "No Agency Found",
      url: req.protocol + "://" + req.get("host"),
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount
    });
    res.end();
    return;
  } else if (subActivities.length > 0) {
    let packagesList = await Database.List_of_Packages.findAll({
      attributes: [
        "list_uuid",
        "list_name",
        "list_description",
        "isBank",
        "bankAmount"
      ],
      where: {
        list_id: {
          [Op.notIn]: subActivities
        },
        list_name: {
          [Op.notLike]: "%New Agency%"
        },
        list_deleted: 0,
        list_paused: 0
      }
    });

    res.send({
      status: "Agency Found",
      packagesList,
      url: req.protocol + "://" + req.get("host"),
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount
    });
    res.end();
    return;
  } else {
    res.send({
      status: "No Agency Found",
      url: req.protocol + "://" + req.get("host"),
      unreadNotificationCount:
        unreadNotificationCount[0].dataValues.unreadNotificationCount
    });
    res.end();
    return;
  }
});

/**
 * Completing the activities
 * again all the packages which the packages are not describes to the agency
 * to validate the and to prevent any kind of error or some one try to pass through it
 */
router.route("/completeListActivites").post(async (req, res, next) => {
  /**
   * Updating the agency first visit
   */
  const AgencyUpdate = await Database.Agency_Info.update(
    {
      firstVisit: true
    },
    {
      where: {
        agency_id: +req.body.agencyID,
        field_id: +req.body.field_id
      }
    }
  )
    .then()
    .catch(error => {
      console.error("Error with updating Agency First Visit Status" + error);
    });

  if (AgencyUpdate) console.log("Agency Status Updated :: " + AgencyUpdate);
  /**
   * Again validating which packages are still the user have to describe to the agency
   */
  const subActivities = await Database.List_sub_Activities.findAll({
    attributes: ["list_id"],
    include: {
      attributes: [
        "list_act_id",
        "list_act_uuid",
        "field_id",
        "comp_id",
        "agency_id"
      ],

      model: Database.Activities,
      // don't use required: false to only return results where List_sub_Activities.Activities is not null
      // required: false,
      where: {
        agency_id: +req.body.agencyID,
        field_id: +req.body.field_id
      }
    },
    raw: true
  })
    .then(activities => activities.map(activity => activity.list_id))
    .then(activityIds =>
      Database.List_of_Packages.findAll({
        attributes: ["list_uuid"],
        where: {
          list_id: {
            [Op.notIn]: activityIds
          },
          list_name: {
            [Op.notLike]: "%New Agency%"
          }
        }
      })
    )
    .then(packages => {
      if (packages) return packages;
    });

  //here id has ActivityName which is  list_uuid
  const userSelectedActivities = JSON.parse(req.body.listUUID).map(
    id => id.list_uuid
  );

  var count = 0;
  subActivities.forEach(package => {
    userSelectedActivities.forEach(selectedPackages => {
      if (package.dataValues.list_uuid === selectedPackages) {
        count++;
        return;
      }
    });
  });

  if (count === userSelectedActivities.length) next();
  else {
    res
      .status(200)
      .send({ status: "Error", message: "Invalid Package Selected" });
    res.end();
  }
});

//post
// complete activity controller
router.route("/completeListActivites").post(async (req, res) => {
  const userSelectedActivities = JSON.parse(req.body.listUUID).map(
    id => id.list_uuid
  );

  /**
   * Now getting the Main activity id from the database to make the relationship with the
   * subactivities and to ensure that the user have start an activities and against
   * the same the user make sub activities
   */
  const ActivityID = await Database.Activities.findOne({
    attributes: ["list_act_id", "list_act_uuid"],
    where: {
      list_act_uuid: req.body.activityUUID
    }
  })
    .then(activityID => {
      if (activityID) return activityID;
      else return null;
    })
    .catch(error => {
      if (error) {
        console.error(`\x1b[41m--------------------------------------\x1b[0m`);
        console.trace(error);
        return null;
      }
    });
  /**
   * Getting the list of packages id against which are selected by the user
   * and then adding in to the sub activities table
   * selecting here is just to prevent any kind of misleading info
   */

  const listOfPackage = await Database.List_of_Packages.findAll({
    attributes: ["list_id", "isBank"],
    where: {
      list_uuid: userSelectedActivities
    }
  })
    .then(listofPackages => {
      if (listofPackages) return listofPackages;
      else return null;
    })
    .catch(error => {
      if (error) {
        console.error(`\x1b[41m--------------------------------------\x1b[0m`);
        console.trace(error);
        return null;
      }
    });

  if (listOfPackage.length > 0) {
    listOfPackage.forEach(list => {
      Database.List_sub_Activities.create({
        list_act_id: ActivityID.dataValues.list_act_id,
        list_id: list.list_id
      })
        .then(response => {
          if (response) return response;
          else return null;
        })
        .catch(error => {
          if (error) {
            console.error(
              `\x1b[41m--------------------------------------\x1b[0m`
            );
            console.trace(error);
            return null;
          }
        });
    });

    const pendingDays = await Database.Pendance_Clearance_Details.findOne({
      attributes: ["pending_days"],
      where: {
        paused: false,
        deleted: false
      }
    }).catch(error => {
      if (error) {
        console.error(`\x1b[41m--------------------------------------\x1b[0m`);
        console.trace(error);
        return null;
      }
    });

    /**
     * looking for the package that
     * it contains the bank sale or not...
     */
    let isBankSale = false;
    isBankSale = listOfPackage.find(bank => bank.dataValues.isBank === true);

    /**
     * Adding the details of the activity to the pending clearance table
     */
    await Database.Executive_Pending_Earning.create({
      clearanceDateTime: new Date(
        Date.now() + 1000 * 60 * 60 * 24 * pendingDays.dataValues.pending_days
      ),
      field_id: req.body.field_id,
      list_act_id: ActivityID.dataValues.list_act_id,
      bank_sale: isBankSale === undefined ? false : true
    }).catch(error => {
      if (error) {
        console.error(`\x1b[41m--------------------------------------\x1b[0m`);
        console.trace(error);
        return null;
      }
    });

    res.status(200).send({
      status: "Success",
      message: "Activity Complete Successfully",
      list_act_uuid: ActivityID.dataValues.list_act_uuid
    });
    res.end();

    isBankSale = null;
  }
});

//post
// cancel activity controller
router.route("/cancelActivity").post(async (req, res) => {
  const activityStatus = await Database.Activities.findOne({
    where: {
      cancelled: 0,
      list_act_uuid: req.body.list_act_uuid,
      field_id: +req.body.field_id
    }
  })
    .then(result => {
      if (result) {
        result
          .update({
            cancelled: 1
          })
          .then(response => (response ? response : null));
      } else {
        return null;
      }
    })
    .catch(err => {
      if (err) {
        console.error(`\x1b[41m--------------------------------------\x1b[0m`);
        console.trace(err);
        return null;
      }
    });
  if (activityStatus === null) {
    res.status(200).send({
      status: "error",
      message: "Invalid Activity ID or Activity is already Cancelled"
    });
  } else {
    res.status(200).send({
      status: "success",
      message: "Activity is Cancelled"
    });
  }
});

//get
//view all deposit slips

router.route("/companyDeposits").get(async (req, res) => {
  const bankDeposits = await Database.Executive_Pending_Earning.findAll({
    attributes: [
      "bankName",
      "depositedAmount",
      "totalAmount",
      "bank_deposited_referenceNumber",
      "bank_datetime",
      "updateTimestamp"
    ],
    include: {
      model: Database.Activities,
      required: true,
      attributes: ["list_act_uuid", "createdAt"],
      include: {
        model: Database.Agency_Info,
        required: true,
        attributes: ["agency_name"]
      }
    },
    where: {
      field_id: req.query.field_id,
      paused: 0,
      deleted: 0,
      bank_sale: 1,
      bankName: { [Op.ne]: null },
      depositedAmount: { [Op.ne]: null }
    }
  })
    .then(result => {
      if (result) return result;
      else return null;
    })
    .catch(err => {
      if (err) {
        console.log("Error Getting the Executive Deposit Slips");
        console.trace(err);
        return numm;
      }
    });

  let unreadNotificationCount = await countofNotificationOfExecutive(
    req.query.field_id
  );
  if (bankDeposits.length > 0) {
    // res.send(bankDeposits)
    res.status(200).send([
      {
        url: req.protocol + "://" + req.get("host"),
        unreadNotificationCount:
          unreadNotificationCount[0].dataValues.unreadNotificationCount,
        bankDeposits
      }
    ]);
    res.end();
  } else
    res.status(200).send([{ status: "Error", message: "Invalid Request" }]);
  res.end();
});

//GET Route to view all the agencies
router.get(
  "/viewAgencies",
  // validateToken,
  async (req, res) => {
    try {
      const { userRole, field_id } = req.query;

      if (!(userRole, field_id)) {
        res
          .status(400)
          .send({ message: "Field Executive and User Role is Required" });
        res.end();
        return;
      } else {
        const AgencyData = await Database.Agency_Info.findAll({
          attributes: ["agency_name", "agency_address"],
          where: {
            deleted: 0,
            isPaused: 0
          }
        })
          .then(result => {
            if (result) return result;
          })
          .catch(error => {
            if (error) console.error("Error getting Agencies" + error);
            return null;
          });

        /**
         *
         * getting the compaigns from the DB
         */
        let CompaignsList = await Database.Compaigns.findAll({
          attributes: ["comp_id", "comp_name"],
          where: {
            comp_deleted: 0,
            comp_paused: 0,
            /**
             * Here we are looking if the user role is NOT field
             * executive and he is an employee of the company than bring the Compaign name and
             */
            [Op.or]: [
              {
                forFreelancers: userRole !== "Field Executive" ? true : false
              },
              { forAll: true }
            ]
          }
        })
          .then(compaigns => {
            if (compaigns) {
              return compaigns;
            }
          })
          .catch(error => {
            if (error) console.error("Error getting Compaigns" + error);
            return null;
          });

        let unreadNotificationCount = await countofNotificationOfExecutive(
          +field_id
        );

        if ((unreadNotificationCount, CompaignsList, AgencyData)) {
          res.status(200).send({
            AgencyData,
            pakistanCityName,
            CompaignsList,
            url: req.protocol + "://" + req.get("host"),
            unreadNotificationCount:
              unreadNotificationCount[0].dataValues.unreadNotificationCount
          });
        } else {
          res.status(404).send({ message: "Error in finding the record" });
        }
      }
      unreadNotificationCount = null;
    } catch (error) {
      console.log("Error in the Get Agencies");
      console.trace(error);
    }
  }
);

//POST to find the agency

router.route("/getAgencyDetails").post(async (req, res) => {
  try {
    let userReqBody = { ...req.body };
    let lengthofUser_Req = Object.keys(userReqBody).length;

    if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {
      const AgencyDetails = await Database.Agency_Info.findOne({
        attributes: {
          exclude: [
            "agency_Longitude",
            "agency_Latitude",
            "firstVisit",
            "deleted",
            "isPaused",
            "updateTimestamp"
          ]
        },
        where: {
          agency_name: {
            [Op.like]: `%${userReqBody.agencyName}`
          },
          agency_city: {
            [Op.like]: `%${userReqBody.agencyCity}`
          },
          agency_address: {
            [Op.like]: `%${userReqBody.selectedAgencyAddress}`
          },
          deleted: false,
          isPaused: false
        },
        include: {
          attributes: ["field_name", "field_userProfilePic", "field_contact"],
          model: Database.Field_Executive
        }
      });

      let status = AgencyDetails === null ? false : true;
      if (status) res.status(200).send({ success: "Found", AgencyDetails });
      else res.status(400).send({ error: "error", details: "No Found" });
    } else
      res
        .status(400)
        .send({ error: "error", details: "Invalid values are entered" });
  } catch (error) {
    console.log("Error in Getting the details");
    console.trace(error);
    res.status(500).send({ error: "Error" });
  }
});

router.route("/startActivityOnExsitingActivity").post(async (req, res) => {
  try {
    const AgencyDetails = await Database.Agency_Info.findOne({
      attributes: ["agency_id", "agency_name"],
      where: {
        agency_id: req.body.agencyID,
        isPaused: false,
        deleted: false,
        firstVisit: true
      }
    }).catch(err => {
      if (err) {
        console.log("Error Getting Agencies ==== >", err);
        return null;
      }
    });

    if (AgencyDetails) {
      /**
       * Starting a new activity on the given agency
       */
      const compapignActivity = await Database.Activities.create({
        comp_id: req.body.CompaignID,
        field_id: req.body.field_id,
        agency_id: AgencyDetails.dataValues.agency_id
      })
        .then(response => {
          if (response) return response;
        })
        .catch(error => {
          if (error) {
            console.error(`\x1b[41m------Error! Creating a new Compaign Activity at Continue
              Activities on Agency - \n\n ${error}-----\x1b[0m`);
            res.status(500).send({ error: "Sorry! Can not start Activity" });
          }
        });

      if (compapignActivity) {
        /**
         * Looking for the notification of already registered agency
         */
        const notificationText = await Database.NotificationText.findOne({
          attributes: ["notification_id"],
          where: {
            isPaused: false,
            deleted: false,
            notification_title: {
              [Op.like]: "%Start%"
            },
            [Op.or]: [
              {
                notification_title: {
                  [Op.like]: "%Existing%"
                }
              },
              {
                notification_title: {
                  [Op.like]: "%Existing Agnecy%"
                }
              }
            ]
          }
        }).catch(err => {
          if (err) {
            console.log("Error Getting NotificationText ==== >", err);
            return null;
          }
        });
        await Database.ExecutiveNotifications.create({
          field_id: req.body.field_id,
          notification_text: `You have started working on the Already Registered Agency ${AgencyDetails.dataValues.agency_name}...!!!`,
          notification_id: notificationText.dataValues.notification_id
        });
        req.session.activityDetails = {
          activity: compapignActivity.dataValues.list_act_uuid,
          agencyID: req.body.agencyID
        };
        res.status(200).send({
          agencyID: req.body.agencyID,
          uuid: `${compapignActivity.dataValues.list_act_uuid}`
        });
        res.end();
        return;
      }
    } else {
      res.status(200).send({ status: false, message: "No Agency Found" });
      res.end();
      return;
    }
  } catch (e) {
    res.status(500).send({ status: false, message: "Server Error" });
    res.end();
    return;
  }
});

router.route("/notification").get(async (req, res) => {
  /**
   * getting the count of the unread notifications
   */
  const unreadNotificationCount = await countofNotificationOfExecutive(
    req.body.field_id
  );
  const unreadNotification = await Database.ExecutiveNotifications.findAll({
    attributes: [
      "execu_notification_uuid",
      "notification_text",
      "isRead",
      "createdAt"
    ],
    include: {
      model: Database.NotificationText,
      attributes: ["notification_title", "notification_icon"],
      required: true,
      where: {
        isPaused: false,
        deleted: false
      }
    },
    where: {
      isPaused: false,
      deleted: false,
      field_id: req.body.field_id
    },
    limit: 50
  }).then(notifications => {
    if (notifications) return notifications;
  });
  res.status(200).send({
    unreadNotificationCount:
      unreadNotificationCount[0].dataValues.unreadNotificationCount,
    unreadNotification
  });
  res.end();
  return;
});

module.exports = { router };

/*
 End of the router


**/
const countofNotificationOfExecutive = async field_id => {
  return await Database.ExecutiveNotifications.findAll({
    attributes: [
      [
        sequelize.fn("COUNT", sequelize.col("execu_notification_id")),
        "unreadNotificationCount"
      ]
    ],
    where: {
      isRead: false,
      field_id
    }
  }).then(notifications => {
    if (notifications) return notifications;
  });
};

const getAuthenticateJSON = userReqBody => {
  Object.keys(userReqBody).forEach(key => {
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
