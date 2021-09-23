// 'use strict'
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require('sequelize'),
//   sequelize = require('../Sequelize'),
//   Companies_Access = require('../Sequelize Models/Company/Companies_Access'),
//   Super_Admin = require('../Sequelize Models/Stakeholders/Super_Admin')

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Department extends Model {}

  Department.init(
    {
      d_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      d_uuid: {
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
      d_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      d_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      d_type: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      d_added_Date_Time: {
        type: DataTypes.DATE,
        allowNull: true
      },
      comp_access_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "companies_access",
          key: "comp_access_id"
        },
        validate: {
          max: 11,
          isNumeric: true
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      gm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "company_gm_info",
          key: "gm_id"
        },
        validate: {
          max: 11,
          isNumeric: true
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Department",
      tableName: "departments"
    }
  );

  //Department.sync({ force: true }).then(re => //console.log(re))

  /**Super Admin will handle many Departments */
  // Super_Admin.hasMany(Department, { foreignKey: "sa_id" });

  // Department.belongsTo(Super_Admin, {
  //   targetKey: "sa_id",
  //   foreignKey: "sa_id"
  // });

  // /**Companies will handle many Departments */
  // Companies_Access.hasMany(Department, { foreignKey: "comp_access_id" });

  // Department.belongsTo(Companies_Access, {
  //   targetKey: "comp_access_id",
  //   foreignKey: "comp_access_id"
  // });

  Department.associate = (models) => {
    models.Super_Admin.hasMany(Department, { foreignKey: "sa_id" });

    Department.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id"
    });

    /**Companies will handle many Departments */
    models.Companies_Access.hasMany(Department, {
      foreignKey: "comp_access_id"
    });

    Department.belongsTo(models.Companies_Access, {
      targetKey: "comp_access_id",
      foreignKey: "comp_access_id"
    });
  };

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Department === sequelize.models.Department)
  // module.exports = Department

  return Department;
};
