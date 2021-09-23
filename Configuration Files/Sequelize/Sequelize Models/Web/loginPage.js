// 'use strict'
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require('sequelize'),
//     sequelize = require('../../Sequelize'),
//     Super_Admin = require('../Stakeholders/Super_Admin')
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Login_Page extends Model {}

  Login_Page.init(
    {
      login_page_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      login_page_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      loginTitle: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      btnText: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      forgetText: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      forgetEmail: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      forgetPassword: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      createAccountText: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pictureName: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pictureFolder: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      createAccountIcon: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      emailPlaceHolder: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      emailIcon: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      passwordPlaceHolder: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      passwordIcon: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "super_admin",
          key: "sa_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Login_Page",
      tableName: "login_page"
    }
  );

  Login_Page.associate = (models) => {
    models.Super_Admin.hasOne(Login_Page, {
      foreignKey: "sa_id"
    });

    Login_Page.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id"
    });
  };

  //   Super_Admin.hasOne(Login_Page, {
  //     foreignKey: "sa_id"
  //   });

  //   Login_Page.belongsTo(Super_Admin, {
  //     targetKey: "sa_id",
  //     foreignKey: "sa_id"
  //   });
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(User_Login_Information === sequelize.models.User_Login_Information)
  // module.exports = Login_Page

  return Login_Page;
};
