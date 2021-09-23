// 'use strict'
// const { { DataTypes, Model, UUIDV4 }, UUIDV4 } = require('sequelize')
// const sequelize = require('../../Sequelize')

"use strict";
module.exports = (sequelize, { DataTypes,  UUIDV4 }) => {
  const Super_Admin = sequelize.define(
    "Super_Admin",
    {
      sa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      sa_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      sa_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sa_email: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sa_password: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sa_contact: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sa_profile_pic: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Super_Admin",
      tableName: "super_admin"
    }
  );

  //Super_Admin.sync({ force: true }).then(re => //console.log(re))

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Super_Admin === sequelize.models.Super_Admin)
  // module.exports = Super_Admin
  return Super_Admin;
};
