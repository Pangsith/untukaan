const coffeeModel = require(`../models/index`).coffee;
const listModel = require(`../models/index`).order_list;
const detailModel = require(`../models/index`).order_detail;

const Op = require(`sequelize`).Op;

exports.addOrder = async (request, response) => {
  try {
    const today = request.body.tanggal;

    const dataOrderList = {
      customer_name: request.body.customer_name,
      table_number: request.body.table_number,
      order_date: today,
    };

    // console.log(dataOrderList);
    const newOrderList = await listModel.create(dataOrderList);

    const banyakcoffee = request.body.banyakcoffee;
    /*
        [
            {
                coffeeID: 1,
                kuantitas: 2
            },
            {
                coffeeID: 2,
                kuantitas: 3
            }
        ]
        */

    for (let index = 0; index < banyakcoffee.length; index++) {
      const coffeeData = await coffeeModel.findOne({
        where: { coffeeID: banyakcoffee[index].coffeeID },
      });
      // console.log(coffeeData);
      if (!coffeeData) {
        return response.json({
          success: false,
          message: "ID coffee tidak ada di database",
        });
      }
      let newDetail = {
        order_id: newOrderList.listID,
        coffee_id: coffeeData.coffeeID,
        quantity: banyakcoffee[index].quantity,
        price: coffeeData.price * banyakcoffee[index].quantity,
      };

      await detailModel.create(newDetail);
    }

    return response.json({
      success: true,
      message: "Data inserted",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

exports.showHistory = async (request, response) => {
  try {
    const jumlahData = await listModel.findAll({
      include:[{
        model: detailModel,
        as: "orderDetail"
      }]
    });


    return response.json({
      success: true,
      data: jumlahData,
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};
