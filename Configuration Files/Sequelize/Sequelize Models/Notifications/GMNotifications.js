"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class GM_Notifications extends Model {}

  GM_Notifications.init(
    {
      gm_Company_notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      gm_Company_notification_uuid: {
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
      gm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "company_gm_info",
          key: "gm_id",
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "GM_Notifications",
      tableName: "gm_notifications",
    }
  );

  GM_Notifications.associate = (models) => {
    /**
     * One Manager table will have many notifications
     */
    models.GM_Company.hasMany(GM_Notifications, {
      foreignKey: "gm_id",
    });

    GM_Notifications.belongsTo(models.GM_Company, {
      targetKey: "gm_id",
      foreignKey: "gm_id",
    });


  /**
  * One GM table will have many notifications
  */
 models.NotificationText.hasMany(GM_Notifications, {
   foreignKey: "notification_id",
 });

 GM_Notifications.belongsTo(models.NotificationText, {
   targetKey: "notification_id",
   foreignKey: "notification_id",
 });
};

  // /**
  //  * One Manager table will have many notifications
  //  */
  // GM_Company.hasMany(GM_Notifications, {
  //     foreignKey: 'gm_id'
  // })

  // GM_Notifications.belongsTo(GM_Company, {
  //     targetKey: 'gm_id',
  //     foreignKey: 'gm_id'
  // })

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Packages === sequelize.models.Packages)
  // module.exports = GM_Notifications
  return GM_Notifications;
};
