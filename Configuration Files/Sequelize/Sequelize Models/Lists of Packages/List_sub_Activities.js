// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   List_of_Packages = require("./List_of_Packages"),
//   Activities = require("./Activities");
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class List_sub_Activities extends Model {}

  List_sub_Activities.init(
    {
      list_sub_act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      list_sub_act_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      list_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "lists",
          key: "list_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      list_act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "Activities",
          key: "list_act_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      list_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      list_paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      // amount: {
      //   type: DataTypes.TEXT,
      //   allowNull: true,
      // },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "List_sub_Activities",
      tableName: "list_sub_activities",
    }
  );

  List_sub_Activities.associate = (models) => {
    /**
     * Sub activties will be handle about how many list product does the
     * field executive had made
     */
    models.List_of_Packages.hasMany(List_sub_Activities, {
      foreignKey: "list_id",
    });

    List_sub_Activities.belongsTo(models.List_of_Packages, {
      targetKey: "list_id",
      foreignKey: "list_id",
    });

    /**
     * Sub activties will be handle about how many list product does the
     * field executive had made
     */
    models.Activities.hasMany(List_sub_Activities, {
      foreignKey: "list_act_id",
    });

    List_sub_Activities.belongsTo(models.Activities, {
      targetKey: "list_act_id",
      foreignKey: "list_act_id",
    });
  };

  // /**
  //  * Sub activties will be handle about how many list product does the
  //  * field executive had made
  //  */
  // List_of_Packages.hasMany(List_sub_Activities, {
  //   foreignKey: "list_id"
  // });

  // List_sub_Activities.belongsTo(List_of_Packages, {
  //   targetKey: "list_id",
  //   foreignKey: "list_id"
  // });

  // /**
  //  * Sub activties will be handle about how many list product does the
  //  * field executive had made
  //  */
  // Activities.hasMany(List_sub_Activities, {
  //   foreignKey: "list_act_id"
  // });

  // List_sub_Activities.belongsTo(Activities, {
  //   targetKey: "list_act_id",
  //   foreignKey: "list_act_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(List_sub_Activities === sequelize.models.List_sub_Activities)
  // module.exports = List_sub_Activities;
  return List_sub_Activities;
};
