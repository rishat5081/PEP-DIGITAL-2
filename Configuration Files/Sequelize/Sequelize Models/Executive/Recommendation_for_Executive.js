// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Field_Executive = require("../Stakeholders/Field_Executive"),
//   Team_Lead = require("../Stakeholders/Team_Lead"),
//   Executive_Recommendation = require("../Web/Executive_Recommendation");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Recommendation_for_Executive extends Model {}

  Recommendation_for_Executive.init(
    {
      recomm_for_Exec_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      recomm_for_Exec_uuid: {
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
      recommendationTitle: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      recommendationDetails: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      team_L_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "team_lead",
          key: "team_L_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "field_executive",
          key: "field_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      exec_recomm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "executive_recommendation",
          key: "exec_recomm_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Recommendation_for_Executive",
      tableName: "Recommendation_for_Executive"
    }
  );

  Recommendation_for_Executive.associate = (models) => {
    models.Field_Executive.hasMany(Recommendation_for_Executive, {
      foreignKey: "field_id"
    });

    Recommendation_for_Executive.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });

    models.Team_Lead.hasMany(Recommendation_for_Executive, {
      foreignKey: "team_L_id"
    });

    Recommendation_for_Executive.belongsTo(models.Team_Lead, {
      targetKey: "team_L_id",
      foreignKey: "team_L_id"
    });

    models.Executive_Recommendation.hasMany(Recommendation_for_Executive, {
      foreignKey: "exec_recomm_id"
    });

    Recommendation_for_Executive.belongsTo(models.Executive_Recommendation, {
      targetKey: "exec_recomm_id",
      foreignKey: "exec_recomm_id"
    });
  };

  // Field_Executive.hasMany(Recommendation_for_Executive, {
  //   foreignKey: "field_id"
  // });

  // Recommendation_for_Executive.belongsTo(Field_Executive, {
  //   targetKey: "field_id",
  //   foreignKey: "field_id"
  // });

  // Team_Lead.hasMany(Recommendation_for_Executive, {
  //   foreignKey: "team_L_id"
  // });

  // Recommendation_for_Executive.belongsTo(Team_Lead, {
  //   targetKey: "team_L_id",
  //   foreignKey: "team_L_id"
  // });

  // Executive_Recommendation.hasMany(Recommendation_for_Executive, {
  //   foreignKey: "exec_recomm_id"
  // });

  // Recommendation_for_Executive.belongsTo(Executive_Recommendation, {
  //   targetKey: "exec_recomm_id",
  //   foreignKey: "exec_recomm_id"
  // });
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(User_Login_Information === sequelize.models.User_Login_Information)
  // module.exports = Recommendation_for_Executive;

  // Recommendation_for_Executive.sync({ force: true })
  //     .then(a => console.info(a))
  return Recommendation_for_Executive;
};
