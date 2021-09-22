"use strict"
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize");

class AgencyLogs_Supervisor extends Model {}

AgencyLogs_Supervisor.init(
  {
    AgencyLogs_Sup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    AgencyLogs_Sup_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false
    },
    previousDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    nowDeletedStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    previousPaused: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    nowPausedStatus: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    paused: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    agency_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "agency_info",
        key: "agency_id"
      }
    },
    sup_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "supervisor",
        key: "sup_id"
      }
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: "AgencyLogs_Supervisor",
    tableName: "AgencyLogs_Supervisor"
  }
);

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(AgencyLogs_Supervisor === sequelize.models.AgencyLogs_Supervisor)
// AgencyLogs_Supervisor.sync({ force: true }).then((e) => {
//   console.log(e);
// });

module.exports = AgencyLogs_Supervisor;
