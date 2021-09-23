// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Field_Executive = require("../Stakeholders/Field_Executive"),
//   Agency_Info = require("../Agency Models/Agency_Info"),
//   Executive_Adver_Stock_Info = require("./Executive_Adver_Stock_Info");
"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Stock_Usage extends Model {}

  Stock_Usage.init(
    {
      stock_Usage_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      stock_Usage_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      stock_Usage_dateTime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      stock_Usage_given: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          max: 11,
          isNumeric: true
        }
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
        validate: {
          max: 11,
          isNumeric: true
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      agency_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "agency_info",
          key: "agency_id"
        },
        validate: {
          max: 11,
          isNumeric: true
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      field_e_stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "executive_advert_stock",
          key: "field_e_stock_id"
        },
        validate: {
          max: 11,
          isNumeric: true
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Stock_Usage",
      tableName: "executive_stock_usage"
    }
  );

  Stock_Usage.associate = (models) => {
    /**
     * One field executive will give many advertisment stock
     */

    models.Field_Executive.hasMany(Stock_Usage, {
      foreignKey: "field_id"
    });

    Stock_Usage.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });

    /**
     * One field executive will give many advertisment stock to many agencies
     */

    models.Agency_Info.hasMany(Stock_Usage, {
      foreignKey: "agency_id"
    });

    Stock_Usage.belongsTo(models.Agency_Info, {
      targetKey: "agency_id",
      foreignKey: "agency_id"
    });

    /**
     * One field executive will use many advertisment items
     * from its allocated stock
     */

    models.Executive_Adver_Stock_Info.hasMany(Stock_Usage, {
      foreignKey: "field_e_stock_id"
    });

    Stock_Usage.belongsTo(models.Executive_Adver_Stock_Info, {
      targetKey: "field_e_stock_id",
      foreignKey: "field_e_stock_id"
    });
  };

  // /**
  //  * One field executive will give many advertisment stock
  //  */

  // Field_Executive.hasMany(Stock_Usage, {
  //   foreignKey: "field_id"
  // });

  // Stock_Usage.belongsTo(Field_Executive, {
  //   targetKey: "field_id",
  //   foreignKey: "field_id"
  // });

  // /**
  //  * One field executive will give many advertisment stock to many agencies
  //  */

  // Agency_Info.hasMany(Stock_Usage, {
  //   foreignKey: "agency_id"
  // });

  // Stock_Usage.belongsTo(Agency_Info, {
  //   targetKey: "agency_id",
  //   foreignKey: "agency_id"
  // });

  // /**
  //  * One field executive will use many advertisment items
  //  * from its allocated stock
  //  */

  // Executive_Adver_Stock_Info.hasMany(Stock_Usage, {
  //   foreignKey: "field_e_stock_id"
  // });

  // Stock_Usage.belongsTo(Executive_Adver_Stock_Info, {
  //   targetKey: "field_e_stock_id",
  //   foreignKey: "field_e_stock_id"
  // });

  //Stock_Usage.sync({ force: true }).then(re => //console.log(re))

  // setInterval(()=>{
  //     //console.log("Hello")
  // },1000)

  // setTimeout(()=>{
  //     //console.log("Hello")
  // },500)
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Stock_Usage === sequelize.models.Stock_Usage)
  // module.exports = Stock_Usage;
  return Stock_Usage;
};
