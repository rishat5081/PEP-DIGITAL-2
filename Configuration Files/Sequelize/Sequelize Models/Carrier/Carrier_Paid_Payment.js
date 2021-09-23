// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Payment_Carrier_Services = require("./Payment_Carrier_Services"),
//   Super_Admin = require("../Stakeholders/Super_Admin");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Carrier_Paid_Payment extends Model {}

  Carrier_Paid_Payment.init(
    {
      c_paid_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      carrier_paid_pay_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
      },
      c_amount: {
        type: DataTypes.DOUBLE,
        allowNull: true
      },
      sa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "super_admin",
          key: "sa_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      c_s_payment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "carriers_services_payment",
          key: "c_s_payment_id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Carrier_Paid_Payment",
      tableName: "carriers_paid_payment"
    }
  );

  //Carrier_Paid_Payment.sync({ force: true }).then(re => console.log(re))
  Carrier_Paid_Payment.associate = (models) => {
    /**One service payment have many payments like a total
     *  payment and this table is used to hold all the payments which are made
     */

    models.Payment_Carrier_Services.hasMany(Carrier_Paid_Payment, {
      foreignKey: "c_s_payment_id"
    });

    Carrier_Paid_Payment.belongsTo(models.Payment_Carrier_Services, {
      targetKey: "c_s_payment_id",
      foreignKey: "c_s_payment_id"
    });

    /**Who made this payment which will be the super admin  */

    models.Super_Admin.hasMany(Carrier_Paid_Payment, {
      foreignKey: "sa_id"
    });

    Carrier_Paid_Payment.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id"
    });
  };

  // /**One service payment have many payments like a total
  //  *  payment and this table is used to hold all the payments which are made
  //  */

  // Payment_Carrier_Services.hasMany(Carrier_Paid_Payment, {
  //   foreignKey: "c_s_payment_id"
  // });

  // Carrier_Paid_Payment.belongsTo(Payment_Carrier_Services, {
  //   targetKey: "c_s_payment_id",
  //   foreignKey: "c_s_payment_id"
  // });

  // /**Who made this payment which will be the super admin  */

  // Super_Admin.hasMany(Carrier_Paid_Payment, {
  //   foreignKey: "sa_id"
  // });

  // Carrier_Paid_Payment.belongsTo(Super_Admin, {
  //   targetKey: "sa_id",
  //   foreignKey: "sa_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Carrier_Paid_Payment === sequelize.models.Carrier_Paid_Payment)
  // module.exports = Carrier_Paid_Payment;
  return Carrier_Paid_Payment;
};
