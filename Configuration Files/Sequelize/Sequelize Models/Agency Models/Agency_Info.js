// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Field_Executive = require("../Stakeholders/Field_Executive"),
//   AgencyLogs_Supervisor = require("./AgencyLogs_Supervisor"),
//   Supervisor = require("../Stakeholders/Supervisor");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  const AgencyLogs_Supervisor = require("./AgencyLogs_Supervisor");
  class Agency_Info extends Model {}

  Agency_Info.init(
    {
      agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      agency_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      agency_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      agency_type: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      agency_Contact: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      agency_city: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      agency_address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      agency_Longitude: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      agency_Latitude: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      firstVisit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      agency_owner_Name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      contactedPerson: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      contactedPerson_Number: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      isPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,

        references: {
          model: "field_executive",
          key: "field_id"
        }
      }
    },
    {
      hooks: {
        afterUpdate: async (AgencyInfo, options) => {
          await AgencyLogs_Supervisor.create({
            previousDeleted: AgencyInfo._previousDataValues.deleted,
            nowDeletedStatus: AgencyInfo.getDataValue("deleted"),
            previousPaused: AgencyInfo._previousDataValues.isPaused,
            nowPausedStatus: AgencyInfo.getDataValue("isPaused"),
            agency_id: AgencyInfo.getDataValue("agency_id"),
            sup_id: options.sup_id
          })
            .then((log) => {
              console.log("SuperVisor Updated the Agency !!!!");
            })

            .catch((error) => {
              console.error("Error : SuperVisor Updated the Agency !!!!");
            });
        }
      },
      sequelize,
      // We need to pass the connection instance
      modelName: "Agency_Info",
      tableName: "agency_info"
    }
  );

  Agency_Info.associate = (models) => {
    /**
     * which field executive have added this agency
     */
    models.Field_Executive.hasMany(Agency_Info, { foreignKey: "field_id" });

    Agency_Info.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });

    /*
     *boolean return type which will indicate that the table is defined or not
     */
    //console.log(Agency_Info === sequelize.models.Agency_Info)

    /**
     * which field executive have added this agency
     */
   

 
  };

  // /**
  //  * which field executive have added this agency
  //  */
  // Field_Executive.hasMany(Agency_Info, { foreignKey: "field_id" });

  // Agency_Info.belongsTo(Field_Executive, {
  //   targetKey: "field_id",
  //   foreignKey: "field_id"
  // });

  // /*
  //  *boolean return type which will indicate that the table is defined or not
  //  */
  // //console.log(Agency_Info === sequelize.models.Agency_Info)

  // /**
  //  * which field executive have added this agency
  //  */
  // Supervisor.hasMany(AgencyLogs_Supervisor, { foreignKey: "sup_id" });

  // AgencyLogs_Supervisor.belongsTo(Supervisor, {
  //   targetKey: "sup_id",
  //   foreignKey: "sup_id"
  // });

  // // /**
  // //  * which field executive have added this agency
  // //  */
  // Agency_Info.hasMany(AgencyLogs_Supervisor, { foreignKey: "agency_id" });

  // AgencyLogs_Supervisor.belongsTo(Agency_Info, {
  //   targetKey: "agency_id",
  //   foreignKey: "agency_id"
  // });

  // module.exports = Agency_Info;

  return Agency_Info;
};
