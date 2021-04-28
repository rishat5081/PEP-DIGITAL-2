const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize"),
  Compaign = require("./Compaigns"),
  Field_Executive = require("../Stakeholders/Field_Executive"),
  Agency_Info = require("../Agency Models/Agency_Info"),
  Compaigns_Activities = sequelize.define(
    "Compaigns_Activities",
    {
      comp_act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true,
        },
      },
      comp_act_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      comp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,

        references: {
          model: "compaigns",
          key: "comp_id",
        },
      },
      agency_checkIN: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "field_executive",
          key: "field_id",
        },
      },
      agency_checkOut: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      agency_Checkout_time: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      Latitude: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      Longitude: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Compaigns_Activities",
      tableName: "compaign_activities",
    }
  );

/**
 * one compaign can have many activities
 */
Compaign.hasMany(Compaigns_Activities, {
  foreignKey: "comp_id",
});

Compaigns_Activities.belongsTo(Compaign, {
  targetKey: "comp_id",
  foreignKey: "comp_id",
});

/**
 * One field executive will generate many compaign activities
 */
Field_Executive.hasMany(Compaigns_Activities, {
  foreignKey: "field_id",
});

Compaigns_Activities.belongsTo(Field_Executive, {
  targetKey: "field_id",
  foreignKey: "field_id",
});

/**
 * One field executive will generate many compaign activities on many agencies
 */
Agency_Info.hasMany(Compaigns_Activities, {
  foreignKey: "agency_id",
});

Compaigns_Activities.belongsTo(Agency_Info, {
  targetKey: "agency_id",
  foreignKey: "agency_id",
});

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Compaigns_Activities === sequelize.models.Compaigns_Activities)
module.exports = Compaigns_Activities;
