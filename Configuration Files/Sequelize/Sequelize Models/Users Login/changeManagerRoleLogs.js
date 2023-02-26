("use strict");
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {


  class ChangeManagerRoleLogs extends Model {}

  ChangeManagerRoleLogs.init(
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
      gm_id: {  
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "GM_Company",
          key: "gm_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "ChangeManagerRoleLogs",
      tableName: "changemanagerrolelogs",
    }
  );

  /**one manager can have many role change  */

  ChangeManagerRoleLogs.associate = (models) => {
    models.Managers.hasMany(ChangeManagerRoleLogs, {
      foreignKey: "man_id",
    });

    ChangeManagerRoleLogs.belongsTo(models.Managers, {
      targetKey: "man_id",
      foreignKey: "man_id",
    });

    /**one gm can have many role change  */
    models.GM_Company.hasMany(ChangeManagerRoleLogs, {
      foreignKey: "gm_id",
    });

    ChangeManagerRoleLogs.belongsTo(models.GM_Company, {
      targetKey: "gm_id",
      foreignKey: "gm_id",
    });
  };


  return ChangeManagerRoleLogs;
};
