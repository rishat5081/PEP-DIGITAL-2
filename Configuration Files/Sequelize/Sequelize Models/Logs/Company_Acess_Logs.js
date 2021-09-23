// const { { DataTypes, Model, UUIDV4 }, Model } = require('sequelize')
// const sequelize = require('../../Sequelize')

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Company_Acess_Logs extends Model {}

  Company_Acess_Logs.init(
    {
      comp_acc_logs_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      comp_acc_logs_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      update_date_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      comp_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      comp_address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      comp_contact: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      access_Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      access_date_time: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Company_Acess_Logs",
      tableName: "comapny_access_logs"
    }
  );

  //Company_Acess_Logs.sync({ force: true }).then(re => //console.log(re))

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Company_Acess_Logs === sequelize.models.Company_Acess_Logs)
  // module.exports = Company_Acess_Logs
  return Company_Acess_Logs;
};
