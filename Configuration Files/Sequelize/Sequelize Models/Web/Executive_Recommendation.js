"use strict";
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize"),
  Super_Admin = require("../Stakeholders/Super_Admin");

class Executive_Recommendation extends Model {}

Executive_Recommendation.init(
  {
    exec_recomm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    exec_recomm_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false
    },
    paused: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    Recommendation: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    sa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "super_admin",
        key: "sa_id"
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE"
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: "Executive_Recommendation",
    tableName: "Executive_Recommendation"
  }
);

Super_Admin.hasOne(Executive_Recommendation, {
  foreignKey: "sa_id"
});

Executive_Recommendation.belongsTo(Super_Admin, {
  targetKey: "sa_id",
  foreignKey: "sa_id"
});
/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(User_Login_Information === sequelize.models.User_Login_Information)
module.exports = Executive_Recommendation;

// Executive_Recommendation.sync({ force: true })
//     .then(a => console.info(a))
