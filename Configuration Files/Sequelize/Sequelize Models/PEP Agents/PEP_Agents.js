// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize");
// const sequelize = require("../../Sequelize");
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class PEP_Agents extends Model {}

  PEP_Agents.init(
    {
      pep_dealers_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      pep_dealers_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      contact: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      address: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "PEP_Agents",
      tableName: "dealers_info_from_pep",
    }
  );

  /**
   * No relationship with this table too.
   */

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(PEP_Agents === sequelize.models.PEP_Agents)
  // module.exports = PEP_Agents;
  return PEP_Agents;
};
