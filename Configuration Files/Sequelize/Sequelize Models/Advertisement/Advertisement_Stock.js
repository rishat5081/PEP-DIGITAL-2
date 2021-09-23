// const { DataTypes, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Request_of_Advertisement = require("./Request_of_Advertisement");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Advertisement_Stock extends Model {}

  Advertisement_Stock.init(
    {
      adver_stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      advert_stock_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      adver_stock_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      adver_stock_descritpion: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      adver_stock_image: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      adver_stock_total_Quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      adver_stock_used: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      adver_stock_total_Price: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      adver_stock_Price_per_piece: {
        type: DataTypes.FLOAT,
        allowNull: true
      },
      paused: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      req_adver: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "request_of_advertisement",
          key: "req_adver"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Advertisement_Stock",
      tableName: "advertising_stock"
    }
  );

  Advertisement_Stock.associate = (models) => {
    /**
     * The Advertisement_Stock is made because of the requests
     * so that is why it is linked which requests are fulfilled
     */
    models.Request_of_Advertisement.hasMany(Advertisement_Stock, {
      foreignKey: "req_adver"
    });

    Advertisement_Stock.belongsTo(models.Request_of_Advertisement, {
      targetKey: "req_adver",
      foreignKey: "req_adver"
    });
  };

  // /**
  //  * The Advertisement_Stock is made because of the requests
  //  * so that is why it is linked which requests are fulfilled
  //  */
  // Request_of_Advertisement.hasMany(Advertisement_Stock, {
  //   foreignKey: "req_adver"
  // });

  // Advertisement_Stock.belongsTo(Request_of_Advertisement, {
  //   targetKey: "req_adver",
  //   foreignKey: "req_adver"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Advertisement_Stock === sequelize.models.Advertisement_Stock)
  // module.exports = Advertisement_Stock;
  return Advertisement_Stock;
};
