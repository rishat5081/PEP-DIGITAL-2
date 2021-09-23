// 'use strict'
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require('sequelize'),
//     sequelize = require('../../Sequelize')

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class NotificationText extends Model {}

  NotificationText.init(
    {
      notification_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      notification_uuid: {
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
      notification_title: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      notification_icon: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      isRead: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "NotificationText",
      tableName: "notificationText"
    }
  );

  // NotificationText.create({
  //     notification_title: 'Created New Agency',
  //     notification_text: 'Created New Agency',
  //     notification_icon: 'fa fa-home'
  // })
  // NotificationText.sync({ force: true }).then(d => console.log(d))
  // module.exports = NotificationText
  return NotificationText;
};
