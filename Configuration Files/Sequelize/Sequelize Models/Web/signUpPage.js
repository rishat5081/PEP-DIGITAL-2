'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Super_Admin = require('../Stakeholders/Super_Admin')

class SignUp_Page extends Model { }

SignUp_Page.init(
    {
        signUp_page_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        signUp_page_uuid: {
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
        signUpTitle: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        btnText: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        alreadyHaveAccount: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        alreadyHaveAccountIcon: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        pictureName: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        pictureFolder: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        emailPlaceHolder: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        emailIcon: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        passwordPlaceHolder: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        passwordIcon: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        confirmPasswordPlaceHolder: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        confirmPasswordIcon: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        sa_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            validate: {
                max: 11,
                isNumeric: true
            },
            references: {
                model: 'super_admin',
                key: 'sa_id'
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        }
    },
    {
        sequelize,
        // We need to pass the connection instance
        modelName: 'SignUp_Page',
        tableName: 'signUp_page'
    }
)

Super_Admin.hasOne(SignUp_Page, {
    foreignKey: 'sa_id'
  })
  
  SignUp_Page.belongsTo(Super_Admin, {
    targetKey: 'sa_id',
    foreignKey: 'sa_id'
  })

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(User_Login_Information === sequelize.models.User_Login_Information)
module.exports = SignUp_Page
