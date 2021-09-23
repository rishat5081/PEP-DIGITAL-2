const passport = require("passport"),
  LocalStrategy = require("passport-local").Strategy,
  DataBase = require("../Sequelize/Database_Synchronization"),
  User_Role = require("../Sequelize/Sequelize Models/Users Login/User_Role"),
  bcrypt = require("bcrypt");

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  return done(null, id);
  // User_Login_Information.findOne({
  //   include: {
  //     model: User_Role,
  //     foreignKey: User_Login_Information.user_role_id,
  //     attributes: ['type_name']
  //   },
  //   attributes: ['login_email', 'createdAt',],
  //   where: {
  //     login_uuid: id.userInfo.login_uuid,
  //     deleted: 0
  //   }
  // }).then(response => { return done(null, response) })
  // console.log('Deserilize')
});

passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "user_login_email",
      passwordField: "user_login_password",
      passReqToCallback: true
    },
    authenticate_login
  )
);

function authenticate_login(req, email, password, done) {
  // bcrypt.compareSync(password, '$2b$10$IhwmSCZDgheT3pCvaTd4YezxKSXPgXnS84r6HKXI.56uXawidQ8Ee')

  const User_Login_Info = DataBase.User_Login_Information.findOne({
    include: {
      model: DataBase.User_Role,
      attributes: ["user_role_id", "type_name"]
    },
    attributes: [
      "login_id",
      "login_email",
      "login_uuid",
      "login_password",
      "verified",
      "paused",
      "createdAt",
      "deleted"
    ],
    where: {
      login_email: email,
      deleted: 0
    }
  })
    .then((response) => {
      return response;
    })
    .catch((error) =>
      done(null, false, req.flash("danger", "In-Correct Email !!! Try Again. "))
    );

  User_Login_Info.then((dbResponse) => {
    if (!dbResponse) {
      return done(null, false, req.flash("danger", "No User Found"));
    }
    if (!bcrypt.compareSync(password, dbResponse.dataValues.login_password)) {
      return done(
        null,
        false,
        req.flash("danger", "In-Correct Password !!! Try Again. ")
      );
    } else if (dbResponse.dataValues.paused) {
      console.log("Error");
      return done(
        null,
        false,
        req.flash(
          "danger",
          "You are not allow to use this Website, \n Please Connect your Team Lead."
        )
      );
    } else {
      return done(null, {
        userInfo: {
          login_id: dbResponse.login_id,
          login_uuid: dbResponse.login_uuid,
          verified: dbResponse.verified,
          paused: dbResponse.paused
        },
        userRole: dbResponse.User_Role.dataValues
      });
    }
  });
}

// var tokens = {}

// function consumeRememberMeToken(token, fn) {
//   var uid = tokens[token]
//   console.log(tokens[token]);
//   console.log(uid);
//   // invalidate the single-use token
//   delete tokens[token]
//   return fn(null, uid)
// }

// function saveRememberMeToken(token, uid, fn) {
//   console.log("ahdbasdbhkaskdh ::::::::::::", uid)
//   tokens[token] = uid
//   return fn()
// }

// function issueToken(user, done) {
//   var token = utils.randomString(64)
//   saveRememberMeToken(token, user.id, function (err) {
//     if (err) {
//       return done(err)
//     }
//     return done(null, token)
//   })
// }

// function remener() {
//   // Remember Me cookie strategy
//   //   This strategy consumes a remember me token, supplying the user the
//   //   token was originally issued to.  The token is single-use, so a new
//   //   token is then issued to replace it.
//   passport.use(new RememberMe_Strategy(function (token, done) {

//     consumeRememberMeToken(token, function (err, uid) {
//       if (err) {
//         return done(err)
//       }
//       if (!uid) {
//         return done(null, false)
//       }

//       findById(uid, function (err, user) {
//         if (err) {
//           return done(err)
//         }
//         if (!user) {
//           return done(null, false)
//         }
//         return done(null, user)
//       })
//     })
//   }, issueToken)
//   )
// }

module.exports = passport;
