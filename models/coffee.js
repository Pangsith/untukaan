"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class coffee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.order_detail, {foreignKey:"coffee_id"})
    }
  }
  coffee.init(
    {
      coffeeID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      name: DataTypes.STRING,
      size: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "coffee",
    }
  );
  return coffee;
};
