// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Field_Executive = require("../Stakeholders/Field_Executive"),
//   NotificationText = require("./NotificationText");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class ExecutiveNotifications extends Model {}

  ExecutiveNotifications.init(
    {
      execu_notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      execu_notification_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      isPaused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      notification_text: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      field_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "field_executive",
          key: "field_id"
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "notificationText",
          key: "notification_id"
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "ExecutiveNotifications",
      tableName: "executiveNotifications"
    }
  );
  ExecutiveNotifications.associate = (models) => {
    /**
     * One Field Executive table will have many notifications
     */
    models.Field_Executive.hasMany(ExecutiveNotifications, {
      foreignKey: "field_id"
    });

    ExecutiveNotifications.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });
    /**
     * One Field Executive table will have many notifications
     */
    models.NotificationText.hasMany(ExecutiveNotifications, {
      foreignKey: "notification_id"
    });

    ExecutiveNotifications.belongsTo(models.NotificationText, {
      targetKey: "notification_id",
      foreignKey: "notification_id"
    });
  };

  // /**
  //  * One Field Executive table will have many notifications
  //  */
  // Field_Executive.hasMany(ExecutiveNotifications, {
  //   foreignKey: "field_id"
  // });

  // ExecutiveNotifications.belongsTo(Field_Executive, {
  //   targetKey: "field_id",
  //   foreignKey: "field_id"
  // });
  // /**
  //  * One Field Executive table will have many notifications
  //  */
  // NotificationText.hasMany(ExecutiveNotifications, {
  //   foreignKey: "notification_id"
  // });

  // ExecutiveNotifications.belongsTo(NotificationText, {
  //   targetKey: "notification_id",
  //   foreignKey: "notification_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Packages === sequelize.models.Packages)

  // ExecutiveNotifications.bulkCreate([
  //     {
  //         notification_text: 'Some notification',
  //         field_id: 4,
  //         notification_id: 2,
  //     },
  //     {
  //         notification_text: 'Some other notification',
  //         field_id: 4,
  //         notification_id: 1,
  //     },
  //     {
  //         notification_text: 'Whatever notification',
  //         field_id: 4,
  //         notification_id: 1,
  //     },
  //     {
  //         notification_text: 'Some notification',
  //         field_id: 4,
  //         notification_id: 2,
  //     }
  // ])
  // module.exports = ExecutiveNotifications;
  return ExecutiveNotifications;
};
