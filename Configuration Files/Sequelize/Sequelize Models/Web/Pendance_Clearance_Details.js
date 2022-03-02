// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Pendance_Clearance_Details extends Model {}

  Pendance_Clearance_Details.init(
    {
      clearance_details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      clearance_details_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      pending_days: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Pendance_Clearance_Details",
      tableName: "pendance_clearance_details",
    }
  );

  // module.exports = Pendance_Clearance_Details;

  return Pendance_Clearance_Details;
};

// Pendance_Clearance_Details.sync({ force: true })
//     .then(a => console.log(a))
