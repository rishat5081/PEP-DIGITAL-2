// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   City_and_Supervisor_associate = require("./City_and_Supervisor_associate");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class City_Areas extends Model {}

  City_Areas.init(
    {
      city_area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      city_area_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      city_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      city_code: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      city_supp_assos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "city_sup_assos",
          key: "city_supp_assos_id"
        }
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "City_Areas",
      tableName: "city_area"
    }
  );

  City_Areas.associate = (models) => {
    /**
     * one supervisor and city will have many city areas
     */

    models.City_and_Supervisor_associate.hasMany(City_Areas, {
      foreignKey: "city_supp_assos_id"
    });

    City_Areas.belongsTo(models.City_and_Supervisor_associate, {
      targetKey: "city_supp_assos_id",
      foreignKey: "city_supp_assos_id"
    });
  };

  // /**
  //  * one supervisor and city will have many city areas
  //  */

  // City_and_Supervisor_associate.hasMany(City_Areas, {
  //   foreignKey: "city_supp_assos_id"
  // });

  // City_Areas.belongsTo(City_and_Supervisor_associate, {
  //   targetKey: "city_supp_assos_id",
  //   foreignKey: "city_supp_assos_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(City_Areas === sequelize.models.City_Areas)
  // module.exports = City_Areas;
  return City_Areas;
};
