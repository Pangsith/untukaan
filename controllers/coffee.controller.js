const coffeeModel = require("../models/index").coffee;
const Op = require("sequelize").Op;
const path = require("path");
const fs = require("fs");

exports.getAllcoffee = async (request, response) => {
  try {
    let coffees = await coffeeModel.findAll();
    return response.json({
      success: true,
      data: coffees,
      message: "All coffees have been loaded",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

exports.findcoffee = async (request, response) => {
  try {
    let keyword = request.params.key;
    let coffees = await coffeeModel.findAll({
      where: {
        [Op.or]: [
          { coffeeID: { [Op.substring]: keyword } },
          { name: { [Op.substring]: keyword } },
          { size: { [Op.substring]: keyword } },
          { price: { [Op.substring]: keyword } },
        ],
      },
    });
    return response.json({
      success: true,
      data: coffees,
      message: "coffee has retrieved",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};

const upload = require("./upload-image").single("image");

exports.addcoffee = (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error });
    }
    if (!request.file) {
      return response.json({ message: "Nothing image to Upload" });
    }

    let newcoffee = {
      name: request.body.name,
      size: request.body.size,
      price: request.body.price,
      image: request.file.filename,
    };

    try {
      let result = await coffeeModel.create(newcoffee);
      return response.json({
        success: true,
        data: result,
        message: "coffee has created",
      });
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
      });
    }
  });
};

exports.updatecoffee = async (request, response) => {
  upload(request, response, async (error) => {
    if (error) {
      return response.json({ message: error });
    }

    let coffeeID = request.params.id;
    let datacoffee = {
      name: request.body.name,
      size: request.body.size,
      price: request.body.price,
    };

    if (request.file) {
      const selectedcoffee = await coffeeModel.findOne({
        where: { coffeeID: coffeeID },
      });

      if (!selectedcoffee) {
        return response.json({
          success: false,
          message: "coffee not found",
        });
      }

      const oldImage = selectedcoffee.image;
      const pathImage = path.join(__dirname, "../image", oldImage);
      if (fs.existsSync(pathImage)) {
        fs.unlink(pathImage, (error) => console.log(error));
      }
      datacoffee.image = request.file.filename;
    }

    try {
      await coffeeModel.update(datacoffee, { where: { coffeeID: coffeeID } });
      return response.json({
        success: true,
        message: "coffee has updated",
      });
    } catch (error) {
      return response.json({
        success: false,
        message: error.message,
      });
    }
  });
};

exports.deletecoffee = async (request, response) => {
  try {
    const coffeeID = request.params.id;
    const coffee = await coffeeModel.findOne({
      where: { coffeeID: coffeeID },
    });
    const oldImage = coffee.image;
    const pathImage = path.join(__dirname, "../image", oldImage);

    if (fs.existsSync(pathImage)) {
      fs.unlink(pathImage, (error) => console.log(error));
    }

    await coffeeModel.destroy({ where: { coffeeID: coffeeID } });

    return response.json({
      success: true,
      message: "Data coffee has been deleted",
    });
  } catch (error) {
    return response.json({
      success: false,
      message: error.message,
    });
  }
};
