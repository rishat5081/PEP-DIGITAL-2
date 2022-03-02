// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Super_Admin = require("../Stakeholders/Super_Admin"),
//   Banks_List = require("./Banks_List");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class PEP_Banks_Details extends Model {}

  PEP_Banks_Details.init(
    {
      PEP_Banks_Details_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      PEP_Banks_Details_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false,
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
      bankAccount: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bankIBAN: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bankBranchCode: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      bankAddress: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "super_admin",
          key: "sa_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      Banks_List_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "banks_list",
          key: "Banks_List_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "PEP_Banks_Details",
      tableName: "pep_banks_details",
    }
  );

  PEP_Banks_Details.associate = (models) => {
    models.Banks_List.hasOne(PEP_Banks_Details, {
      foreignKey: "Banks_List_id",
    });

    PEP_Banks_Details.belongsTo(models.Banks_List, {
      targetKey: "Banks_List_id",
      foreignKey: "Banks_List_id",
    });

    models.Super_Admin.hasOne(PEP_Banks_Details, {
      foreignKey: "sa_id",
    });

    PEP_Banks_Details.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id",
    });
  };

  //   Banks_List.hasOne(PEP_Banks_Details, {
  //     foreignKey: "Banks_List_id"
  //   });

  //   PEP_Banks_Details.belongsTo(Banks_List, {
  //     targetKey: "Banks_List_id",
  //     foreignKey: "Banks_List_id"
  //   });

  //   Super_Admin.hasOne(PEP_Banks_Details, {
  //     foreignKey: "sa_id"
  //   });

  //   PEP_Banks_Details.belongsTo(Super_Admin, {
  //     targetKey: "sa_id",
  //     foreignKey: "sa_id"
  //   });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(User_Login_Information === sequelize.models.User_Login_Information)
  // module.exports = PEP_Banks_Details;
  return PEP_Banks_Details;
};

// PEP_Banks_Details.sync({ force: true })
//     .then(a => console.info(a))

// PEP_Banks_Details.create({
//     bankAccount: '821000000000000120',
//     bankIBAN: 'PKIBAN 92821000000000000120',
//     bankBranchCode: '8210',
//     bankAddress: 'Chandani Chowk',
//     sa_id: 1,
//     Banks_List_id: 23
// })
//     .then(a => console.info(a))
