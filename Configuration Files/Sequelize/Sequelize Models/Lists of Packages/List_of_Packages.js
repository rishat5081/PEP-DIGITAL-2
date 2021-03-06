// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize");
// const sequelize = require("../../Sequelize");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class List_of_Packages extends Model {}

  List_of_Packages.init(
    {
      list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      list_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      list_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      list_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      list_paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isBank: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      bankAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      commissionAmount: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      list_amount: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      list_description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isRepeat: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "List_of_Packages",
      tableName: "lists",
    }
  );

  /**
   * No relationship with other table
   */

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(List_of_Packages === sequelize.models.List_of_Packages)
  // module.exports = List_of_Packages;
  return List_of_Packages;
};
