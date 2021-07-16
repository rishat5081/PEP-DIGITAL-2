const { DataTypes, Model, UUIDV4 } = require('sequelize'),
    sequelize = require('../../Sequelize'),
    Field_Executive = require("../Stakeholders/Field_Executive"),
    Activities = require('../Lists of Packages/Activities')

class ComplainsOfActivities extends Model { }

ComplainsOfActivities.init(
    {
        complain_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        complain_uuid: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            autoIncrement: false,
            primaryKey: false,

        },
        subject: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        message: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        deleted: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        paused: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: false
        },
        list_act_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            references: {
                model: 'activities',
                key: 'list_act_id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        field_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: false,
            autoIncrement: false,
            references: {
                model: "field_executive",
                key: "field_id",
            },
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
        },
    },
    {
        sequelize,
        modelName: 'ComplainsOfActivities',
        tableName: 'ComplainsOfActivities'
    }
)

/**One Activity have many Complains  */
Activities.hasMany(ComplainsOfActivities, { foreignKey: 'list_act_id' })

ComplainsOfActivities.belongsTo(Activities, {
    targetKey: 'list_act_id',
    foreignKey: 'list_act_id'
})

/**One Field_Executive have many Complains  */
Field_Executive.hasMany(ComplainsOfActivities, { foreignKey: 'field_id' })

ComplainsOfActivities.belongsTo(Field_Executive, {
    targetKey: 'field_id',
    foreignKey: 'field_id'
})



module.exports = ComplainsOfActivities


// ComplainsOfActivities.sync({ force: true })
//     .then(a => {
//         console.log(a);
//     })