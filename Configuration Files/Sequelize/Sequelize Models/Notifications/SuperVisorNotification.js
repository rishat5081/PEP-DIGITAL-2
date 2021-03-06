// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Supervisor = require("../Stakeholders/Supervisor"),
//   NotificationText = require("./NotificationText");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class SupervisorNotification extends Model {}

  SupervisorNotification.init(
    {
      supervisor_notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      supervisor_notification_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      isPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      notification_title: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notification_text: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "notificationText",
          key: "notification_id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "SupervisorNotification",
      tableName: "supervisornotification",
    }
  );

  SupervisorNotification.associate = (models) => {
    /**
     * One Field Executive table will have many notifications
     */
    models.Supervisor.hasMany(SupervisorNotification, {
      foreignKey: "sup_id",
    });

    SupervisorNotification.belongsTo(models.Supervisor, {
      targetKey: "sup_id",
      foreignKey: "sup_id",
    });

    /**
     * One Supervisor table will have many notifications
     */
    models.NotificationText.hasMany(SupervisorNotification, {
      foreignKey: "notification_id",
    });

    SupervisorNotification.belongsTo(models.NotificationText, {
      targetKey: "notification_id",
      foreignKey: "notification_id",
    });
  };

  // /**
  //  * One Field Executive table will have many notifications
  //  */
  // Supervisor.hasMany(SupervisorNotification, {
  //   foreignKey: "sup_id"
  // });

  // SupervisorNotification.belongsTo(Supervisor, {
  //   targetKey: "sup_id",
  //   foreignKey: "sup_id"
  // });

  // /**
  //  * One Supervisor table will have many notifications
  //  */
  // NotificationText.hasMany(SupervisorNotification, {
  //   foreignKey: "notification_id"
  // });

  // SupervisorNotification.belongsTo(NotificationText, {
  //   targetKey: "notification_id",
  //   foreignKey: "notification_id"
  // });
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Packages === sequelize.models.Packages)
  // module.exports = SupervisorNotification;
  return SupervisorNotification;
};
//  SupervisorNotification.sync({ force: true }).then((d) => console.log(d));
