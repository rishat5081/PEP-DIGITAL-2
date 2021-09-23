// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Companies_Access = require("../Company/Companies_Access"),
//   Zone = require("../Zone");
"use strict";
module.exports = (sequelize, { DataTypes,  UUIDV4 }) => {
  const GM_Company = sequelize.define(
    "GM_Company",
    {
      gm_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      gm_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      gm_name: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      gm_email: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      gm_password: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      gm_contact: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      gm_profile_pic: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      gm_salary: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      gm_member_Since: {
        type: DataTypes.DATE,
        allowNull: true
      },
      comp_access_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: "companies_access",
          key: "comp_access_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      zone_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true
        },
        references: {
          model: "zone",
          key: "zone_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "GM_Company",
      tableName: "company_gm_info"
    }
  );

  //GM_Company.sync({ force: true }).then(re => //console.log(re))
  GM_Company.associate = (models) => {
    /**One GM has one company */
    models.Companies_Access.hasOne(GM_Company, {
      foreignKey: "comp_access_id"
    });

    GM_Company.belongsTo(models.Companies_Access, {
      targetKey: "comp_access_id",
      foreignKey: "comp_access_id"
    });

    /**One Zone has only one GM  */
    models.Zone.hasOne(GM_Company, { foreignKey: "zone_id" });

    GM_Company.belongsTo(models.Zone, {
      targetKey: "zone_id",
      foreignKey: "zone_id"
    });
  };

  // /**One GM has one company */
  // Companies_Access.hasOne(GM_Company, { foreignKey: "comp_access_id" });

  // GM_Company.belongsTo(Companies_Access, {
  //   targetKey: "comp_access_id",
  //   foreignKey: "comp_access_id"
  // });

  // /**One Zone has only one GM  */
  // Zone.hasOne(GM_Company, { foreignKey: "zone_id" });

  // GM_Company.belongsTo(Zone, {
  //   targetKey: "zone_id",
  //   foreignKey: "zone_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(GM_Company === sequelize.models.GM_Company)
  // module.exports = GM_Company;
  return GM_Company;
};
