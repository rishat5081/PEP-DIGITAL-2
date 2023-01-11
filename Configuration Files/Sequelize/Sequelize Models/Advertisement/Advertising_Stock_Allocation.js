// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Supervisor = require("../Stakeholders/Supervisor"),
//   Managers = require("../Stakeholders/Managers"),
//   Advertisement_Stock = require("./Advertisement_Stock");
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  const Advertisement_Stock = require("./Advertisement_Stock")(sequelize, {
    DataTypes,
    Model,
    UUIDV4,
  });
  class Advertising_Stock_Allocation extends Model {}

  Advertising_Stock_Allocation.init(
    {
      adver_stock_act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      adver_stock_alloc_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
      },
      adver_stock_allocated_Quantity: {
        type: DataTypes.INTEGER,
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
      isConsumed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      used: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        defaultValue: 0,
        autoIncrement: false,
      },
      adver_stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "advertising_stock",
          key: "adver_stock_id",
        },
      },
      sup_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "supervisor",
          key: "sup_id",
        },
      },
      man_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "managers",
          key: "man_id",
        },
      },
      
    },
    {
      hooks: {
        afterCreate: (stock, options) => {
          Advertisement_Stock.increment(["adver_stock_used"], {
            by: stock.dataValues.adver_stock_allocated_Quantity,
            where: {
              adver_stock_id: stock.dataValues.adver_stock_id,
            },
          });
        },
      },
      sequelize,
      // We need to pass the connection instance
      modelName: "Advertising_Stock_Allocation",
      tableName: "advertising_stock_allocation",
    }
  );

  Advertising_Stock_Allocation.associate = (models) => {
    /**
     * one manervisor got many stock which is allocated to him
     */
    models.Supervisor.hasMany(Advertising_Stock_Allocation, {
      foreignKey: "sup_id",
    });

    Advertising_Stock_Allocation.belongsTo(models.Supervisor, {
      targetKey: "sup_id",
      foreignKey: "sup_id",
    });

    /**
     * one manervisor got many stock which is allocated to him
     */
    models.Managers.hasMany(Advertising_Stock_Allocation, {
      foreignKey: "man_id",
    });

    Advertising_Stock_Allocation.belongsTo(models.Managers, {
      targetKey: "man_id",
      foreignKey: "man_id",
    });

    /**
     * which stock is allocated to the supervisor is record here
     */
    models.Advertisement_Stock.hasMany(Advertising_Stock_Allocation, {
      foreignKey: "adver_stock_id",
    });

    Advertising_Stock_Allocation.belongsTo(models.Advertisement_Stock, {
      targetKey: "adver_stock_id",
      foreignKey: "adver_stock_id",
    });
  };
  // /**
  //  * one manervisor got many stock which is allocated to him
  //  */
  // Supervisor.hasMany(Advertising_Stock_Allocation, {
  //   foreignKey: "sup_id"
  // });

  // Advertising_Stock_Allocation.belongsTo(Supervisor, {
  //   targetKey: "sup_id",
  //   foreignKey: "sup_id"
  // });

  // /**
  //  * one manervisor got many stock which is allocated to him
  //  */
  // Managers.hasMany(Advertising_Stock_Allocation, {
  //   foreignKey: "man_id"
  // });

  // Advertising_Stock_Allocation.belongsTo(Managers, {
  //   targetKey: "man_id",
  //   foreignKey: "man_id"
  // });

  // /**
  //  * which stock is allocated to the supervisor is record here
  //  */
  // Advertisement_Stock.hasMany(Advertising_Stock_Allocation, {
  //   foreignKey: "adver_stock_id"
  // });

  // Advertising_Stock_Allocation.belongsTo(Advertisement_Stock, {
  //   targetKey: "adver_stock_id",
  //   foreignKey: "adver_stock_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  // console.log(
  //   Advertising_Stock_Allocation === sequelize.models.Advertising_Stock_Allocation
  // )
  // module.exports = Advertising_Stock_Allocation;

  return Advertising_Stock_Allocation;
};

// // Advertising_Stock_Allocation.sync({force:true})
// // .then((stock) => {
// //     console.log(stock);
// //   });
// Advertisement_Stock.sync({ force: true })
//.then((stock) => {
//   console.log(stock);
// });
