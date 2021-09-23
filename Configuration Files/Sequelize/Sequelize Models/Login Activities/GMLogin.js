// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   GM_Company = require("../Stakeholders/GM_Company");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class GMLogin extends Model {}

  GMLogin.init(
    {
      gm_Company_login_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      gm_Company_login_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      loggedInStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      loggedOutStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      loggedOutDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null
      },
      ipAddress: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      gm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "company_gm_info",
          key: "gm_id"
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "GMLogin",
      tableName: "gmLogin"
    }
  );

  GMLogin.associate = (models) => {
    /**
     * One Manager table will have many notifications
     */
    models.GM_Company.hasMany(GMLogin, {
      foreignKey: "gm_id"
    });

    GMLogin.belongsTo(models.GM_Company, {
      targetKey: "gm_id",
      foreignKey: "gm_id"
    });
  };

  // /**
  //  * One Manager table will have many notifications
  //  */
  // GM_Company.hasMany(GMLogin, {
  //   foreignKey: "gm_id"
  // });

  // GMLogin.belongsTo(GM_Company, {
  //   targetKey: "gm_id",
  //   foreignKey: "gm_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Packages === sequelize.models.Packages)
  // module.exports = GMLogin;
  return GMLogin;
};
