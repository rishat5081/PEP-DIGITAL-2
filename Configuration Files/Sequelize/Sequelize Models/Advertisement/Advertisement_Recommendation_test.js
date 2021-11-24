// const { DataTypes, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Agency_Info = require("../Agency Models/Agency_Info"),
//   Field_Executive = require("../Stakeholders/Field_Executive"),
//   Team_Lead = require("../Stakeholders/Team_Lead"),
//   Supervisor = require("../Stakeholders/Supervisor"),
//   Manager = require("../Stakeholders/Manager");
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Advertisement_Recommendation_test extends Model {}

  Advertisement_Recommendation_test.init(
    {
      adver_recom_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      advert_recom_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "agency_info",
          key: "agency_id"
        }
      },
      descrip: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "field_executive",
          key: "field_id"
        }
      },
      approval_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      decline: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      decline_descrip: {
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
        }
      },
      team_lead_forward_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      team_lead_decline_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      team_lead_decline_descr: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      sup_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "supervisor",
          key: "sup_id"
        }
      },
      sup_forward_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      sup_decline_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      sup_decline_descr: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      man_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "managers",
          key: "man_id"
        }
      },
      adver_gift_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "advertismentgift",
          key: "adver_gift_id"
        }
      },
      team_lead_date_time: {
        type: DataTypes.DATE,
        defaultValue: null //Date(Date.now().toString())
      },
      sup_dateTime: {
        type: DataTypes.DATE,
        defaultValue: null //Date(Date.now().toString())
      },
      mana_dateTime: {
        type: DataTypes.DATE,
        defaultValue: null //Date(Date.now().toString())
      },
      mana_approval: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Advertisement_Recommendation_test",
      tableName: "Advertisement_Recommendation_test"
    }
  );

  Advertisement_Recommendation_test.associate = (models) => {
    /**
     * The recommendation to which agency
     */

    models.Agency_Info.hasMany(Advertisement_Recommendation_test, {
      foreignKey: "agency_id"
    });

    Advertisement_Recommendation_test.belongsTo(models.Agency_Info, {
      targetKey: "agency_id",
      foreignKey: "agency_id"
    });

    /**
     * Which executive made the recommendation
     */
    models.Field_Executive.hasMany(Advertisement_Recommendation_test, {
      foreignKey: "field_id"
    });

    Advertisement_Recommendation_test.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });

    /**
     * The approval of the team lead and decline
     */
    models.Team_Lead.hasMany(Advertisement_Recommendation_test, {
      foreignKey: "team_L_id"
    });

    Advertisement_Recommendation_test.belongsTo(models.Team_Lead, {
      targetKey: "team_L_id",
      foreignKey: "team_L_id"
    });
    /**
     * The approval of the Supervisor and decline
     */
    models.Supervisor.hasMany(Advertisement_Recommendation_test, {
      foreignKey: "sup_id"
    });

    Advertisement_Recommendation_test.belongsTo(models.Supervisor, {
      targetKey: "sup_id",
      foreignKey: "sup_id"
    });
    /**
     * The approval of the Manager and decline
     */
    models.Managers.hasMany(Advertisement_Recommendation_test, {
      foreignKey: "man_id"
    });

    Advertisement_Recommendation_test.belongsTo(models.Managers, {
      targetKey: "man_id",
      foreignKey: "man_id"
    });
  };
  // /**
  //  * The recommendation to which agency
  //  */

  // Agency_Info.hasMany(Advertisement_Recommendation_test, { foreignKey: "agency_id" });

  // Advertisement_Recommendation_test.belongsTo(Agency_Info, {
  //   targetKey: "agency_id",
  //   foreignKey: "agency_id"
  // });

  // /**
  //  * Which executive made the recommendation
  //  */
  // Field_Executive.hasMany(Advertisement_Recommendation_test, {
  //   foreignKey: "field_id"
  // });

  // Advertisement_Recommendation_test.belongsTo(Field_Executive, {
  //   targetKey: "field_id",
  //   foreignKey: "field_id"
  // });

  // /**
  //  * The approval of the team lead and decline
  //  */
  // Team_Lead.hasMany(Advertisement_Recommendation_test, { foreignKey: "team_L_id" });

  // Advertisement_Recommendation_test.belongsTo(Team_Lead, {
  //   targetKey: "team_L_id",
  //   foreignKey: "team_L_id"
  // });
  // /**
  //  * The approval of the Supervisor and decline
  //  */
  // Supervisor.hasMany(Advertisement_Recommendation_test, { foreignKey: "sup_id" });

  // Advertisement_Recommendation_test.belongsTo(Supervisor, {
  //   targetKey: "sup_id",
  //   foreignKey: "sup_id"
  // });
  // /**
  //  * The approval of the Manager and decline
  //  */
  // Manager.hasMany(Advertisement_Recommendation_test, { foreignKey: "man_id" });

  // Advertisement_Recommendation_test.belongsTo(Manager, {
  //   targetKey: "man_id",
  //   foreignKey: "man_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  // console.log(
  //   Advertisement_Recommendation_test === sequelize.models.Advertisement_Recommendation_test
  // )
  // module.exports = Advertisement_Recommendation_test;
  return Advertisement_Recommendation_test;
};


