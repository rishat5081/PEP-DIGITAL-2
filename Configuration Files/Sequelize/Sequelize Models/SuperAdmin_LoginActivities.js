"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  // const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  // sequelize = require('../../Sequelize'),
  // Super_Admin = require('../Sequelize Models/Stakeholders/Super_Admin')

  class SuperAdmin_LoginActivities extends Model {}

  SuperAdmin_LoginActivities.init(
    {
      sa_login_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      sa_login_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      sa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true,
        },
        references: {
          model: "super_admin",
          key: "sa_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      sa_login_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      sa_login_date: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      sa_login_logout_time: {
        type: { DataTypes, Model, UUIDV4 }.DATE,
        allowNull: true,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "SuperAdmin_LoginActivities",
      tableName: "super_admin_login_activities",
    }
  );

  // Super_Admin.hasMany(SuperAdmin_LoginActivities, { foreignKey: "sa_id" });

  // SuperAdmin_LoginActivities.belongsTo(Super_Admin, {
  //   targetKey: "sa_id",
  //   foreignKey: "sa_id"
  // });

  SuperAdmin_LoginActivities.associate = (models) => {
    models.Super_Admin.hasMany(SuperAdmin_LoginActivities, {
      foreignKey: "sa_id",
    });

    SuperAdmin_LoginActivities.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id",
    });
  };

  //SuperAdmin_LoginActivities.sync({ force: true }).then(re => console.log(re))

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  // console.log(
  //   SuperAdmin_LoginActivities === sequelize.models.SuperAdmin_LoginActivities
  // )
  // module.exports = SuperAdmin_LoginActivities
  return SuperAdmin_LoginActivities;
};
