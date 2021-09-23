// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Activities = require("../Lists of Packages/Activities"),
//   Field_Executive = require("../Stakeholders/Field_Executive");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Executive_Pending_Earning extends Model {}

  Executive_Pending_Earning.init(
    {
      field_exe_earn_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      field_exe_earn_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
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
      withdrawed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      bankName: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
      },
      depositedAmount: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
      },
      totalAmount: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
      },
      bank_sale: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      bank_deposited: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      bank_deposited_referenceNumber: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      bank_datetime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      accountant_approve: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      account_approve_datetime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      account_decline: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },
      account_decline_dateTime: {
        type: DataTypes.DATE,
        allowNull: true
      },
      account_decline_reason: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      clearanceDateTime: {
        type: DataTypes.DATE,
        allowNull: true
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
      },
      list_act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "activities",
          key: "list_act_id"
        },

        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Executive_Pending_Earning",
      tableName: "field_executive_pending_earning"
    }
  );

  Executive_Pending_Earning.associate = (models) => {
    /**
     * one Field_Executive can have many earning
     */
    models.Field_Executive.hasMany(Executive_Pending_Earning, {
      foreignKey: "field_id"
    });

    Executive_Pending_Earning.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });

    /**
     * one Field_Executive can have many earning
     */
    models.Activities.hasMany(Executive_Pending_Earning, {
      foreignKey: "list_act_id"
    });

    Executive_Pending_Earning.belongsTo(models.Activities, {
      targetKey: "list_act_id",
      foreignKey: "list_act_id"
    });
  };

  // /**
  //  * one Field_Executive can have many earning
  //  */
  // Field_Executive.hasMany(Executive_Pending_Earning, {
  //   foreignKey: "field_id"
  // });

  // Executive_Pending_Earning.belongsTo(Field_Executive, {
  //   targetKey: "field_id",
  //   foreignKey: "field_id"
  // });

  // /**
  //  * one Field_Executive can have many earning
  //  */
  // Activities.hasMany(Executive_Pending_Earning, {
  //   foreignKey: "list_act_id"
  // });

  // Executive_Pending_Earning.belongsTo(Activities, {
  //   targetKey: "list_act_id",
  //   foreignKey: "list_act_id"
  // });
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Executive_Pending_Earning === sequelize.models.Executive_Pending_Earning)
  // module.exports = Executive_Pending_Earning;
  // Executive_Pending_Earning.sync({ force: true })
  //   .then(response => {
  //     if (response) {
  //       console.log(`\x1b[42m--------------------------------------\x1b[0m` + response);
  //     }
  //   })

  return Executive_Pending_Earning;
};
