// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Team_Lead_Adver_Stock = require("../Team Lead/Team_Lead_Adver_Stock"),
//   Field_Executive = require("../Stakeholders/Field_Executive");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Executive_Adver_Stock_Info extends Model {}

  Executive_Adver_Stock_Info.init(
    {
      field_e_stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      field_e_stock_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      total_Quantity: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      team_adver_stock_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "teaml_adver_stock",
          key: "team_adver_stock_id"
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE"
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
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Executive_Adver_Stock_Info",
      tableName: "executive_advert_stock"
    }
  );

  Executive_Adver_Stock_Info.associate = (models) => {
    /**
     * team lead will give many stock to executive to promote
     */
    models.Team_Lead_Adver_Stock.hasMany(Executive_Adver_Stock_Info, {
      foreignKey: "team_adver_stock_id"
    });

    Executive_Adver_Stock_Info.belongsTo(models.Team_Lead_Adver_Stock, {
      targetKey: "team_adver_stock_id",
      foreignKey: "team_adver_stock_id"
    });

    /**
     * one field executive will be assigned many stock
     */
    models.Field_Executive.hasMany(Executive_Adver_Stock_Info, {
      foreignKey: "field_id"
    });

    Executive_Adver_Stock_Info.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });
  };

  // /**
  //  * team lead will give many stock to executive to promote
  //  */
  // Team_Lead_Adver_Stock.hasMany(Executive_Adver_Stock_Info, {
  //   foreignKey: "team_adver_stock_id"
  // });

  // Executive_Adver_Stock_Info.belongsTo(Team_Lead_Adver_Stock, {
  //   targetKey: "team_adver_stock_id",
  //   foreignKey: "team_adver_stock_id"
  // });

  // /**
  //  * one field executive will be assigned many stock
  //  */
  // Field_Executive.hasMany(Executive_Adver_Stock_Info, {
  //   foreignKey: "field_id"
  // });

  // Executive_Adver_Stock_Info.belongsTo(Field_Executive, {
  //   targetKey: "field_id",
  //   foreignKey: "field_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  // console.log(
  //   Executive_Adver_Stock_Info === sequelize.models.Executive_Adver_Stock_Info
  // )
  // module.exports = Executive_Adver_Stock_Info;
  return Executive_Adver_Stock_Info;
};
