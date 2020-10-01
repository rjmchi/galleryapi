"use strict";
const { Model, INTEGER } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Album, { foreignKey: "album_id" });
    }
  }
  Image.init(
    {
      filename: { type: DataTypes.STRING, allowNull: false },
      caption: DataTypes.STRING,
      description: DataTypes.STRING,
      album_id: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};
