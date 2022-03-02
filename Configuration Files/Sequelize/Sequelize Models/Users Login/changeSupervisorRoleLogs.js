("use strict");
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  // const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  //   sequelize = require("../../Sequelize"),
  //   Field_Executive = require("../Stakeholders/Field_Executive"),
  //   Managers = require("../Stakeholders/Managers");

  class ChangeSupervisorRoleLogs extends Model {}

  ChangeSupervisorRoleLogs.init(
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
      man_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "managers",
          key: "man_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "ChangeSupervisorRoleLogs",
      tableName: "changecupervisorrolelogs",
    }
  );

  /**one Field_Executive can have many role change  */

  ChangeSupervisorRoleLogs.associate = (models) => {
    models.Supervisor.hasMany(ChangeSupervisorRoleLogs, {
      foreignKey: "sup_id",
    });

    ChangeSupervisorRoleLogs.belongsTo(models.Supervisor, {
      targetKey: "sup_id",
      foreignKey: "sup_id",
    });

    /**one Field_Executive can have many role change  */
    models.Managers.hasMany(ChangeSupervisorRoleLogs, {
      foreignKey: "man_id",
    });

    ChangeSupervisorRoleLogs.belongsTo(models.Managers, {
      targetKey: "man_id",
      foreignKey: "man_id",
    });
  };

  // module.exports = ChangeSupervisorRoleLogs;

  return ChangeSupervisorRoleLogs;
};
// ChangeTeamLeadRoleLogs.sync({ force: true }).then((d) => console.log(d));
