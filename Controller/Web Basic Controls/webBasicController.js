module.exports = (app) => {
  const {
      User_Login_Information,
      User_Role,
      Field_Executive
    } = require("../../Configuration Files/Sequelize/Database_Synchronization"),
    bcrypt = require("bcrypt"),
    json_WebToken = require("jsonwebtoken"),
    ejs = require("ejs"),
    {
      sendEmail_to_ConfirmEmail
    } = require("../../Configuration Files/Nodemailer/Nodemailer"),
    salt_ForBcrypt = 10;
  require("dotenv").config();
  /**
   * Setting the controller for the new user
   * here all the validation will be done
   * that the user exists or not
   * it is known as the middleware
   */
  app.post("/userSignUp", (req, res, next) => {
    const dbResponse = User_Login_Information.findOne({
      where: {
        login_email: req.body.registering_email
      }
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.error(
          "Error occur where the user is trying to register..... \n \n" + error
        );
        req.session.SignUp_Error = {
          type: "Danger",
          message: "Sorry! The system ran into problem" + error
        };
        res.status(500).redirect("/signup");
      });

    /**
     * Resolving the Promise
     */
    dbResponse
      .then((response) => {
        if (response) {
          req.session.SignUp_Error = {
            type: "Danger",
            message: "Email Already Exists"
          };
          res.status(302).redirect("/signup");
        } else {
          next();
        }
      })
      .catch((error) => {
        console.log(
          "Error occur where the user is trying to register in the Promise Resolving..... \n \n" +
            error
        );
        req.session.SignUp_Error = {
          type: "Danger",
          message: "Sorry! The system ran into problem"
        };
        res.status(500).redirect("/signup");
      });
  });

  /**
   * Getting towards the other Sign Up Controller
   * adding the new user and sending the email
   * for confirmation
   */
  app.post("/userSignUp", async (req, res) => {
    // hasing the passowrd uisng bcrypt
    var hashPassword = "",
      jwtToken = "",
      jwtAuthentication_Token = "";

    hashPassword = bcrypt.hashSync(
      req.body.registering_password,
      salt_ForBcrypt
    );

    /**
     * Getting the jwt from json web token
     */
    jwtToken = json_WebToken.sign(
      {
        data: req.body.registering_email
      },
      process.env.bcryptSecret,
      {
        algorithm: "HS384",
        expiresIn: 60 * 60 * 24 * 7
      }
    );

    jwtAuthentication_Token = `${process.env.domain}${process.env.server_PORT}/verifyToken/Authorization=Bearer%20/${jwtToken}`;

    /**
     * Creating the user accouint
     */

    const dbResponse = await User_Login_Information.create({
      login_email: req.body.registering_email,
      login_password: hashPassword,
      user_role_id: 6,
      jwt: jwtToken
    })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        console.log("Error in inserting data into DB");
        req.session.SignUp_Error = {
          type: "Danger",
          message: "Sorry! The system ran into problem"
        };
        res.status(500).redirect("/signup");
      });

    if (dbResponse) {
      /**
       * Here is the sending the email for confirmation to the registered user
       * The user is created and the token is already generated now
       * is the Nodemailer work
       */

      Field_Executive.create({
        login_id: dbResponse.dataValues.login_id
      })
        .then((executive) => console.info("Created"))
        .catch((err) => console.trace("Error" + err));
      /**
       * Now what will happen here is that first we will render the file using ejs.renderfile
       * and set the attributes in it like userEmail, jsonWebToken and etc
       * and by using this we will user Nodemailer inside it
       * and sent the html file to the targeted user
       */
      ejs.renderFile(
        "./views/Web Appendage Pages/email_template.ejs",
        {
          logo: process.env.logoURL,
          emailSubject: "Confirm your Email",
          userEmail: req.body.registering_email,
          jsonWebToken: jwtAuthentication_Token
        },
        {},
        (err, emailHTMLFILE) => {
          if (err) {
            req.session.SignUp_Error = {
              type: "Danger",
              message: "Sorry! The system ran into problem"
            };
            res.status(500).redirect("/signup");
          } else {
            const emailStatus = sendEmail_to_ConfirmEmail(
              req.body.registering_email,
              emailHTMLFILE,
              "Confirm your Email"
            );
            emailStatus
              .then((status) => {
                if (status) {
                  res.status(200).render("Web Appendage Pages/confirmEmail", {
                    uuid: dbResponse.dataValues.login_uuid
                  });
                }
              })
              .catch((error) => {
                if (error) {
                  console.error(error);
                  res.status(200).render("Web Appendage Pages/confirmEmail", {
                    message: req.flash(
                      "danger",
                      "System ran into problem. We will send you email in few minutes."
                    ),
                    uuid: null
                  });
                }
              });
          }
        }
      );
    } else {
      res.send("Error", "Try with different email");
    }
  });

  /**
   * Here it will get send email again controller here
   * The values of the user UUID will be fetched from
   * form will be submitted from the client side from there the UUID
   * will be fetched and then from there the token will be get from the DB
   * and then updated the token to DB and send it to user
   */

  app.post("/resendEmail", (req, res) => {
    if (!req.body.UUID) {
      res.status(404).send({ message: "Sorry, Try Again " });
    }
    if (req.body.UUID) {
      const dbResponse = User_Login_Information.findOne({
        attributes: ["login_email", "jwt"],
        where: {
          login_uuid: req.body.UUID
        }
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          if (error) res.status(404).send({ message: "Sorry, Try Again." });
        });

      /**
       * Solving the promise
       */
      dbResponse
        .then((response) => {
          if (!response) {
            res.status(404).send({ message: "Sorry, Try Again." });
          }
          if (response) {
            let jwtToken, jwtAuthentication_Token;
            /**
             * Getting the jwt from json web token
             */
            jwtToken = json_WebToken.sign(
              {
                data: response.dataValues.login_email
              },
              process.env.bcryptSecret,
              {
                algorithm: "HS384",
                expiresIn: 60 * 60 * 24 * 7
              }
            );

            jwtAuthentication_Token = `${process.env.domain}${process.env.server_PORT}/verifyToken?Authorization=Bearer%20/${jwtToken}`;

            console.log(jwtAuthentication_Token);
            ejs.renderFile(
              "./views/Web Appendage Pages/email_template.ejs",
              {
                logo: process.env.logoURL,
                emailSubject: "Confirm your Email",
                userEmail: response.dataValues.login_email,
                jsonWebToken: jwtAuthentication_Token
              },
              {},
              (err, emailHTMLFILE) => {
                if (err) {
                  req.session.SignUp_Error = {
                    type: "Danger",
                    message: "Sorry! The system ran into problem"
                  };
                  res.status(500).redirect("/signup");
                } else {
                  const emailStatus = Nodemailer.sendEmail_to_ConfirmEmail(
                    response.dataValues.login_email,
                    emailHTMLFILE,
                    "Confirm your Email"
                  );
                  emailStatus
                    .then((status) => {
                      if (status) {
                        /**
                         * Updading the jwt in the database
                         */
                        User_Login_Information.update(
                          {
                            jwt: jwtToken
                          },
                          {
                            where: {
                              login_uuid: req.body.UUID
                            }
                          }
                        )
                          .then((res) =>
                            console.log(
                              "JWT is Updated for User UUID" + req.body.UUID
                            )
                          )
                          .catch((err) =>
                            console.log(
                              `Can not Update JWT for user UUID (${req.body.UUID}) with error: ` +
                                err
                            )
                          );
                        res.status(200).send({
                          successMessage: "Email is Send.",
                          UUID: req.body.UUID
                        });
                      }
                    })
                    .catch((error) => {
                      if (error) {
                        res.status(404).send({
                          message: "Sorry, The System is Busy. Please Wait "
                        });
                      }
                    });
                }
              }
            );
          }
        })
        .catch((error) => {
          if (error) res.status(404).send({ message: "Sorry, Try Again." });
        });
    }
  });
};
