
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