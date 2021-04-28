'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  User_Role = require('./User_Role')

class User_Login_Information extends Model { }

User_Login_Information.init(
  {
    login_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    login_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,
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
    login_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    login_password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    jwt: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    verified: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    user_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'user_login_role',
        key: 'user_role_id'
      },
      validate: {
        max: 11,
        isNumeric: true
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: 'User_Login_Information',
    tableName: 'user_login_information'
  }
)

/**one user login info can have one role  */
User_Role.hasOne(User_Login_Information, {
  foreignKey: 'user_role_id'
})

User_Login_Information.belongsTo(User_Role, {
  targetKey: 'user_role_id',
  foreignKey: 'user_role_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(User_Login_Information === sequelize.models.User_Login_Information)
module.exports = User_Login_Information
