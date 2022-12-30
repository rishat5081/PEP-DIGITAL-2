// "use strict";
// const { { DataTypes, Model, UUIDV4 }, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   GM_Company = require("../Stakeholders/GM_Company");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Company_Promotion extends Model {}

  Company_Promotion.init(
    {
      comp_prom_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      comp_prom_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      comp_prom_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      comp_prom_desc: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      prom_status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValues: false
      },
      prom_deleted: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValues: false
      },
      gm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,

        references: {
          model: "company_gm_info",
          key: "gm_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Company_Promotion",
      tableName: "company_promotions"
    }
  );

  //Company_Promotion.sync({ force: true }).then(re => console.log(re))

  /**
   * GM can start many Company Promotions
   */
  Company_Promotion.associate = (models) => {
    models.GM_Company.hasMany(Company_Promotion, { foreignKey: "gm_id" });

    Company_Promotion.belongsTo(models.GM_Company, {
      targetKey: "gm_id",
      foreignKey: "gm_id"
    });
  };

  // GM_Company.hasMany(Company_Promotion, { foreignKey: "gm_id" });

  // Company_Promotion.belongsTo(GM_Company, {
  //   targetKey: "gm_id",
  //   foreignKey: "gm_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Company_Promotion === sequelize.models.Company_Promotion)
  // module.exports = Company_Promotion;
  return Company_Promotion;
};
