const { Op } = require("sequelize");
const Database = require("../../Configuration Files/Sequelize/Database_Synchronization");
const {
  multerFile_Upload_Function
} = require("../../Configuration Files/Multer Js/multer");

module.exports = (app) => {
  /**
   * Upload image of the user at the starting of the new user login
   */

  app.post("/teamlead/uploadProfilePhoto", async (req, res) => {
    multerFile_Upload_Function(req, res, (err) => {
      if (err) {
        return res.send({ messages: err, type: "danger" });
      } else {
        let filename = req.files[0].filename;
        let filePath = req.files[0].destination.split("./public");

        Database.Team_Lead.update(
          {
            team_L_userProfilePic: filePath[1] + filename
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
              profileImage: filePath[1] + filename
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

  app.route("/teamlead/updateProfileInfo").post(async (req, res) => {
    const dbResponse = await Database.Role_ExtraInfo.findOne({
      include: {
        model: User_Role,
        attributes: [],
        where: {
          type_name: {
            [Op.like]: "%Team Lead%",
            [Op.like]: "%Team%"
          }
        }
      },
      attributes: ["target", "commission", "salary"],
      where: {
        paused: 0,
        deleted: 0
      }
    })
      .then((response) => {
        if (response) return response;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.log("Error! Can not Fetch Commissions and Target from DB");
          console.trace(error);
          return null;
        }
      });

    if (dbResponse !== null) {
      const updateStatus = await Database.Team_Lead.update(
        {
          team_L_name: req.body.name,
          team_L_contact: req.body.contact,
          team_L_username: req.body.username,
          team_L_target: dbResponse.dataValues.target,
          team_L_salary: dbResponse.dataValues.salary,
          team_L_commission: dbResponse.dataValues.commission
        },
        {
          where: {
            login_id: req.session.passport.user.userInfo.login_id
          }
        }
      )
        .then((response) => {
          console.log(response);
          if (response) {
            return response;
          } else {
            return null;
          }
        })
        .catch((error) => {
          if (error) {
            console.error("Error Updating the Team lead Info");
            console.trace(error);
            return null;
          }
        });

      if (updateStatus !== null) {
        res.status(200).send({
          type: "success",
          messages: "Updated",
          uuid: req.session.passport.user.userInfo.login_uuid
        });
        res.end();
      } else {
        res.status(503).send({
          type: "danger",
          messages: "Error! Internal Error! "
        });
        res.end();
      }
    } else {
      res.status(503).send({
        type: "danger",
        messages: "Error! Internal Error! "
      });
    }
  });

  /**
   * updaing the team lead profile information
   *
   */
  app.route("/updateTeamLeadProfile").post(async (req, res) => {
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

      const updateExecutiveInfo = await Database.Team_Lead.update(
        {
          team_L_name: userReqBody.fullname,
          team_L_contact: userReqBody.contact,
          team_L_username: userReqBody.username
        },
        {
          where: {
            team_L_uuid: req.session.profileData.team_L_uuid
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

  /**
   * adding a member to the team
   */

  app.route("/addMembertoTeam").post(async (req, res) => {
    console.warn(req.body);
    //checking the user inofrmation from the database and also getting the role and field id
    const fieldExecutive = await Database.User_Login_Information.findOne({
      attributes: ["login_id", "user_role_id"],
      include: {
        model: Database.Field_Executive,
        required: true,
        attributes: ["field_id"],
        where: {
          //using the UUID from the front end
          field_uuid: req.body.id,
          field_isDeleted: false,
          field_isPaused: false
        }
      },
      where: {
        deleted: false,
        paused: false
      }
    });

    //getting the role id of the field executive  from the database so i may not be static
    //it should be dynamic but the type must mathces Field Executive

    const userRole = await Database.User_Role.findOne({
      attributes: ["user_role_id"],
      where: {
        deleted: false,
        paused: false,
        type_name: {
          [Op.like]: [`Field Executive`],
          [Op.like]: [`%Field Executive%`]
        }
      }
    });

    //update the role of the user to Field Executive

    const updateRole = await Database.User_Login_Information.update(
      {
        user_role_id: userRole.dataValues.user_role_id
      },
      {
        where: {
          login_id: fieldExecutive.dataValues.login_id,
          deleted: false,
          paused: false
        }
      }
    );
    //and adding the Field Executive to the Team lead

    const updateExecutiveToTeam = await Database.Field_Executive.update(
      {
        team_L_id: req.session.profileData.team_L_id
      },
      {
        where: {
          field_uuid: req.body.id,
          field_id:
            fieldExecutive.dataValues.Field_Executive.dataValues.field_id
        }
      }
    );

    // adding the role information into the roleChanged table
    // console.log(
    //   fieldExecutive.dataValues,
    //   userRole
    //   //   updateRole,
    //   //   updateExecutiveToTeam
    // );
    const roleChanged = await Database.changeRoleLogs.create({
      previousRole: fieldExecutive.dataValues.user_role_id,
      newRole: userRole.dataValues.user_role_id,
      field_id: fieldExecutive.dataValues.Field_Executive.dataValues.field_id,
      team_L_id: 1
    });

    //sending the response to the user
    if ((fieldExecutive, userRole, updateExecutiveToTeam, roleChanged)) {
      res.status(200).send({
        status: "Done"
      });
    } else {
      res.status(400).send({
        error: "error"
      });
    }
  });
};

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

// async function a() {
//   const fieldExecutive = await Database.User_Login_Information.findOne({
//     attributes: ["login_id", "user_role_id"],
//     include: {
//       model: Database.Field_Executive,
//       required: true,
//       attributes: ["field_id"],
//       where: {
//         field_uuid: "ce1308f8-0452-42f6-b900-a144ea3ab1f3",
//         field_isDeleted: false,
//         field_isPaused: false
//       }
//     },
//     where: {
//       deleted: false,
//       paused: false
//     }
//   });

//   const userRole = await Database.User_Role.findOne({
//     attributes: ["user_role_id"],
//     where: {
//       deleted: false,
//       paused: false,
//       type_name: {
//         [Op.like]: [`Field Executive`],
//         [Op.like]: [`%Field Executive%`]
//       }
//     }
//   });

//   const updateRole = await Database.User_Login_Information.update(
//     {
//       user_role_id: userRole.dataValues.user_role_id
//     },
//     {
//       where: {
//         login_id: fieldExecutive.dataValues.login_id,
//         deleted: false,
//         paused: false
//       }
//     }
//   );

//   //   const roleChanged = await Database.changeRoleLogs.create({
//   //     previousRole: fieldExecutive.dataValues.user_role_id,
//   //     newRole: userRole.dataValues.user_role_id,
//   //   field_id: fieldExecutive.dataValues.Field_Executive.dataValues.field_id,
//   //     team_L_id: 1
//   //   });
// }

// a();
