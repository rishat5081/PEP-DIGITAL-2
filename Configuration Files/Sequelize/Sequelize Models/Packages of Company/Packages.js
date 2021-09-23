// 'use strict'
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require('sequelize')
// const sequelize = require('../../Sequelize')

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Packages extends Model {}

  Packages.init(
    {
      pack_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      pack_uuid: {
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
      pack_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pack_type: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      pack_amount: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Packages",
      tableName: "packages"
    }
  );

  /**
   * No relationships in this table
   */

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Packages === sequelize.models.Packages)
  // module.exports = Packages
  return Packages;
};
