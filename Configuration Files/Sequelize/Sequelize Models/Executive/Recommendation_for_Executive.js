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
      },
      recomm_for_Exec_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      recommendationTitle: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      recommendationDetails: {
        type: DataTypes.TEXT,
        allowNull: true,
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
      },
      approval_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      decline: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      decline_descrip: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      team_L_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "team_lead",
          key: "team_L_id",
        },
      },
      team_lead_forward_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      team_lead_decline_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      team_lead_decline_descr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sup_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "supervisor",
          key: "sup_id",
        },
      },
      sup_forward_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      sup_decline_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      sup_decline_descr: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      man_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "managers",
          key: "man_id",
        },
      },
      team_lead_date_time: {
        type: DataTypes.DATE,
        defaultValue: null, //Date(Date.now().toString())
      },
      sup_dateTime: {
        type: DataTypes.DATE,
        defaultValue: null, //Date(Date.now().toString())
      },
      mana_dateTime: {
        type: DataTypes.DATE,
        defaultValue: null, //Date(Date.now().toString())
      },
      mana_approval: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      exec_recomm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "executive_recommendation",
          key: "exec_recomm_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Recommendation_for_Executive",
      tableName: "Recommendation_for_Executive",
    }
  );

  Recommendation_for_Executive.associate = (models) => {
    models.Field_Executive.hasMany(Recommendation_for_Executive, {
      foreignKey: "field_id",
    });

    Recommendation_for_Executive.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id",
    });

    models.Team_Lead.hasMany(Recommendation_for_Executive, {
      foreignKey: "team_L_id",
    });

    Recommendation_for_Executive.belongsTo(models.Team_Lead, {
      targetKey: "team_L_id",
      foreignKey: "team_L_id",
    });

    models.Executive_Recommendation.hasMany(Recommendation_for_Executive, {
      foreignKey: "exec_recomm_id",
    });

    Recommendation_for_Executive.belongsTo(models.Executive_Recommendation, {
      targetKey: "exec_recomm_id",
      foreignKey: "exec_recomm_id",
    });

    /**
     * The approval of the Supervisor and decline
     */
    models.Supervisor.hasMany(Recommendation_for_Executive, {
      foreignKey: "sup_id",
    });

    Recommendation_for_Executive.belongsTo(models.Supervisor, {
      targetKey: "sup_id",
      foreignKey: "sup_id",
    });
    /**
     * The approval of the Manager and decline
     */
    models.Managers.hasMany(Recommendation_for_Executive, {
      foreignKey: "man_id",
    });

    Recommendation_for_Executive.belongsTo(models.Managers, {
      targetKey: "man_id",
      foreignKey: "man_id",
    });
  };

  // Recommendation_for_Executive.sync({ force: true })
  //     .then(a => console.info(a))
  return Recommendation_for_Executive;
};
