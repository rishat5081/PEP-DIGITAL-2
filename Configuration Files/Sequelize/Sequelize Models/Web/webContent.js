"use strict";
module.exports = (sequelize, { DataTypes, Model, UUIDV4 }) => {
  // const { DataTypes, Model, UUIDV4 } = require('sequelize'),
  //     sequelize = require('../../Sequelize'),
  //     Super_Admin = require('../Stakeholders/Super_Admin')

  class Web_Content extends Model {}

  Web_Content.init(
    {
      web_content_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      web_content_uuid: {
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
      logo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      firstHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      secondHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thirdHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      firstHeadingText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      secondHeadingText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thirdHeadingText: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      signUpbtn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      loginbtn: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      firstCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      firstCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      secondCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      secondCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thirdCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      thirdCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fourthCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fourthCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fifthCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      fifthCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sixthCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sixthCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      seventhCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      seventhCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      eighthCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      eighthCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ninthCardHeading: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      ninthCardtext: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      sa_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: false,
        autoIncrement: false,
        validate: {
          max: 11,
          isNumeric: true,
        },
        references: {
          model: "super_admin",
          key: "sa_id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      footer_heading_one: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_second: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_third: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_fourth: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_fifth: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_one_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_second_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_third_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_fourth_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      footer_heading_fifth_content: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      backgroundVideo: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      // We need to pass the connection instance
      modelName: "Web_Content",
      tableName: "web_content",
    }
  );

  Web_Content.associate = (models) => {
    models.Super_Admin.hasOne(Web_Content, {
      foreignKey: "sa_id",
    });

    Web_Content.belongsTo(models.Super_Admin, {
      targetKey: "sa_id",
      foreignKey: "sa_id",
    });
  };

  // Super_Admin.hasOne(Web_Content, {
  //     foreignKey: 'sa_id'
  // })

  // Web_Content.belongsTo(Super_Admin, {
  //     targetKey: 'sa_id',
  //     foreignKey: 'sa_id'
  // })
  // Web_Content.sync({ force: true }).then(sb => console.log(sb))
  /*
   *boolean return type which will indicate that the table is defined or not
   */
  //console.log(User_Login_Information === sequelize.models.User_Login_Information)
  // module.exports = Web_Content

  return Web_Content;
};
