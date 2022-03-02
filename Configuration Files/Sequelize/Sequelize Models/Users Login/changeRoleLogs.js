("use strict");
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  // const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  //   sequelize = require("../../Sequelize"),
  //   Field_Executive = require("../Stakeholders/Field_Executive"),
  //   Team_Lead = require("../Stakeholders/Team_Lead");

  class changeRoleLogs extends Model {}

  changeRoleLogs.init(
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
      modelName: "changeRoleLogs",
      tableName: "changeroleLogs",
    }
  );

  /**one Field_Executive can have many role change  */

  changeRoleLogs.associate = (models) => {
    models.Field_Executive.hasMany(changeRoleLogs, {
      foreignKey: "field_id",
    });

    changeRoleLogs.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id",
    });

    /**one Field_Executive can have many role change  */
    models.Team_Lead.hasMany(changeRoleLogs, {
      foreignKey: "team_L_id",
    });

    changeRoleLogs.belongsTo(models.Team_Lead, {
      targetKey: "team_L_id",
      foreignKey: "team_L_id",
    });
  };

  // module.exports = changeRoleLogs;

  return changeRoleLogs;
};
// changeRoleLogs.sync({ force: true }).then((d) => console.log(d));
