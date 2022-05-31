const { Console } = require("console");

const router = require("express").Router(),
  fs = require("fs"),
  { Op } = require("sequelize"),
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
    attributes: ["target", "commission", "salary"],
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
        // man_DOB: req.body.dob,
        gm_contact: req.body.contact,
        // man_username: req.body.username,
        // man_target: dbResponse.dataValues.target,
        gm_salary: dbResponse.dataValues.salary,
        // man_commission: dbResponse.dataValues.commission,
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
        //  man_username: userReqBody.username,
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
 * Controller for sending message to all the team member
 */
router
  .route("/getCityAgencies/:gm_uuid")
  .post(isManagerAuthentic, async (req, res) => {
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
          Database.Managers.findAll({
            attributes: ["man_id"],
            where: {
              man_isDeleted: 0,
              man_isPaused: 0,
              d_id: cityData.d_id,
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
      if (agencies === null) {
        res.status(500).send({ error: "Please try again" });
        agencies = null;
        res.end();
      } else {
        res
          .status(200)
          .send({ status: "Successfully, Fetched Agencies", agencies });
        agencies = null;
        res.end();
      }
    } else {
      res.status(500).send({ error: "Please try again" });
      res.end();
    }
  });

  

