"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  // const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
  //   sequelize = require("../../Sequelize"),
  //   Super_Admin = require("../Stakeholders/Super_Admin"),
  //   User_Role = require("../Users Login/User_Role");

  class WebAds extends Model {}

  WebAds.init(
    {
      WebAds_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      WebAds_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      picPath: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "super_admin",
          key: "sa_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      user_role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "user_login_role",
          key: "user_role_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "WebAds",
      tableName: "webads",
    }
  );

  //   Super_Admin.hasOne(WebAds, {
  //     foreignKey: "sa_id"
  //   });

  //   WebAds.belongsTo(Super_Admin, {
  //     targetKey: "sa_id",
  //     foreignKey: "sa_id"
  //   });

  //   User_Role.hasOne(WebAds, {
  //     foreignKey: "user_role_id"
  //   });

  //   WebAds.belongsTo(User_Role, {
  //     targetKey: "user_role_id",
  //     foreignKey: "user_role_id"
  //   });

  WebAds.associate = (models) => {
    models.Super_Admin.hasOne(WebAds, {
      foreignKey: "sa_id",
    });

    WebAds.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id",
    });

    models.User_Role.hasOne(WebAds, {
      foreignKey: "user_role_id",
    });

    WebAds.belongsTo(models.User_Role, {
      targetKey: "user_role_id",
      foreignKey: "user_role_id",
    });
  };

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(User_Login_Information === sequelize.models.User_Login_Information)
  // module.exports = WebAds;
  return WebAds;
};

// WebAds.sync({ force: true })
//     .then(a => console.info(a))
