// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Supervisor = require("../Stakeholders/Supervisor"),
//   City = require("../City/City");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Compaigns extends Model {}

  Compaigns.init(
    {
      comp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      comp_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      comp_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      comp_type: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      comp_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      comp_ending_date_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      comp_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      comp_paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      forFreelancers: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      forAll: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      sup_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: "supervisor",
          key: "sup_id"
        }
      },
      city_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: "city",
          key: "city_id"
        }
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Compaigns",
      tableName: "compaigns"
    }
  );

  Compaigns.associate = (models) => {
    /**
     * One Supervisor can start many compaigns
     */
    models.Supervisor.hasMany(Compaigns, {
      foreignKey: "sup_id"
    });

    Compaigns.belongsTo(models.Supervisor, {
      targetKey: "sup_id",
      foreignKey: "sup_id"
    });
    /**
     * One Supervisor can start many compaigns in many Cities
     */
    models.City.hasMany(Compaigns, {
      foreignKey: "city_id"
    });

    Compaigns.belongsTo(models.City, {
      targetKey: "city_id",
      foreignKey: "city_id"
    });
  };

  // /**
  //  * One Supervisor can start many compaigns
  //  */
  // Supervisor.hasMany(Compaigns, {
  //   foreignKey: "sup_id"
  // });

  // Compaigns.belongsTo(Supervisor, {
  //   targetKey: "sup_id",
  //   foreignKey: "sup_id"
  // });
  // /**
  //  * One Supervisor can start many compaigns in many Cities
  //  */
  // City.hasMany(Compaigns, {
  //   foreignKey: "city_id"
  // });

  // Compaigns.belongsTo(City, {
  //   targetKey: "city_id",
  //   foreignKey: "city_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Compaigns === sequelize.models.Compaigns)
  // module.exports = Compaigns;
  return Compaigns;
};
