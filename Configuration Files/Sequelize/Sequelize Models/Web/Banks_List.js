// 'use strict'
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require('sequelize'),
//     sequelize = require('../../Sequelize'),
//     Super_Admin = require('../Stakeholders/Super_Admin')
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Banks_List extends Model {}

  Banks_List.init(
    {
      Banks_List_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      Banks_List_uuid: {
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
      bankName: {
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
      modelName: "Banks_List",
      tableName: "Banks_List"
    }
  );
  Banks_List.associate = (models) => {
    models.Super_Admin.hasOne(Banks_List, {
      foreignKey: "sa_id"
    });

    Banks_List.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id"
    });
  };

  // Super_Admin.hasOne(Banks_List, {
  //     foreignKey: 'sa_id'
  // })

  // Banks_List.belongsTo(Super_Admin, {
  //     targetKey: 'sa_id',
  //     foreignKey: 'sa_id'
  // })
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(User_Login_Information === sequelize.models.User_Login_Information)
  // module.exports = Banks_List

  return Banks_List;
};

// Banks_List.sync({ force: true })
//     .then(a => console.info(a))
