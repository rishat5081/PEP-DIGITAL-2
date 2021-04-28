'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Team_Lead = require('../Stakeholders/Team_Lead')

class TeamLead_Login extends Model { }

TeamLead_Login.init(
    {
        teamLead_login_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        teamLead_login_uuid: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            autoIncrement: false,
            primaryKey: false,

        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        isPaused: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        loggedInStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        loggedOutStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        loggedOutDate: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        },
        ipAddress: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        team_L_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            references: {
                model: 'team_lead',
                key: 'team_L_id'
            },

            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }

    },
    {
        sequelize,
        // We need to pass the connection instance
        modelName: 'TeamLead_Login',
        tableName: 'teamLead_Login'
    }
)

/**
 * One Field Executive table will have many notifications
 */
Team_Lead.hasMany(TeamLead_Login, {
    foreignKey: 'team_L_id'
})

TeamLead_Login.belongsTo(Team_Lead, {
    targetKey: 'team_L_id',
    foreignKey: 'team_L_id'
})

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Packages === sequelize.models.Packages)
module.exports = TeamLead_Login
