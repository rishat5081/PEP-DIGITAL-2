// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class AgencyLogs_Supervisor extends Model {}

  AgencyLogs_Supervisor.init(
    {
      AgencyLogs_Sup_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      AgencyLogs_Sup_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      previousDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      nowDeletedStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      previousPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      nowPausedStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "agency_info",
          key: "agency_id",
        },
      },
      sup_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "supervisor",
          key: "sup_id",
        },
      },
      man_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "managers",
          key: "man_id",
        },
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "AgencyLogs_Supervisor",
      tableName: "agencylogs_supervisor",
    }
  );

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(AgencyLogs_Supervisor === sequelize.models.AgencyLogs_Supervisor)
  // AgencyLogs_Supervisor.sync({ force: true }).then((e) => {
  //   console.log(e);
  // });

  // module.exports = AgencyLogs_Supervisor;

  AgencyLogs_Supervisor.associate = (models) => {
    models.Supervisor.hasMany(AgencyLogs_Supervisor, { foreignKey: "sup_id" });

    AgencyLogs_Supervisor.belongsTo(models.Supervisor, {
      targetKey: "sup_id",
      foreignKey: "sup_id",
    });

    models.Managers.hasMany(AgencyLogs_Supervisor, { foreignKey: "man_id" });

    AgencyLogs_Supervisor.belongsTo(models.Managers, {
      targetKey: "man_id",
      foreignKey: "man_id",
    });

    // /**
    //  * which field executive have added this agency
    //  */
    models.Agency_Info.hasMany(AgencyLogs_Supervisor, {
      foreignKey: "agency_id",
    });

    AgencyLogs_Supervisor.belongsTo(models.Agency_Info, {
      targetKey: "agency_id",
      foreignKey: "agency_id",
    });
  };
  return AgencyLogs_Supervisor;
};
