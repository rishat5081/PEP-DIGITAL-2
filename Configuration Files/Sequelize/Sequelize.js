const Sequelize = require("sequelize");
require("dotenv").config();

// Option 2: Passing parameters separately (other dialects)
// const databaseName = require('../../app')

module.exports = new Sequelize(
  // "aksjd",
  process.env.db,
  process.env.db_user,
  process.env.db_password,
  {
    host: process.env.host_db,
    // host: "webs16rdns1.futuresouls.com",
    dialect: "mysql",
    timezone: "+05:00",
    port: process.env.db_port,
    logging: false,
    benchmark: true,
    omitNull: true,
    protocol: false,

    pool: {
      max: 10,
      min: 3,
      idle: 10000, //The maximum time, in milliseconds, that a connection can be idle before being released.
      acquire: 5000000, //The maximum time, in milliseconds, that pool will try to get connection before throwing error
      evict: 100000, // The time interval, in milliseconds, after which sequelize-pool will remove idle connections.
    },
    define: {
      underscored: false,
      freezeTableName: true,
      // don't forget to enable timestamps!
      timestamps: true,
      // I don't want createdAt
      createdAt: true,
      // I want updatedAt to actually be called updateTimestamp
      updatedAt: "updateTimestamp",
      charset: "utf8",
      dialectOptions: {
        collate: "utf8_general_ci",
      },
    },

    // retry: {
    //   match: [
    //     /ETIMEDOUT/,
    //     /EHOSTUNREACH/,
    //     /ECONNRESET/,
    //     /ECONNREFUSED/,
    //     /ETIMEDOUT/,
    //     /ESOCKETTIMEDOUT/,
    //     /EHOSTUNREACH/,
    //     /EPIPE/,
    //     /EAI_AGAIN/,
    //     /SequelizeConnectionError/,
    //     /SequelizeConnectionRefusedError/,
    //     /SequelizeHostNotFoundError/,
    //     /SequelizeHostNotReachableError/,
    //     /SequelizeInvalidConnectionError/,
    //     /SequelizeConnectionTimedOutError/,
    //   ],
    //   max: 5,
    // },
  }
);

// sequelize.query(`select list_name from lists l where l.list_id not in
// (SELECT sub.list_id from list_sub_activities sub left join.
//  Activities a on a.list_act_id = sub.list_act_id where a.agency_id = 2)`)
//   .then((response) => {
//     console.log(response);
//     // if (response)
//     //   for (const iterator of response) {
//     //     console.log(iterator.dataValues)
//     //   }
//   })
