// "use strict";
// const { { DataTypes, Model, UUIDV4 }, Model, UUIDV4 } = require("sequelize"),
//   sequelize = require("../../Sequelize"),
//   Field_Executive = require("../Stakeholders/Field_Executive"),
//   Agency_Info = require("../Agency Models/Agency_Info"),
//   Compaigns = require("../Compaign/Compaigns");

"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  class Activities extends Model {}

  Activities.init(
    {
      list_act_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        validate: {
          max: 11,
          isNumeric: true
        }
      },
      list_act_uuid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        autoIncrement: false,
        primaryKey: false
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
      comp_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        references: {
          model: "compaigns",
          key: "comp_id"
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
        onDelete: "CASCADE",
        onUpdate: "CASCADE"
      },
      withdrawn: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
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
      cancelled: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false
      }
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Activities",
      tableName: "Activities"
    }
  );

  Activities.associate = (models) => {
    /**
     * field executive will have many activites by reading list
     * to each agency
     */
    models.Field_Executive.hasMany(Activities, {
      foreignKey: "field_id"
    });

    Activities.belongsTo(models.Field_Executive, {
      targetKey: "field_id",
      foreignKey: "field_id"
    });

    /**
     * field executive will have many activites by reading list
     * to each agency
     */
    models.Agency_Info.hasMany(Activities, {
      foreignKey: "agency_id"
    });

    Activities.belongsTo(models.Agency_Info, {
      targetKey: "agency_id",
      foreignKey: "agency_id"
    });

    /**
     * field executive will have allocate the which activities
     * and will have which activity is going on and by reading lists
     * to track all the lists
     **/
    models.Compaigns.hasMany(Activities, {
      foreignKey: "comp_id"
    });

    Activities.belongsTo(models.Compaigns, {
      targetKey: "comp_id",
      foreignKey: "comp_id"
    });
  };
  // /**
  //  * field executive will have many activites by reading list
  //  * to each agency
  //  */
  // Field_Executive.hasMany(Activities, {
  //   foreignKey: "field_id"
  // });

  // Activities.belongsTo(Field_Executive, {
  //   targetKey: "field_id",
  //   foreignKey: "field_id"
  // });

  // /**
  //  * field executive will have many activites by reading list
  //  * to each agency
  //  */
  // Agency_Info.hasMany(Activities, {
  //   foreignKey: "agency_id"
  // });

  // Activities.belongsTo(Agency_Info, {
  //   targetKey: "agency_id",
  //   foreignKey: "agency_id"
  // });

  // /**
  //  * field executive will have allocate the which activities
  //  * and will have which activity is going on and by reading lists
  //  * to track all the lists
  //  **/
  // Compaigns.hasMany(Activities, {
  //   foreignKey: "comp_id"
  // });

  // Activities.belongsTo(Compaigns, {
  //   targetKey: "comp_id",
  //   foreignKey: "comp_id"
  // });

  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(Activities === sequelize.models.Activities)
  // module.exports = Activities;
  return Activities;
};
