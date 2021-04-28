const express = require("express"),
  router = express.Router(),
  mainRouter = require("./index"),
  {
    User_Login_Information,
  } = require("../../Configuration Files/Sequelize/Database_Synchronization");

router.get("/confirmemail", mainRouter.isUser_Login, (req, res, next) => {
  res.status(200).render("Web Appendage Pages/confirmEmail");
});

/**
 * Getting the token to be verified here
 * now what will happen here that the route which will be verifyToken and then
 * the next part will be the query which will be the token which is stored in the
 * DB against the user information
 */

router.get("/verifyToken?:token", (req, res) => {
  // console.log(req.query.Authorization)
  let jwtToken_FromHeader = req.query.Authorization.split(" /");
  /**
   * Getting the token to be verifed by the
   * comparing it with the database
   *
   */
  User_Login_Information.findOne({
    where: {
      jwt: jwtToken_FromHeader[1],
    },
  })
    .then((response) => {
      if (!response) {
        res.status(404).render("Web Appendage Pages/error", {
          message: req.flash("success", "Invalid Token"),
          errorStatus: 404,
          errorHeading: "Invalid Token",
        });
      }
      if (response) {
        response
          .update({
            verified: 1,
          })
          .then((updateResponse) => {
            if (updateResponse) {
              res.status(200).render("Field Executive/emailVerified");
            }
          })
          .catch((error) => {
            if (error) {
              res.status(404).render("Web Appendage Pages/error", {
                message: req.flash("danger", "Invalid Token"),
                errorStatus: 404,
                errorHeading: "Invalid Token",
              });
            }
          });
      }
    })
    .catch((error) => {
      if (error) {
        res.status(404).render("Web Appendage Pages/error", {
          message: req.flash("danger", "Invalid Token"),
          errorStatus: 404,
          errorHeading: "Invalid Token",
        });
      }
    });
});

// router.get("/userProfile/:id", mainRouter.isUser_Login, (req, res) => {
//   // checkRole_GetData_FromDB(req.session.userInfo.userRole, req.session.userInfo.userInfo.login_id, res)
//   console.log("Gettt it  --------------------------> ");
//   console.log("Gettt it  --------------------------> " + req.params.id);
//   // console.log('Gettt it  --------------------------> ' + req.session.userData,
//   // req.session.userPermissions)
//   // console.log(req.session)
//   // console.log('Gettt it  --------------------------> ' + req.session.userInfo.userInfo)

//   console.log(req.session);
// });

module.exports = { router };

// /**
//  * Function for getting the menu and checkin the role of the user
//  *
//  * and then get the relevant information from the database and then render to the relevant page
//  * @param {*} userRole
//  * @param {*} login_id
//  * @param {*} res
//  */
// async function checkRole_GetData_FromDB(userRole, login_id, res) {
//   if (userRole.type_name === "SuperVisor") {
//     const menuData = getMenu(userRole.type_name);
//     const SuperVisorData = await Supervisor.findOne({
//       attributes: {
//         exclude: [
//           "sup_id",
//           "sup_isDeleted",
//           "sup_isPaused",
//           "login_id",
//           "createdAt",
//           "updateTimestamp",
//         ],
//       },
//       where: {
//         login_id,
//       },
//     })
//       .then((rss) => console.log(rss, menuData))
//       .catch((err) => console.log(err));
//   }
//   if (userRole.type_name === "Team Lead") {
//     const menuData = getMenu(userRole.type_name);
//     await Team_Lead.findOne({
//       where: {
//         login_id,
//       },
//     })
//       .then((rss) => console.log(rss, menuData))
//       .catch((err) => console.log(err));
//   }
//   if (userRole.type_name === "Freelance Field Executive") {
//     const menuData = getMenu(userRole.type_name);
//     await Field_Executive.findOne({
//       where: {
//         login_id,
//       },
//     })
//       .then((rss) => console.log(rss, menuData))
//       .catch((err) => console.log(err));
//   }
// }

// const getMenu = async (roleName) => {
//   return await Permissions.findAll({
//     // where: {
//     //   permmission_id: 10,
//     // },
//     include: {
//       model: User_Role,
//       where: {
//         type_name: roleName,
//       },
//     },
//   });
// };
