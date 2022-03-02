"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Training extends Model {}

  Training.init(
    {
      training_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      training_uuid: {
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
      name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      purpose: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Training",
      tableName: "training",
    }
  );

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Department === sequelize.models.Department)
  // module.exports = Training
  return Training;
};
