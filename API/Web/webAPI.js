const {
  sendEmail_to_ConfirmEmail,
} = require("../../Configuration Files/Nodemailer/Nodemailer");

const router = require("express").Router(),
  Database = require("../../Configuration Files/Sequelize/Database_Synchronization"),
  bcrypt = require("bcrypt"),
  { privateKey, secretKeyToValidateAPI } = require("../../additional"),
  JWT = require("jsonwebtoken"),
  { saltOfBcrypt, keyBase64, ivBase64 } = require("../../additional"),
  ejs = require("ejs"),
  crypto = require("crypto");
var tokenMapObject = new Map();

//middleware for token authentication
const validateToken = async (req, res, next) => {
  if (req.headers) {
    const bearerHeader = req.headers.authorization.split(" ");
    const mapValue = tokenMapObject.get(bearerHeader[1]);

    if (mapValue) {
      const verificationResponse = await JWT.verify(
        bearerHeader[1],
        privateKey
      );
      if (verificationResponse) next();
    } else {
      res
        .status(400)
        .send({ status: "Invalid", message: "Invalid Toekn,Try Again" });
      res.end();
    }
  } else {
    res.status(400).send({ status: "Fail", message: "Enter Token" });
    res.end();
  }
};

//encryption for authentic user
router.route("/generateKey").get(async (req, res) => {
  var plainText = create_UUID().toString();

  var cipherText = encrypt(plainText, keyBase64, ivBase64);

  tokenMapObject.set(cipherText.toString(), plainText);

  res.status(200).send({
    encrypted: cipherText.toString(),
    key: keyBase64,
    iv: ivBase64,
    value: plainText,
  });
});

//validate encrypted key and generating the token
router.route("/validateKey").post(async (req, res) => {
  let temp = tokenMapObject.get(req.body.encryptedValue);

  if (temp) {
    const token = JWT.sign({ value: req.body.encryptedValue }, privateKey, {
      algorithm: "HS512",
      noTimestamp: true,
      expiresIn: "24h",
    });

    // tokenMap.push({ value: token, key: req.query.token });

    tokenMapObject.set(token, req.body.encryptedValue);

    if (token) res.status(200).send({ status: "Created", token });
  } else {
    res.status(200).send({ status: "Not Found", message: "Invalid Key" });
  }
});

/**
 * Login API
 */
router.route("/login").post(
  // validateToken,
   async (req, res) => {
  if (req.body) {
    const User_Login_Info = await Database.User_Login_Information.findOne({
      include: {
        model: Database.User_Role,
        attributes: ["user_role_id", "type_name"],
      },
      attributes: [
        "login_id",
        "login_email",
        "login_uuid",
        "login_password",
        "verified",
        "paused",
        "createdAt",
        "deleted",
      ],
      where: {
        login_email: req.body.login_email,
        deleted: 0,
      },
    })
      .then((response) => {
        if (response) return response;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.log("Error in Login API");
          console.trace(error);
          return null;
        }
      });

    if (User_Login_Info) {
      if (
        !bcrypt.compareSync(
          req.body.login_password,
          User_Login_Info.dataValues.login_password
        )
      ) {
        res.status(200).send({
          status: "Wrong Password",
          message: "In-Correct Password !!! Try Again. ",
        });
        res.end();
        return;
      }
      if (!User_Login_Info.dataValues.verified) {
        res.status(200).send({
          status: "Not Verified",
          message: "Please verified your email",
        });
        res.end();
        return;
      } else if (User_Login_Info.dataValues.paused) {
        res.status(200).send({
          status: "Account Blocked",
          message:
            "You are not allow to use this Website, \n Please Connect your Team Lead.",
        });
        res.end();
        return;
      } else {
        //getting permission from the database
        const permissions = await checkRole_GetData_FromDB(
          User_Login_Info.User_Role.dataValues,
          User_Login_Info.login_id
        );

        //generating the token

        // const token = JWT.sign(
        //   { userLoginUUID: User_Login_Info.login_uuid },
        //   privateKey,
        //   {
        //     algorithm: "HS512",
        //     keyid: "1",
        //     noTimestamp: false,
        //     expiresIn: "1s",
        //     notBefore: "2s",
        //   }
        // );

        res.status(200).send([{
          status: "Logged In",
          // token,
          permissions,
          userLogin: {
            login_id: User_Login_Info.login_id,
            login_uuid: User_Login_Info.login_uuid,
            verified: User_Login_Info.verified,
            paused: User_Login_Info.paused,
          },
          userRole: User_Login_Info.User_Role.dataValues,
        }]);
        res.end();
        return;
      }
    } else {
      //checking if the user does not exist in the db
      res.status(200).send([{
        status: "No Email Found",
        message: "In-Correct Email!!! Try Again. ",
      }]);
      res.end();
      return;
    }
  }
});

router.route("/signup").post(
  // validateToken,
   async (req, res) => {
  if (req.body) {
    const User_Login_Info = await Database.User_Login_Information.findOne({
      where: {
        login_email: req.body.login_email,
      },
    })
      .then((response) => {
        if (response) return response;
        else return null;
      })
      .catch((error) => {
        if (error) {
          console.log("Error in Login API");
          console.trace(error);
          return null;
        }
      });

    if (User_Login_Info) {
      res.status(200).send({
        status: "Email Found",
        message: "User Exists with Email",
      });
      res.end();
      return;
    } else {
      // hasing the passowrd uisng bcrypt
      var hashPassword = "",
        jwtToken = "",
        jwtAuthentication_Token = "";
      hashPassword = bcrypt.hashSync(req.body.login_password, saltOfBcrypt);
      /**
       * Getting the jwt from json web token
       */
      jwtToken = JWT.sign(
        {
          data: req.body.login_email,
        },
        privateKey,
        {
          algorithm: "HS384",
          expiresIn: 60 * 60 * 24 * 7 * 10,
        }
      );
      jwtAuthentication_Token = `${
        req.protocol + "://" + req.get("host")
      }/verifyToken/Authorization=Bearer%20/${jwtToken}`;
      /**
       * Creating the user accouint
       */
      const dbResponse = await Database.User_Login_Information.create({
        login_email: req.body.login_email,
        login_password: hashPassword,
        user_role_id: 6,
        jwt: jwtToken,
      })
        .then((response) => {
          return response;
        })
        .catch((error) => {
          console.log("Error in inserting data into DB");
          console.trace(error);
          res.status(500).send({
            status: "Error",
            message: "Try Again",
          });
          res.end();
          return null;
        });
      if (dbResponse) {
        /**
         * Here is the sending the email for confirmation to the registered user
         * The user is created and the token is already generated now
         * is the Nodemailer work
         */
        Database.Field_Executive.create({
          login_id: dbResponse.dataValues.login_id,
        })
          .then((executive) => console.info("New User Created from API"))
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
            userEmail: req.body.login_email,
            jsonWebToken: jwtAuthentication_Token,
          },
          {},
          (err, emailHTMLFILE) => {
            if (err) {
              console.log("Error in inserting data into DB");
              console.trace(error);
              res.status(500).send({
                status: "Error",
                message: "Try Again",
              });
              res.end();
              return null;
            } else {
              const emailStatus = sendEmail_to_ConfirmEmail(
                req.body.login_email,
                emailHTMLFILE,
                "Confirm your Email"
              );
              emailStatus
                .then((status) => {
                  if (status) {
                    res.status(200).send({
                      status: "Please confirm your Email",
                    });
                  }
                })
                .catch((error) => {
                  if (error) {
                    console.log("Error in inserting data into DB");
                    console.trace(error);
                    res.status(500).send({
                      status: "Error",
                      message: "Try Again",
                    });
                    res.end();
                    return null;
                  }
                });
            }
          }
        );
      } else {
        console.log("Error in inserting data into DB");
        console.trace(error);
        res.status(500).send({
          status: "Error",
          message: "Try Again",
        });
        res.end();
        return null;
      }
    }
  } else {
    //checking if the user does not exist in the db
    res.status(200).send({
      status: "No Email Found",
      message: "In-Correct Email!!! Try Again. ",
    });
    res.end();
    return;
  }
});

module.exports = { router, validateToken };

async function checkRole_GetData_FromDB(userRole, login_id) {
  // console.log(req);
  if (userRole.type_name === "Manager") {
    const menuData = await getMenu(userRole.type_name);
    const userInfo = await Database.Managers.findOne({
      attributes: {
        exclude: [
          "man_isDeleted",
          "man_isPaused",
          "login_id",
          "updateTimestamp",
        ],
      },
      where: {
        login_id,
        man_isDeleted: 0,
        man_isPaused: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error("Error fetching Manager Data");
        console.trace(error);
        return null;
      }
    });
    return { menuData, userInfo };
  }
  if (userRole.type_name === "SuperVisor") {
    const menuData = await getMenu(userRole.type_name);
    const userInfo = await Database.Supervisor.findOne({
      attributes: {
        exclude: [
          "sup_isDeleted",
          "sup_isPaused",
          "login_id",
          "updateTimestamp",
        ],
      },
      where: {
        login_id,
        sup_isPaused: 0,
        sup_isDeleted: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error("Error fetching SuperVisor Data");
        console.trace(error);
        return null;
      }
    });
    return { menuData, userInfo };
  }
  if (userRole.type_name === "Team Lead") {
    const menuData = await getMenu(userRole.type_name);
    const userInfo = await Database.Team_Lead.findOne({
      attributes: {
        exclude: ["team_L_isDeleted", "team_L_isPaused", "updateTimestamp"],
      },
      where: {
        login_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error("Error fetching Team Lead Data");
        console.trace(error);
        return null;
      }
    });
    return { menuData, userInfo };
  }
  if (userRole.type_name === "Freelance Field Executive") {
    const menuData = await getMenu(userRole.type_name);
    const userInfo = await Database.Field_Executive.findOne({
      attributes: {
        exclude: [
          "updateTimestamp",
          "field_isDeleted",
          "field_isPaused",
          "login_id",
        ],
      },
      where: {
        login_id,
        salaryStatus: 0,
        field_isDeleted: 0,
        field_isPaused: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error("Error fetching Freelance Field Executive Data");
        console.trace(error);
        return null;
      }
    });
    return { menuData, userInfo };
  }
  if (userRole.type_name === "Field Executive") {
    const menuData = await getMenu(userRole.type_name);
    const userInfo = await Database.Field_Executive.findOne({
      attributes: {
        exclude: [
          "updateTimestamp",
          "field_isDeleted",
          "field_isPaused",
          "login_id",
        ],
      },
      where: {
        login_id,
        salaryStatus: 1,
        field_isDeleted: 0,
        field_isPaused: 0,
      },
    }).catch((error) => {
      if (error) {
        console.error("Error fetching Field Executive Data");
        console.trace(error);
        return null;
      }
    });
    return { menuData, userInfo };
  }
}

// -------------------------- Getting permissions from the DB -------------------------------------
const getMenu = async (roleName) => {
  return await Database.Permissions.findAll({
    attributes: ["permission_name", "controller", "icon"],
    include: {
      model: Database.User_Role,
      attributes: [],
      where: {
        type_name: roleName,
        paused: 0,
        deleted: 0,
      },
    },
    where: {
      paused: 0,
      d_deleted: 0,
    },
  }).catch((error) => {
    if (error) {
      console.error("Error fetching Permissions Data");
      console.trace(error);
      return null;
    }
  });
};

function create_UUID() {
  var dt = new Date().getTime();
  var uuid = "xxxxxxxx4xxxyxxx".replace(/[xy]/g, function (c) {
    var r = (dt + Math.random() * 16) % 16 | 0;
    dt = Math.floor(dt / 8);
    return (c == "x" ? r : (r & 0x3) | 0x8).toString(32);
  });
  return uuid;
}

const getAlgorithm = (keyBase64) => {
  var key = Buffer.from(keyBase64, "base64");
  switch (key.length) {
    case 16:
      return "aes-128-cbc";
    case 32:
      return "aes-256-cbc";
  }

  throw new Error("Invalid key length: " + key.length);
};

const encrypt = (plainText, keyBase64, ivBase64) => {
  const key = Buffer.from(keyBase64, "base64");
  const iv = Buffer.from(ivBase64, "base64");

  const cipher = crypto.createCipheriv(getAlgorithm(keyBase64), key, iv);
  let encrypted = cipher.update(plainText, "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
};

// const decrypt = (messagebase64, keyBase64, ivBase64) => {
//   const key = Buffer.from(keyBase64, "base64");
//   const iv = Buffer.from(ivBase64, "base64");

//   const decipher = crypto.createDecipheriv(getAlgorithm(keyBase64), key, iv);
//   let decrypted = decipher.update(messagebase64, "base64");
//   decrypted += decipher.final();
//   return decrypted;
// };
