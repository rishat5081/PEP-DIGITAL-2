// const { { DataTypes, Model, UUIDV4 }, Model } = require("sequelize");
// const sequelize = require("../../Sequelize");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Carrier_Logs extends Model {}

  Carrier_Logs.init(
    {
      carrier_logs_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      carrier_logs_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      update_date_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      c_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      c_type: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      c_Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      c_added_DateTime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Carrier_Logs",
      tableName: "carriers_logs"
    }
  );

  //Carrier_Logs.sync({ force: true }).then(re => //console.log(re))

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Carrier_Logs === sequelize.models.Carrier_Logs)
  // module.exports = Carrier_Logs;
  return Carrier_Logs;
};
