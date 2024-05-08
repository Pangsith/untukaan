'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order_list extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.order_detail,{foreignKey: "order_id", as: "orderDetail"})
    }
  }
  order_list.init({
    listID: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    customer_name: DataTypes.STRING,
    table_number: DataTypes.STRING,
    order_date: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'order_list',
  });
  return order_list;
};