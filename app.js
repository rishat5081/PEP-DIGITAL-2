const { userInfo } = require("os");
const Sequelize = require("sequelize");
const { sequelize } = require("./Configuration Files/Sequelize/Sequelize Models/Lists of Packages/Activities");
const Activities = require("./Configuration Files/Sequelize/Sequelize Models/Lists of Packages/Activities");
const Op = Sequelize.Op,
  express = require("express"),
  app = express(),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  session = require("express-session"),
  passport = require("passport"),
  flash = require("connect-flash"),
  mysql = require("mysql"),
  bodyparser = require("body-parser"),
  open = require("open"),
  server = require("http").createServer(app),
  io = require("socket.io")(server),
  passportJs_File = require("./Configuration Files/Passport Js/passport"),
  {
    Synchronizing,
    User_Login_Information,
    User_Role,
    Supervisor,
    Team_Lead,
    Field_Executive,
    Menu_Manager_Assosiate,
    Super_Admin,
    SignUp_Page,
    Login_Page,
    Web_Content,
    Companies_Access,
    GM_Company,
    Zone,
    Department,
    Permissions,
    Managers,
    City,
    City_and_Supervisor_associate,
    City_Areas,
    Permission_Role_Assosiate,
    DevelopmentDatabase,
    ExecutiveLogins,
    GMLogin,
    ManagerLogin,
    SuperVisorLogin,
    TeamLead_Login,
    Compaigns,
  } = require("./Configuration Files/Sequelize/Database_Synchronization");
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
    httpOnly: true,
  })
);


//setInterval(() => console.log("sa"), 1000 * 60 * 24 * 7)

app.use(bodyparser.json());

app.use(
  session({
    saveUninitialized: false,
    secret: "VOIP Call Center",
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

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

// ------------------------------Controller for Team Lead-------------------------------
require("./Controller/Field Executive/fieldExecutive_Controls")(app);

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
//Synchronizing();

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
    failureFlash: true,
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
          uuid: req.user.userInfo.login_uuid,
        });
      }
      if (req.user.userInfo.paused) {
        res.status(200).render("Web Appendage Pages/error", {
          errorStatus: "Temparary Block",
          errorHeading: `You have been temporarily block. 
                         In order to get your profile back. 
                         Contact your superiors. 
                         `,
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
    .then((profileInfo) => {
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
          update_permission: element.dataValues.update_permission,
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

      if (req.user.userRole.type_name === "SuperVisor") {
        if (profileInfo.userInfo.dataValues.sup_name !== null || '') {
          SuperVisorLogin.create({
            ipAddress: req.ip,
            sup_id: profileInfo.userInfo.dataValues.sup_id,
          });
          res
            .status(200)
            .redirect(
              `/supervisor/Dashboard/${profileInfo.userInfo.dataValues.sup_uuid}`
            );
        } else {
          SuperVisorLogin.create({
            ipAddress: req.ip,
            sup_id: profileInfo.userInfo.dataValues.sup_id,
          });
          res
            .status(200)
            .redirect(
              `/supervisor/completeProfile/${profileInfo.userInfo.dataValues.sup_uuid}`
            );
        }
      }
      if (req.user.userRole.type_name === "Team Lead" || '') {
        if (profileInfo.userInfo.dataValues.team_L_name !== null) {
          TeamLead_Login.create({
            ipAddress: req.ip,
            team_L_id: profileInfo.userInfo.dataValues.team_L_id,
          });
          res
            .status(200)
            .redirect(
              `/teamlead/Dashboard/${profileInfo.userInfo.dataValues.team_L_uuid}`
            );
        } else {
          TeamLead_Login.create({
            ipAddress: req.ip,
            team_L_id: profileInfo.userInfo.dataValues.team_L_id,
          });
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
        if (profileInfo.userInfo.dataValues.field_name !== null) {
          ExecutiveLogins.create({
            ipAddress: req.ip,
            field_id: profileInfo.userInfo.dataValues.field_id,
          });
          res
            .status(200)
            .redirect(
              `/user/dashboard/${profileInfo.userInfo.dataValues.field_uuid}`
            );
        } else {
          ExecutiveLogins.create({
            ipAddress: req.ip,
            field_id: profileInfo.userInfo.dataValues.field_id,
          });
          res
            .status(200)
            .redirect(
              `/user/completeProfile/${profileInfo.userInfo.dataValues.field_uuid}`
            );
        }
      }
    })
    .catch((error) => {
      res.status(200).render("Web Appendage Pages/error", {
        errorStatus: "Internal Error",
        errorHeading: `Sorry!Your Profile is not available`,
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
    signed: isDev ? false : true,
  });
}

async function checkRole_GetData_FromDB(userRole, login_id) {
  // console.log(req);
  if (userRole.type_name === "SuperVisor") {
    const menuData = await getMenu(userRole.type_name);
    const userInfo = await Supervisor.findOne({
      attributes: {
        exclude: [
          "sup_isDeleted",
          "sup_isPaused",
          "login_id",
          "createdAt",
          "updateTimestamp",
        ],
      },
      where: {
        login_id,
        sup_isPaused: 0,
        sup_isDeleted: 0,
      },
    });
    return { menuData, userInfo };
  }
  if (userRole.type_name === "Team Lead") {
    const menuData = await getMenu(userRole.type_name);
    const userInfo = await Team_Lead.findOne({
      attributes: {
        exclude: [
          "team_L_isDeleted",
          "team_L_isPaused",
          "createdAt",
          "updateTimestamp",
        ],
      },
      where: {
        login_id,
        team_L_isDeleted: 0,
        team_L_isPaused: 0,
      },
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
          "login_id",
        ],
      },
      where: {
        login_id,
        salaryStatus: 0,
        field_isDeleted: 0,
        field_isPaused: 0,
      },
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
          "login_id",
        ],
      },
      where: {
        login_id,
        salaryStatus: 1,
        field_isDeleted: 0,
        field_isPaused: 0,
      },
    });
    return { menuData, userInfo };
  }
}

const getMenu = async (roleName) => {
  return await Permissions.findAll({
    attributes: {
      exclude: [
        "permmission_id",
        "paused",
        "d_deleted",
        "createdAt",
        "updateTimestamp",
        "User_Roles",
      ],
    },
    include: {
      model: User_Role,
      attributes: ["user_role_uuid", "type_name"],
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
  });
};

/**
 * Password of saad: $2b$10$WfgW1aVsxJOZ1tD.yMRSBuHFPl9NtHyiJJJSGRUt4EgbC5hEp1P1G
 */

// const password = "saad";
// const bcrypt = require("bcrypt");
// bcrypt.hash("saad", 10, (err, rse) => console.log(rse));
// const tru = bcrypt.compareSync(password, '$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee')
// console.log(tru)

/**
 * Practice work below---------------------------------
 */

// ;(async () => {
//   // await open('unicorn.png', { wait: true })
//   console.log('Setting Up Database \n')
//   if (databaseName) {
//     console.log('Connecting the Database')
//   } else {
//     console.log('No Database is selected')
//     await open('http://localhost:7854/setDatabase_For_SuperAdmin_Only_xx_xx_1')
//   }
//   // await open('http://localhost:7854/abccc')
//   // // Opens the url in the default browser
//   // await open('https://sindresorhus.com')

//   // // Specify the app to open in
//   // await open('https://sindresorhus.com', { app: 'firefox' })

//   // // Specify app arguments
//   // await open('https://sindresorhus.com', {
//   //   app: ['google chrome', '--incognito']
//   // })
// })()

//require('./Configuration Files/Sequelize/Sequelize')

// if (databaseName === '') {
//   let readline = require('readline'),
//     dbName = '',
//     rl = readline.createInterface({
//       input: process.stdin,
//       output: process.stdout
//     })
//   let condition = true

//   rl.question('Enter Your Database Name:  ', function (DBname) {
//     dbName = DBname
//     getDatabases(dbName)
//     //rl.close()
//   })

//   rl.on('close', function () {
//     console.log('\nWait Please')
//     process.exit(0)
//   })
// }

server.listen(process.env.server_PORT, () => {
  console.log(`\x1b[42m--------------------------------------\x1b[0m`);
  console.log(
    `\n \x1b[32m Node Server Listening at: ${process.env.server_PORT}\n \x1b[0m`
  );
  console.log(`\x1b[42m--------------------------------------\x1b[0m\n`);
});


// setInterval(()=>{
//     console.log("Hello")
// },1000)




// const getAllCustomerEarnings = async () => {
//   return await Activities.findAll({
//     attributes: [
//       // 'list_act_id',
//       [sequelize.fn('YEAR', sequelize.col('createdAt')), 'Year'],
//       [sequelize.fn('MONTH', sequelize.col('createdAt')), 'Month'],
//     ],
//     group: ['Year', 'Month']
//   })
//     .then(d => {
//       console.log(d);
//     })
// }

// console.log(getAllCustomerEarnings());

// const request = require('request');

// const options = {
//   method: 'POST',
//   url: 'https://api.eu-de.apiconnect.appdomain.cloud/tariqqaisertelenorbankpk-tmbdev/dev-catalog/utilities/GetBanks',
//   headers: {
//     'X-IBM-Client-Id': '6e93a157-7a78-4514-8819-53ca430632fa',
//     'X-IBM-Client-Secret': 'yN4mY4lK1fG1rS6eL8cW1aH5uT0tG6yM0pP7vO0vP4bB2iF6jH',
//     'X-Channel': 'subgateway',
//     accept: 'application/json'
//   }
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });