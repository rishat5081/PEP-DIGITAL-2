"use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require('sequelize'),
//     sequelize = require('../../Sequelize'),
//     Field_Executive = require('../Stakeholders/Field_Executive'),
//     Team_Lead = require('../Stakeholders/Team_Lead'),
//     Training = require('./Training')
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Training_Activities extends Model {}

  Training_Activities.init(
    {
      training_act_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      training_act_uuid: {
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
      isComplete: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      completeDescription: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      purpose: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      training_ID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: "training",
          key: "training_ID"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: "field_executive",
          key: "field_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      team_L_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: "team_lead",
          key: "team_L_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Training_Activities",
      tableName: "training_activities"
    }
  );

  Training_Activities.associate = (models) => {
    /**
     * One training can have many activities
     */
    models.Training.hasMany(Training_Activities, { foreignKey: "training_ID" });

    Training_Activities.belongsTo(models.Training, {
      targetKey: "training_ID",
      foreignKey: "training_ID"
    });

    /**
     * One field executive can have many training
     */
    models.Field_Executive.hasMany(Training_Activities, {
      foreignKey: "field_id"
    });

    Training_Activities.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });

    /**
     * One team lead will give training to many field executive
     */
    models.Team_Lead.hasMany(Training_Activities, { foreignKey: "team_L_id" });

    Training_Activities.belongsTo(models.Team_Lead, {
      targetKey: "team_L_id",
      foreignKey: "team_L_id"
    });
  };

  //   /**
  //    * One training can have many activities
  //    */
  //   Training.hasMany(Training_Activities, { foreignKey: "training_ID" });

  //   Training_Activities.belongsTo(Training, {
  //     targetKey: "training_ID",
  //     foreignKey: "training_ID"
  //   });

  //   /**
  //    * One field executive can have many training
  //    */
  //   Field_Executive.hasMany(Training_Activities, { foreignKey: "field_id" });

  //   Training_Activities.belongsTo(Field_Executive, {
  //     targetKey: "field_id",
  //     foreignKey: "field_id"
  //   });

  //   /**
  //    * One team lead will give training to many field executive
  //    */
  //   Team_Lead.hasMany(Training_Activities, { foreignKey: "team_L_id" });

  //   Training_Activities.belongsTo(Team_Lead, {
  //     targetKey: "team_L_id",
  //     foreignKey: "team_L_id"
  //   });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Department === sequelize.models.Department)
  // module.exports = Training_Activities

  return Training_Activities;
};
