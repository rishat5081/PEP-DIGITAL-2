"use strict";
const { DataTypes, Model, UUIDV4 } = require("sequelize"),
  sequelize = require("../../Sequelize"),
  Team_Lead = require("../Stakeholders/Team_Lead"),
  NotificationText = require("./NotificationText");

class TeamLead_Notifications extends Model {}

TeamLead_Notifications.init(
  {
    teamLead_notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      validate: {
        max: 11,
        isNumeric: true
      }
    },
    teamLead_notification_uuid: {
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
    notification_text: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    team_L_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: false,
      autoIncrement: false,
      references: {
        model: "team_lead",
        key: "team_L_id"
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
    modelName: "TeamLead_Notifications",
    tableName: "teamLead_Notifications"
  }
);

/**
 * One Field Executive table will have many notifications
 */
Team_Lead.hasMany(TeamLead_Notifications, {
  foreignKey: "team_L_id"
});

TeamLead_Notifications.belongsTo(Team_Lead, {
  targetKey: "team_L_id",
  foreignKey: "team_L_id"
});

/**
 * One Field Executive table will have many notifications
 */
NotificationText.hasMany(TeamLead_Notifications, {
  foreignKey: "notification_id"
});

TeamLead_Notifications.belongsTo(NotificationText, {
  targetKey: "notification_id",
  foreignKey: "notification_id"
});
/*
 *boolean return type which will indicate that the table is defined or not
 */
//console.log(Packages === sequelize.models.Packages)
module.exports = TeamLead_Notifications;
// TeamLead_Notifications.sync({ force: true }).then((d) => console.log(d));
