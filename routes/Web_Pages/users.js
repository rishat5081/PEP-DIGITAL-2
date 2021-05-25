const express = require("express"),
  router = express.Router(),
  mainRouter = require("./index"),

  {
    User_Login_Information,
  } = require("../../Configuration Files/Sequelize/Database_Synchronization");


const jwt_decode = require('jwt-decode');







router.get("/confirmemail", mainRouter.isUser_Login, (req, res, next) => {
  res.status(200).render("Web Appendage Pages/confirmEmail");
});

/**
 * Getting the token to be verified here
 * now what will happen here that the route which will be verifyToken and then
 * the next part will be the query which will be the token which is stored in the
 * DB against the user information
 */

router.get("/verifyToken/Authorization=Bearer%20/:token", (req, res) => {



  let jwtToken_FromHeader = req.params.token;
  /**
   * Getting the token to be verifed by the
   * comparing it with the database
   *
   */
  /**
   * Decoding the header token and getting the user email address
   */
  var decoded = jwt_decode(jwtToken_FromHeader);

  User_Login_Information.findOne({
    where: {
      jwt: jwtToken_FromHeader,
      login_email: decoded.data
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


module.exports = { router };
