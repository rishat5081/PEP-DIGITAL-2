const sequelize = require("./Sequelize");
//ab = require('../../Configuration Files/Sequelize/Sequelize Models/')

const connectionTo_DB = async () => {
  try {
    /**
     * Commented lines are used to sync the database tables
     * forcely and then check the foreign key true
     */
    // await sequelize
    //   .query('SET FOREIGN_KEY_CHECKS = 0', null, { raw: true })
    //   .then(response => console.log(response))
    // just get the tables here
    // ab.sync({ force: true }).then(res => console.log(res))
    // await sequelize
    //   .query('SET FOREIGN_KEY_CHECKS = 1', { raw: true })
    //   .then(response => console.log(response))

    await sequelize.authenticate();

    console.log(`\n\n\x1b[44m-------------------------------------\x1b[0m`);
    console.log("\n\n \x1b[34m Database Connected Successfully\x1b[0m \n\n");
    console.log(`\x1b[44m-------------------------------------\x1b[0m`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

module.exports = { connectionTo_DB };
