("use strict");
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize"),
  Permissions = require("./Permissions"),
  User_Role = require("../Users Login/User_Role");

class Permission_Role_Assosiate extends Model {}

Permission_Role_Assosiate.init(
  {
    perm_assos_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true,
      },
    },
    perm_assos_uuid: {
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
    d_deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    permmission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Permissions,
        key: "permmission_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    user_role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User_Role,
        key: "user_role_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  {
    sequelize,
    // We need to pass the connection instance
    modelName: "Permission_Role_Assosiate",
    tableName: "permission_role_assosiate",
  }
);

/**
 * Defining here that the Permission and User Roles are M:N relationship
 *
 * by using this example https://sequelize.org/master/manual/advanced-many-to-many.html#advanced-m-n-associations:~:text=Advanced%20M%3AN%20Associations,-Make
 * we are defining that the User_Role is belongsToMany  Permissions through this current assosiate table
 * and aslo the permissions belongsToMany through this current table
 */

User_Role.belongsToMany(Permissions, {
  through: Permission_Role_Assosiate,
  foreignKey: "user_role_id",
});
Permissions.belongsToMany(User_Role, {
  through: Permission_Role_Assosiate,
  foreignKey: "permmission_id",
});

/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Department === sequelize.models.Department)

module.exports = Permission_Role_Assosiate;
