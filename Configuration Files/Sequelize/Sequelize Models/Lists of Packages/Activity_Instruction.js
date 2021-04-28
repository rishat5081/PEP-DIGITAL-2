'use strict'
const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize')
class Activity_Instruction extends Model { }

Activity_Instruction.init(
    {
        act_instruc_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            validate: {
                max: 11,
                isNumeric: true
            }
        },
        act_instruc_uuid: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            autoIncrement: false,
            primaryKey: false,

        },
        isPaused: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        instructionText: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },
    {
        sequelize,
        // We need to pass the connection instance
        modelName: 'Activity_Instruction',
        tableName: 'Activity_Instruction'
    }
)

module.exports = Activity_Instruction
