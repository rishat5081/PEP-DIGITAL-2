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
      //   adver_stock_image: {
      //     type: DataTypes.TEXT,
      //     allowNull: true,
      //   },
      //   adver_stock_total_Quantity: {
      //     type: DataTypes.INTEGER,
      //     allowNull: true,
      //   },
      //   adver_stock_used: {
      //     type: DataTypes.INTEGER,
      //     allowNull: true,
      //   },
      //   adver_stock_total_Price: {
      //     type: DataTypes.FLOAT,
      //     allowNull: true,
      //   },
      //   adver_stock_Price_per_piece: {
      //     type: DataTypes.FLOAT,
      //     allowNull: true,
      //   },
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
      //   man_id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //     primaryKey: false,
      //     autoIncrement: false,
      //     references: {
      //       model: "managers",
      //       key: "man_id",
      //     },
      //     onDelete: "CASCADE",
      //     onUpdate: "CASCADE",
      //   },
      //   req_adver: {
      //     type: DataTypes.INTEGER,
      //     allowNull: true,
      //     primaryKey: false,
      //     autoIncrement: false,
      //     references: {
      //       model: "request_of_advertisement",
      //       key: "req_adver",
      //     },
      //     onUpdate: "CASCADE",
      //     onDelete: "CASCADE",
      //   },
    },
    {
      hooks: {},
      sequelize,
      // We need to pass the connection instance
      modelName: "AdvertismentGift",
      tableName: "AdvertismentGift",
    }
  );

  AdvertismentGift.associate = (models) => {
    /**
     * The AdvertismentGift is made because of the requests
     * so that is why it is linked which requests are fulfilled
     */
    // models.Request_of_Advertisement.hasMany(AdvertismentGift, {
    //   foreignKey: "req_adver",
    // });
    // AdvertismentGift.belongsTo(models.Request_of_Advertisement, {
    //   targetKey: "req_adver",
    //   foreignKey: "req_adver",
    // });
    // models.Managers.hasMany(AdvertismentGift, { foreignKey: "man_id" });
    // AdvertismentGift.belongsTo(models.Managers, {
    //   targetKey: "man_id",
    //   foreignKey: "man_id",
    // });
  };
//   AdvertismentGift.sync({force:true}).then(a => console.log(a))
  return AdvertismentGift;
};
