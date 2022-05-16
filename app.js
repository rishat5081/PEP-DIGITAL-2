const Permission_Role_Assosiate = require("./Configuration Files/Sequelize/Sequelize Models/Permission/Permission_Role_Assosiate");
const Manager = require("./Configuration Files/Sequelize/Sequelize Models/Stakeholders/Manager");

const Sequelize = require("sequelize"),
  express = require("express"),
  app = express(),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  session = require("express-session"),
  passport = require("passport"),
  flash = require("connect-flash"),
  bodyparser = require("body-parser"),
  cors = require("cors"),
  server = require("http").createServer(app),
  io = require("socket.io")(server),
  passportJs_File = require("./Configuration Files/Passport Js/passport"),
  {
    User_Role,
    Supervisor,
    Team_Lead,
    Field_Executive,
    Permissions,
    ExecutiveLogins,
    SuperVisorLogin,
    Managers,
    ManagerLogin,
    TeamLead_Login
  } = require("./Configuration Files/Sequelize/Database_Synchronization"),
  {
    Synchronizing
  } = require("./Configuration Files/Sequelize/Database_Synchronization"),
  { corsOptionsDelegate } = require("./additional");
//setting the .env file to read the server port and database ports
require("dotenv").config();
/**
 * Setting the development mode
 * the enviornment of the sercer to development
 */
process.env.NODE_ENV = "development";
isDev = process.env.NODE_ENV === "development" ? true : false;
/**
 * view engine setup
 * setting the view of the server
 * like for the html and ejs files to the view folder
 */
app.set("views", [path.join(__dirname, "views")]);
//setting ejs as the view engine...
app.set("view engine", "ejs");

/***
 * express for the css and bootstrap files
 * images and etc
 */
app.use(express.static(__dirname + "/public"));

//setting the cors to use the server for the API
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (corsOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Access Denied"));
//       }
//     },
//   })
// );
/**
 * https://github.com/expressjs/session#user-content-cookiesecure:~:text=For%20using%20secure%20cookies%20in%20production%2C,setup%20based%20on%20NODE_ENV%20in%20express%3A
 * set the process.env.NODE_ENV to production when all the code is complete and read this
 * resave for the cookies it is confusing right now

*/

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1); // trust first proxy
  session.cookie.secure = true; // serve secure cookies
}

//setting the morgon for loggs
app.use(logger("dev"));

//setting the express session
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(
  cookieParser("PEP DIGITAL", {
    maxAge: new Date(Date.now() + 1000 * 60 * 60), // for seven days // 1 sec * seconds * minutes * total hours of day * num of days in week
    httpOnly: true
  })
);

// console.log(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7));
// setInterval(() => console.log("sa"), 1000 * 60 * 24 * 7)

app.use(bodyparser.json());

app.use(
  session({
    saveUninitialized: false,
    secret: "VOIP Call Center",
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7
    },
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.use("*", (req, res, next) => {
  console.log("User Connected from IP : ", req.ip);
  next();
});

// rishat.5081@gmail.com
// app.enable('trust proxy')
// app.use((req, res, next) => {
//   req.secure ? next() : res.redirect('http://' + req.headers.host + req.url)
// })

/****************************** Setting the routes for the WEB ****************************************/
//getting routes of the web application like about us, contact pages
//simple routing at / all the routes in the below file will be used at simple /

app.use(require("./routes/Web_Pages/index").router);

/**
 * Setting the routes for the User
 * Like for normal user Confirm email and resend email and other.....
 */

app.use(require("./routes/Web_Pages/users").router);

// ---------------------------------------- Start of Role Routes ------------------------------------------

/**
 * This one is for General Manager
 */
app.use("/gm", require("./routes/General Manager/generalManager").router);

/**
 * This one is for Manager
 */

app.use("/manager", require("./routes/Manager/managerRoutes").router);

/**
 * This one is for SuperVisor
 */

app.use("/supervisor", require("./routes/SuperVisor/superVisor_route").router);
/**
 * This one is for Team Lead
 */

app.use("/teamlead", require("./routes/Team Lead/team_Lead_route").router);

/**
 * This one is for Freelance and Field Executive
 */

app.use(
  "/user",
  require("./routes/Field Executive/field_Executive_route").router
);

/****************************** Controllers for all web **************************************
 * Here are the controller for all the web site
 * the files are set in a seperate folder /Controller/**for each user or for basic controller
 * the controller are set like for each user seperately in a seperate folder and file
 * each file is set as a module.export and haing a function with a parameter of app which will be passed
 * from this file
 * **/
require("./Controller/Web Basic Controls/webBasicController")(app);

// ------------------------------Controller for Team Lead-------------------------------
require("./Controller/Team Lead/teamLeadController")(app);

// ------------------------------Controller for Field Executive-------------------------------
require("./Controller/Field Executive/fieldExecutive_Controls")(app);

// ------------------------------Controller for Supervisor-------------------------------
app.use(require("./Controller/Supervisor/SupervisorController").router);

// ------------------------------Controller for Manager-------------------------------
app.use(require("./Controller/Manager/managerController").router);
/****************************** Connecting to the Database ****************************************/
/**Sequelize is using here
 * the Connect to DB is the async function
 * Then it will help
 */
require("./Configuration Files/Sequelize/DBConnection").connectionTo_DB();

/**
 * ------------------------------ IMPORTANNT ------------------------------
 *                          read the Important Note first
 * ------------------------------ IMPORTANNT ------------------------------
 */

//DevelopmentDatabase()

/****************************** Passport Js ****************************************/

/**
 * The Passport Js authentication
 * the authentication is done for all the users
 * field executive, team lead, supervisor, CSR
 * and then according to each role the page will be render
 */

app.post(
  "/LoginForm",
  passportJs_File.authenticate("local-login", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res, next) => {
    if (req.body.user_remember_me) {
      rememberMe_Cookies(res, req.session.passport.user.userInfo.login_uuid);
    }
    if (!req.user) res.send("Error").end();

    if (req.user) {
      if (!req.user.userInfo.verified) {
        res.status(200).render("Web Appendage Pages/confirmEmail", {
          message: req.flash("danger", "Please Verify your Email"),
          uuid: req.user.userInfo.login_uuid
        });
      }
      if (req.user.userInfo.paused) {
        res.status(200).render("Web Appendage Pages/error", {
          errorStatus: "Temparary Block",
          errorHeading: `You have been temporarily block.
                         In order to get your profile back.
                         Contact your superiors.
                         `
        });
      }
      if (req.user.userInfo.login_uuid) {
        next();
      }
    }
  }
);

app.post("/LoginForm", async (req, res) => {
  /**
   * Getting information of the user role and for it's profile
   * here is the function which will check the roles for only 4
   * roles Supervisor till his / her last decendent mean freelance field executive
   */

  console.log("************" + req.user.userRole.type_name + "************");

  const menuData = checkRole_GetData_FromDB(
    req.user.userRole,
    req.user.userInfo.login_id
  );

  /**
   * the data will be return which have the profile information
   * and the permissions which the user have
   * here we are solving all those promises
   */
  await menuData
    .then(profileInfo => {
      /**
       * Setting the user profile information into the .
       * sessions so we can use it to the userProfile route and
       * for where it is require we can fetch it from
       * sessions
       */

      /**
       * Now here the Permissions are resolved all those permission
       * which a user is allowed to
       */

      /**
       * Breaking the Permission Promise into the relevant permissions
       * because the structure of the promise is Permission along with the User_Role
       * here the user role is already present in the session from Passport
       * so eliminating the User Role
       */

      console.log("profileInfo :::", profileInfo);
      var permissionObject = [];
      profileInfo.menuData.forEach((element, index) => {
        let breakPermissions = {
          permmission_uuid: element.dataValues.permmission_uuid,
          permission_name: element.dataValues.permission_name,
          controller: element.dataValues.controller,
          icon: element.dataValues.icon,
          edit: element.dataValues.edit,
          delete_permission: element.dataValues.delete_permission,
          add_permission: element.dataValues.add_permission,
          update_permission: element.dataValues.update_permission
        };
        permissionObject[index] = breakPermissions;
        breakPermissions = null;
      });
      /**
       * Setting the user profile information into the session and also the
       * Permissions into the session
       */

      /**
       * Redirecting the user to the relevant route according to the user role
       */

      req.session.permissions = { permissionObject };
      req.session.profileData =
        profileInfo.userInfo !== null ? profileInfo.userInfo : null;

      if (req.user.userRole.type_name === "Manager") {
        //creating the login information of the Supervisor
        ManagerLogin.create({
          ipAddress: req.ip,
          man_id: profileInfo.userInfo.dataValues.man_id
        });
        if (profileInfo.userInfo.dataValues.man_name !== null || "")
          res
            .status(200)
            .redirect(
              `/manager/dashboard/${profileInfo.userInfo.dataValues.man_uuid}`
            );
        else
          res
            .status(200)
            .redirect(
              `/manager/completeProfile/${profileInfo.userInfo.dataValues.man_uuid}`
            );
      }

      if (req.user.userRole.type_name === "SuperVisor") {
        //creating the login information of the Supervisor
        SuperVisorLogin.create({
          ipAddress: req.ip,
          sup_id: profileInfo.userInfo.dataValues.sup_id
        });
        if (profileInfo.userInfo.dataValues.sup_name !== null || "") {
          console.log("----------------------------------------------");
          res
            .status(200)
            .redirect(
              `/supervisor/dashboard/${profileInfo.userInfo.dataValues.sup_uuid}`
            );
        } else {
          res
            .status(200)
            .redirect(
              `/supervisor/completeProfile/${profileInfo.userInfo.dataValues.sup_uuid}`
            );
        }
      }
      if (req.user.userRole.type_name === "Team Lead" || "") {
        //creating the login information of the team lead
        TeamLead_Login.create({
          ipAddress: req.ip,
          team_L_id: profileInfo.userInfo.dataValues.team_L_id
        });

        if (profileInfo.userInfo.dataValues.team_L_name !== null) {
          res
            .status(200)
            .redirect(
              `/teamlead/dashboard/${profileInfo.userInfo.dataValues.team_L_uuid}`
            );
        } else {
          res
            .status(200)
            .redirect(
              `/teamlead/completeProfile/${profileInfo.userInfo.dataValues.team_L_uuid}`
            );
        }
      }

      if (
        req.user.userRole.type_name === "Field Executive" ||
        req.user.userRole.type_name === "Freelance Field Executive"
      ) {
        //creating the login information of the "Field Executive" || "Freelance Field Executive"

        ExecutiveLogins.create({
          ipAddress: req.ip,
          field_id: profileInfo.userInfo.dataValues.field_id
        });

        if (profileInfo.userInfo.dataValues.field_name !== null) {
          res
            .status(200)
            .redirect(
              `/user/dashboard/${profileInfo.userInfo.dataValues.field_uuid}`
            );
        } else {
          res
            .status(200)
            .redirect(
              `/user/completeProfile/${profileInfo.userInfo.dataValues.field_uuid}`
            );
        }
      }
    })
    .catch(error => {
      console.log(error);
      res.status(200).render("Web Appendage Pages/error", {
        errorStatus: "Sorry ! Your Profile is suspended. ",
        errorHeading: `Please Contact the Customer Support.`
      });
    });
});

function rememberMe_Cookies(res, uuid) {
  res.cookie("rememberme_PEP_Digital", uuid, {
    domain: `${process.env.domain}${process.env.server_PORT}/`,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 50),
    httpOnly: isDev ? true : false,
    maxAge: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 50),
    path: "/",
    secure: isDev ? false : true,
    signed: isDev ? false : true
  });
}

async function checkRole_GetData_FromDB(userRole, login_id) {
  // console.log(req);
  if (userRole.type_name === "Manager") {
    const menuData = await getMenu(userRole.type_name);
    const userInfo = await Managers.findOne({
      attributes: {
        exclude: [
          "man_isDeleted",
          "man_isPaused",
          "login_id",
          "updateTimestamp"
        ]
      },
      where: {
        login_id,
        man_isDeleted: 0,
        man_isPaused: 0
      }
    })
      .then(response => {
        if (response) return response;
        else return null;
      })
      .catch(error => {
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
    const userInfo = await Supervisor.findOne({
      attributes: {
        exclude: [
          "sup_isDeleted",
          "sup_isPaused",
          "login_id",
          "updateTimestamp"
        ]
      },
      where: {
        login_id,
        sup_isPaused: 0,
        sup_isDeleted: 0
      }
    })
      .then(response => {
        if (response) return response;
        else return null;
      })
      .catch(error => {
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
    const userInfo = await Team_Lead.findOne({
      attributes: {
        exclude: ["team_L_isDeleted", "team_L_isPaused", "updateTimestamp"]
      },
      where: {
        login_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0
      }
    })
      .then(response => {
        if (response) return response;
        else return null;
      })
      .catch(error => {
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
    const userInfo = await Field_Executive.findOne({
      attributes: {
        exclude: [
          "updateTimestamp",
          "field_isDeleted",
          "field_isPaused",
          "login_id"
        ]
      },
      where: {
        login_id,
        // salaryStatus: 0,
        field_isDeleted: 0,
        field_isPaused: 0
      }
    })
      .then(response => {
        if (response) return response;
        else return null;
      })
      .catch(error => {
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
    const userInfo = await Field_Executive.findOne({
      attributes: {
        exclude: [
          "updateTimestamp",
          "field_isDeleted",
          "field_isPaused",
          "login_id"
        ]
      },
      where: {
        login_id,
        // salaryStatus: 1,
        field_isDeleted: 0,
        field_isPaused: 0
      }
    })
      .then(response => {
        if (response) return response;
        else return null;
      })
      .catch(error => {
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
const getMenu = async roleName => {
  return await Permissions.findAll({
    attributes: ["permission_name", "controller", "icon"],
    include: {
      model: User_Role,
      attributes: ["user_role_uuid", "type_name"],
      where: {
        type_name: roleName,
        paused: 0,
        deleted: 0
      }
    },
    where: {
      paused: 0,
      d_deleted: 0
    }
  }).catch(error => {
    if (error) {
      console.error("Error fetching Permissions Data");
      console.trace(error);
      return null;
    }
  });
};

server.listen(3000, () => {
  console.log(`\x1b[42m--------------------------------------\x1b[0m`);
  console.log(`\n \x1b[32m Node Server Listening at: 3000 \n \x1b[0m`);
  console.log(`\x1b[42m--------------------------------------\x1b[0m\n`);
  console.log("Node Memory Status: ", process.memoryUsage());
});

// setInterval(() => {
//   console.log("Hello")
// }, 1000)

// ------------------------------------ API's -----------------------------------

app.use("/api", cors(corsOptionsDelegate), require("./API/Web/webAPI").router);
app.use(
  "/api/field",
  cors(corsOptionsDelegate),
  require("./API/Field Executive/field_API").router
);
app.use(
  "/api/teamlead",
  cors(corsOptionsDelegate),
  require("./API/Team Lead/teamLeadApi").router
);

// ------------------------------------ Redirecting if route does not found -----------------------------------

app.get("*", (req, res) => {
  res.redirect("/");
});
