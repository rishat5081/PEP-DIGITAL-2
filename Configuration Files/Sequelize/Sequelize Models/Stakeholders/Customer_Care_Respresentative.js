'use strict'
const { DataTypes, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Manager = require('../Stakeholders/Manager'),
  Department = require('../Department'),
  User_Login_Information = require('../Users Login/User_Login_Information'),
  Customer_Care_Respresentative = sequelize.define(
    'Customer_Care_Respresentative',
    {
      cust_care_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      cust_care_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
         
      },
      cust_care_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_email: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_password: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_contact: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_userProfilePic: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_target: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_salary: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_commission: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_username: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      cust_care_isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      man_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: 'managers',
          key: 'man_id'
        }
      },
      d_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: 'departments',
          key: 'd_id'
        }
      },
      login_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: 'user_login_information',
          key: 'login_id'
        }
      },
      totalCallTime: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: 'Customer_Care_Respresentative',
      tableName: 'cust_care_csr'
    }
  )

/**one manager can have many CSR  */
Manager.hasMany(Customer_Care_Respresentative, {
  foreignKey: 'man_id'
})

Customer_Care_Respresentative.belongsTo(Manager, {
  targetKey: 'man_id',
  foreignKey: 'man_id'
})

/**one department can have many CSR  */
Department.hasMany(Customer_Care_Respresentative, {
  foreignKey: 'd_id'
})

Customer_Care_Respresentative.belongsTo(Department, {
  targetKey: 'd_id',
  foreignKey: 'd_id'
})

User_Login_Information.hasOne(Customer_Care_Respresentative, {
  foreignKey: 'login_id'
})

Customer_Care_Respresentative.belongsTo(User_Login_Information, {
  targetKey: 'login_id',
  foreignKey: 'login_id'
})
/*
 *boolean return type which will indicate that the table is defined or not
 */
// console.log(
//   Customer_Care_Respresentative ===
//     sequelize.models.Customer_Care_Respresentative
// )
module.exports = Customer_Care_Respresentative
