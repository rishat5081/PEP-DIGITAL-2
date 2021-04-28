const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  sequelize = require('../../Sequelize'),
  Department = require('../Department'),
  Zone = require('../Zone')

class Managers extends Model { }

Managers.init(
  {
    man_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    man_uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      autoIncrement: false,
      primaryKey: false,

    },
    man_name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    man_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    man_password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    man_userProfilePic: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    man_contact: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    man_isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    man_salary: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    man_username: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    d_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'departments',
        key: 'd_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    },
    zone_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: 'zone',
        key: 'zone_id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    modelName: 'Managers',
    tableName: 'managers'
  }
)

/**One Zone have many Manager  */
Zone.hasMany(Managers, { foreignKey: 'zone_id' })

Managers.belongsTo(Zone, {
  targetKey: 'zone_id',
  foreignKey: 'zone_id'
})

/**One Department have many Manager but one zone and one department have one manager
 * one to many relationship is create in order if there is a need of more managers
 */
Department.hasMany(Managers, { foreignKey: 'd_id' })

Managers.belongsTo(Department, {
  targetKey: 'd_id',
  foreignKey: 'd_id'
})

module.exports = Managers
