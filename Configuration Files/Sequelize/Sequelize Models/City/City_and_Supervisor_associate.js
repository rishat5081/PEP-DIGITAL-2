"use strict";
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize"),
  City = require("./City"),
  Supervisor = require("../Stakeholders/Supervisor");

class City_and_Supervisor_associate extends Model {}

City_and_Supervisor_associate.init(
  {
    city_supp_assos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    city_and_sup_asso_uuid: {
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
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "city",
        key: "city_id"
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
    modelName: "City_and_Supervisor_associate",
    tableName: "city_sup_assos"
  }
);

/**City could have many supervisor  */
City.belongsToMany(Supervisor, {
  through: City_and_Supervisor_associate,
  foreignKey: "city_id"
});

/**One supervisor could be a head of one or more city
 * this relation is unexpected not for all supervisors
 */
Supervisor.belongsToMany(City, {
  through: City_and_Supervisor_associate,
  foreignKey: "sup_id"
});
/*
 *boolean return type which will indicate that the table is defined or not
 */
// console.log(
//   City_and_Supervisor_associate ===
//     sequelize.models.City_and_Supervisor_associate
// )
module.exports = City_and_Supervisor_associate;

// City_and_Supervisor_associate.sync({ force: true }).then(d => console.log(d)
// )
