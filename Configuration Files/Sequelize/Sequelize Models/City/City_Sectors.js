// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   City_Areas = require("./City_Areas");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class City_Sectors extends Model {}

  City_Sectors.init(
    {
      city_sector_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      city_sector_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      sector_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sector_code: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      city_area_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "city_area",
          key: "city_area_id",
        },
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "City_Sectors",
      tableName: "city_sectors",
    }
  );

  City_Sectors.associate = (models) => {
    /**
     * one supervisor and city will have many city areas
     */

    models.City_Areas.hasMany(City_Sectors, {
      foreignKey: "city_area_id",
    });

    City_Sectors.belongsTo(models.City_Areas, {
      targetKey: "city_area_id",
      foreignKey: "city_area_id",
    });
  };

  // /**
  //  * one supervisor and city will have many city areas
  //  */

  // City_Areas.hasMany(City_Sectors, {
  //   foreignKey: "city_area_id"
  // });

  // City_Sectors.belongsTo(City_Areas, {
  //   targetKey: "city_area_id",
  //   foreignKey: "city_area_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(City_Sectors === sequelize.models.City_Sectors)
  // module.exports = City_Sectors;

  // City_Sectors.sync({ force: true }).
  //then((a) => {
  //   console.log(a);
  // });

  // City_Sectors.bulkCreate([
  //   { city_area_id: 1, sector_name: "Benazir Hospital", sector_code: "245" },
  //   { city_area_id: 1, sector_name: "PAF Chowk", sector_code: "244" },
  //   { city_area_id: 1, sector_name: "Rawal Chowk", sector_code: "243" }
  // ]).then((a) => {
  //   console.log(a);
  // });

  return City_Sectors;
};
