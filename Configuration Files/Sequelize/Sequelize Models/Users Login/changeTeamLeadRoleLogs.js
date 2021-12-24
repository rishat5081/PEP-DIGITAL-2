("use strict");
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  // const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  //   sequelize = require("../../Sequelize"),
  //   Field_Executive = require("../Stakeholders/Field_Executive"),
  //   Team_Lead = require("../Stakeholders/Team_Lead");

  class ChangeTeamLeadRoleLogs extends Model {}

  ChangeTeamLeadRoleLogs.init(
    {
      changeRole_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      changeRole_uuid: {
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
      previousRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      newRole: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "ChangeTeamLeadRoleLogs",
      tableName: "changeTeamLeadRoleLogs",
    }
  );

  /**one Field_Executive can have many role change  */

  ChangeTeamLeadRoleLogs.associate = (models) => {
    models.Supervisor.hasMany(ChangeTeamLeadRoleLogs, {
      foreignKey: "sup_id",
    });

    ChangeTeamLeadRoleLogs.belongsTo(models.Supervisor, {
      targetKey: "sup_id",
      foreignKey: "sup_id",
    });

    /**one Field_Executive can have many role change  */
    models.Team_Lead.hasMany(ChangeTeamLeadRoleLogs, {
      foreignKey: "team_L_id",
    });

    ChangeTeamLeadRoleLogs.belongsTo(models.Team_Lead, {
      targetKey: "team_L_id",
      foreignKey: "team_L_id",
    });
  };

  // module.exports = ChangeTeamLeadRoleLogs;

  return ChangeTeamLeadRoleLogs;
};
// ChangeTeamLeadRoleLogs.sync({ force: true }).then((d) => console.log(d));
