// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   City_Sectors = require("./City_Sectors"),
//   Field_Executive = require("../Stakeholders/Field_Executive");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class City_Sector_Assosiate extends Model {}

  City_Sector_Assosiate.init(
    {
      city_sector_assos_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      city_sector_assos_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
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
      city_sector_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "city_sectors",
          key: "city_sector_id"
        }
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
      sequelize,
      // We need to pass the connection instance
      modelName: "City_Sector_Assosiate",
      tableName: "City_Sector_Assosiate"
    }
  );

  City_Sector_Assosiate.associate = (models) => {
    /**City could have many supervisor  */
    models.City_Sectors.belongsToMany(models.Field_Executive, {
      through: City_Sector_Assosiate,
      foreignKey: "city_sector_id"
    });

    /**One supervisor could be a head of one or more city
     * this relation is unexpected not for all supervisors
     */
    models.Field_Executive.belongsToMany(models.City_Sectors, {
      through: City_Sector_Assosiate,
      foreignKey: "field_id"
    });
  };

  // /**City could have many supervisor  */
  // City_Sectors.belongsToMany(Field_Executive, {
  //   through: City_Sector_Assosiate,
  //   foreignKey: "city_sector_id"
  // });

  // /**One supervisor could be a head of one or more city
  //  * this relation is unexpected not for all supervisors
  //  */
  // Field_Executive.belongsToMany(City_Sectors, {
  //   through: City_Sector_Assosiate,
  //   foreignKey: "field_id"
  // });
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  // console.log(
  //   City_Sector_Assosiate ===
  //     sequelize.models.City_Sector_Assosiate
  // )
  // module.exports = City_Sector_Assosiate;

  // City_Sector_Assosiate.sync({ force: true }).then(d => console.log(d)
  // )
  return City_Sector_Assosiate;
};
