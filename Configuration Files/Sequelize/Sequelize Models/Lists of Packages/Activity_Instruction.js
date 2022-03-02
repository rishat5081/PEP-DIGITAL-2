// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize");
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Activity_Instruction extends Model {}

  Activity_Instruction.init(
    {
      act_instruc_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      act_instruc_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      isPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      instructionText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Activity_Instruction",
      tableName: "activity_instruction",
    }
  );

  // module.exports = Activity_Instruction;
  return Activity_Instruction;
};
