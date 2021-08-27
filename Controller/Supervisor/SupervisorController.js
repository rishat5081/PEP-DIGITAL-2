const router = require("express").Router(),
  fs = require("fs"),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  {
    multerFile_Upload_Function
  } = require("../../Configuration Files/Multer Js/multer"),
  { isUserAuthentic } = require("../../routes/SuperVisor/superVisor_route");

/**
 * Uploading the user profile image to the server
 * Updating the user profile image
 * in to the data base
 * and also using the Multer
 */

router
  .route("/supervisor/upload/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    const userProfileImage = await Database.Supervisor.findOne({
      attributes: ["sup_userProfilePic"],

      where: {
        login_id: req.session.passport.user.userInfo.login_id
      }
    });
    if (userProfileImage.dataValues.sup_userProfilePic !== null) {
      fs.unlink(
        `./public/${userProfileImage.dataValues.sup_userProfilePic}`,
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

        Database.Supervisor.update(
          {
            sup_userProfilePic: filePath[1] + filename
          },
          {
            where: {
              login_id: req.session.passport.user.userInfo.login_id
            }
          }
        ).then((response) => {
          if (response) {
            res.send({
              type: "success",
              messages: "Profile Image Uploaded",
              ProfilePic: filePath[1] + filename
            });
          } else {
            res.send({
              type: "danger",
              messages: "Error! in Uploading Image! "
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
  .route("/supervisor/updateProfileInfo/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    const dbResponse = await Database.Role_ExtraInfo.findOne({
      attributes: ["target", "commission", "salary"],
      include: {
        model: Database.User_Role,
        where: {
          type_name: req.session.passport.user.userRole.type_name
        }
      },
      where: {
        paused: 0,
        deleted: 0
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        if (error) {
          console.error(
            "Error! Can not Fetch Commissions and Target from DB" + error
          );
          console.trace(error);
          return null;
        }
      });

    if (dbResponse === null) {
      res
        .status(500)
        .send({
          type: "danger",
          messages: "Error! Please try Again! "
        })
        .end();
    } else {
      Database.Supervisor.update(
        {
          sup_name: req.body.name,
          sup_DOB: req.body.dob,
          sup_contact: req.body.contact,
          sup_username: req.body.username,
          sup_target: dbResponse.dataValues.target,
          sup_salary: dbResponse.dataValues.salary,
          sup_commission: dbResponse.dataValues.commission
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id
          }
        }
      )
        .then((response) => {
          if (response) {
            res.status(200).send({
              type: "success",
              messages: "Updated",
              uuid: req.session.profileData.sup_uuid
            });
          }
        })
        .catch((error) => {
          console.error(error);
          res.status(500).send({
            type: "danger",
            messages: "Error! Can not update the Profile. Please Try Again! "
          });
        });
    }
  });

/**
 * updaing the profile information
 *
 */
router
  .route("/updateSupervisorProfile/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    let userReqBody = { ...req.body };
    let lengthofUser_Req = Object.keys(userReqBody).length;

    if (lengthofUser_Req === getAuthenticateJSON(userReqBody)) {
      /**
       * Updating the email if the user entered the new email address
       */
      const emailUpdate = await Database.User_Login_Information.update(
        {
          login_email: userReqBody.email
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id,
            paused: 0,
            deleted: 0
          }
        }
      );

      const updateExecutiveInfo = await Database.Supervisor.update(
        {
          sup_name: userReqBody.fullname,
          sup_contact: userReqBody.contact,
          sup_username: userReqBody.username
        },
        {
          where: {
            sup_uuid: req.session.profileData.sup_uuid
          }
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
          details: "Error! while updating your information."
        });
      }
    } else
      res.status(404).send({ error: "error", details: "Invalid entered data" });
  });

router
  .route("/allocateAreaToTeamLead/:sup_uuid")
  .post(isUserAuthentic, async (req, res) => {
    console.log(req.body.employees);
    //getting the sector ID from the database
    let sectorID = await Database.City_Areas.findOne({
      attributes: ["city_area_id"],
      where: {
        city_area_uuid: req.body.selectedArea,
        deleted: 0,
        paused: 0
      }
    });
    let executiveID = await Database.Team_Lead.update(
      {
        city_area_id: sectorID.dataValues.city_area_id
      },
      {
        where: {
          team_L_uuid: req.body.employees,
          team_L_isDeleted: 0,
          team_L_isPaused: 0
        }
      }
    );

    if ((sectorID, executiveID !== null)) {
      sectorID = executiveID = null;
      res.status(200).send({ status: "Area Assigned Successfully" });
      res.end();
    } else {
      sectorID = executiveID = null;
      res.status(500).send({ error: "Please try again" });
      res.end();
    }
    ////console.(req.body);
  });

module.exports = { router };

// Database.Role_ExtraInfo.create({
//   target: "150",
//   salary: "85100",
//   commission: "1.5%",
//   user_role_id: 4
// }).then((d) => {
//   console.log("Hello", d);
// });
