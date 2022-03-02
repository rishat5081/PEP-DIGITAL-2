"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class AdvertismentGift extends Model {}

  AdvertismentGift.init(
    {
      adver_gift_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      advert_gift_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      adver_gift_name: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      adver_gift_descritpion: {
        type: DataTypes.TEXT,
        allowNull: true,
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
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "AdvertismentGift",
      tableName: "advertismentgift",
    }
  );
  return AdvertismentGift;
};
