// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Super_Admin = require("../Stakeholders/Super_Admin");
"use strict";
module.exports = (sequelize, { DataTypes,  UUIDV4 }) => {
  const Companies_Access = sequelize.define(
    "Companies_Access",
    {
      comp_access_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      comp_access_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
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
      },
      comp_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      comp_address: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      comp_contact: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      access_date_time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      access_Status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Companies_Access",
      tableName: "companies_access"
    }
  );

  Companies_Access.associate = (models) => {
    models.Super_Admin.hasMany(Companies_Access, { foreignKey: "sa_id" });

    Companies_Access.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id"
    });
  };

  // Super_Admin.hasMany(Companies_Access, { foreignKey: "sa_id" });

  // Companies_Access.belongsTo(Super_Admin, {
  //   targetKey: "sa_id",
  //   foreignKey: "sa_id"
  // });

  //Companies_Access.sync({ force: true }).then(re => //console.log(re))

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Companies_Access === sequelize.models.Companies_Access)
  // module.exports = Companies_Access;
  return Companies_Access;
};
