// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Manager = require("../Stakeholders/Manager");
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class ManagerLogin extends Model {}

  ManagerLogin.init(
    {
      manager_login_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      manager_login_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      loggedInStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      loggedOutStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      loggedOutDate: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      ipAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      man_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "managers",
          key: "man_id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "ManagerLogin",
      tableName: "managerlogin",
    }
  );

  ManagerLogin.associate = (models) => {
    /**
     * One Manager table will have many notifications
     */
    models.Managers.hasMany(ManagerLogin, {
      foreignKey: "man_id",
    });

    ManagerLogin.belongsTo(models.Managers, {
      targetKey: "man_id",
      foreignKey: "man_id",
    });
  };

  // /**
  //  * One Manager table will have many notifications
  //  */
  // Manager.hasMany(ManagerLogin, {
  //   foreignKey: "man_id"
  // });

  // ManagerLogin.belongsTo(Manager, {
  //   targetKey: "man_id",
  //   foreignKey: "man_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Packages === sequelize.models.Packages)
  // module.exports = ManagerLogin;
  return ManagerLogin;
};
