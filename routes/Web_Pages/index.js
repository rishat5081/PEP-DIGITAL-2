var express = require("express"),
  router = express.Router(),
  {
    Login_Page,
    Web_Content,
    SignUp_Page,
  } = require("../../Configuration Files/Sequelize/Database_Synchronization");
require("dotenv").config();
/**
 * this middle ware is used when the user is logged and
 * all those routes which need the authenticated user to use
 * then this middleware will help those  user
 * who are logged in into the session then they will be directed to those pages
 */

const isUser_Login = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else res.redirect("/login");
};

/**
 * All those pages which did not require user to log in
 * Like login page, web pages , home page, about us page
 */

const isUser_Not_Login = (req, res, next) => {
  if (req.session.passport) {
    next();
  } else {
    res.locals.user = "User Not Logged In";
    next();
  }
};

/* GET home page. */

router.get("/", isUser_Not_Login, function (req, res, next) {
  let dbResponse = Web_Content.findOne({
    attributes: {
      exclude: [
        "paused",
        "deleted",
        "sa_id",
        "createdAt",
        "updateTimestamp",
        "web_content_id",
        "web_content_uuid",
      ],
    },
    limit: 1,
    raw: true,
    where: {
      paused: 0,
    },
  })
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return null;
    });

  dbResponse.then((response) => {
    if (!response) {
      res.status(404).send("Error in Login Page");
    } else {
      // console.log(response)
      res.render("Web Pages/index", {
        response,
      });
    }
  });
});

/**
 * Setting the route for the Login Page
 */

router.get("/login", isUser_Not_Login, (req, res, next) => {
  /**
   * Getting the
   * login page information
   * and returning it to the variable
   */

  let dbResponse = Login_Page.findOne({
    attributes: [
      "loginTitle",
      "btnText",
      "forgetText",
      "forgetEmail",
      "forgetPassword",
      "createAccountText",
      "createAccountIcon",
      "emailPlaceHolder",
      "emailIcon",
      "passwordPlaceHolder",
      "passwordIcon",
      "pictureName",
      "pictureFolder",
    ],
    where: {
      paused: 0,
      deleted: 0,
    },
  })
    .then((doneDB) => {
      return doneDB;
    })
    .catch((error) => {
      res.status(404).render("error", { error });
    });

  /**
   * Ful filling the promise
   */
  dbResponse
    .then((dbData) => {
      if (!dbData) {
        res.status(404).render("error", { error: "No Data Found" });
      } else {
        res.status(200).render("Web Pages/login", { dbData });
      }
    })
    .catch((error) => {
      res.status(404).render("error", { error });
    });
  dbResponse = null;
});

// for( let key in SignUp_Page.rawAttributes ){
//   console.log('"'+key+'"', ","); // this is name of the field
// }

/**
 * Setting the route for the Sign Up Page
 */

router.get("/signup", isUser_Not_Login, function (req, res, next) {
  /**
   * Let the SignUp page to get all the text from the database
   */
  let dbResponse = SignUp_Page.findOne({
    attributes: [
      "signUpTitle",
      "btnText",
      "alreadyHaveAccount",
      "alreadyHaveAccountIcon",
      "emailPlaceHolder",
      "emailIcon",
      "passwordPlaceHolder",
      "passwordIcon",
      "confirmPasswordPlaceHolder",
      "confirmPasswordIcon",
      "pictureFolder",
      "pictureName",
    ],
    where: {
      paused: 0,
      deleted: 0,
    },
  })
    .then((db) => {
      return db;
    })
    .catch((error) => {
      res.status(404).render("error", { error });
    });

  dbResponse.then((dbData) => {
    if (!dbData) {
      res.status(404).render("error", { error: "No Data Found" });
    }
    /**
     * getting this error from sign up controller
     * when there is any happened wrong at controller a session property will be set
     * and then here it will print out the message
     */
    if (req.session.SignUp_Error) {
      console.log(
        req.session.SignUp_Error.type + req.session.SignUp_Error.message
      );
      res.status(200).render("Web Pages/signup", {
        message: req.flash(
          req.session.SignUp_Error.type,
          req.session.SignUp_Error.message
        ),
        dbData,
      });
      delete req.session.SignUp_Error;
    } else {
      res.status(200).render("Web Pages/signup", { dbData });
    }
  });
  dbResponse = null;
});

//console.log(new Date(Date.now() + 1000 * 60 * 60 * 24 * 7 * 4))

// setInterval(()=> console.log('Date'),1000)

/**
 * Temp testing do not bother it
 *
 */

router.get("/error", isUser_Not_Login, function (req, res, next) {
  console.log(req.session.serverRounting);
  delete req.session.serverRounting;
  console.log(req.session.serverRounting);
  res.status(200).render("Web Appendage Pages/error");
});

router.get("/email", isUser_Not_Login, function (req, res, next) {
  res.status(200).render("Web Appendage Pages/email_template", {
    logo: process.env.logoURL,
    emailSubject: "Saad",
    userEmail: "saad",
    jsonWebToken: "saad",
  });
});

router.get("/eman", isUser_Not_Login, function (req, res, next) {
  // console.log(response)
  res.render("Web Pages/editManagers", {
    url: req.protocol + "//" + req.get("host"),
  });
});
router.get("/mzone", isUser_Not_Login, function (req, res, next) {
  // console.log(response)
  res.render("Web Pages/ManageZones");
});

router.get("/cprom", isUser_Not_Login, function (req, res, next) {
  // console.log(response)
  res.render("Web Pages/CompanyPromotions");
});
router.get("/mdep", isUser_Not_Login, function (req, res, next) {
  // console.log(response)
  res.render("Web Pages/manageDepartments");
});
router.get("/pprom", isUser_Not_Login, function (req, res, next) {
  // console.log(response)
  res.render("Web Pages/PreviousPromotions");
});

module.exports = { router, isUser_Not_Login, isUser_Login };
