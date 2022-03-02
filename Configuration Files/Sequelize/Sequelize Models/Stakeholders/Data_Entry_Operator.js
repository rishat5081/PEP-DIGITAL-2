// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize");
// const sequelize = require("../../Sequelize");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Data_Entry_Operator extends Model {}

  Data_Entry_Operator.init(
    {
      de_emp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      de_emp_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      login_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true,
        },
        references: {
          model: "user_login_information",
          key: "login_id",
        },
      },
      de_emp_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      man_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true,
        },
        references: {
          model: "managers",
          key: "man_id",
        },
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      salary: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      timing: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      fullName: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      profilePicPath: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Data_Entry_Operator",
      tableName: "dataentry_employee",
    }
  );

  //Data_Entry_Operator.sync({ force: true }).then(re => //console.log(re))

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Data_Entry_Operator === sequelize.models.Data_Entry_Operator)
  // module.exports = Data_Entry_Operator;
  return Data_Entry_Operator;
};
