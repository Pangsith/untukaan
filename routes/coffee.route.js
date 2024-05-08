const express = require("express");
const app = express();
app.use(express.json());
const coffeeController = require("../controllers/coffee.controller");
const { authorize } = require("../controllers/auth.controller");

app.post("/", coffeeController.addcoffee);
app.put("/:id", coffeeController.updatecoffee);
app.delete("/:id", coffeeController.deletecoffee);
app.get("/:key", coffeeController.findcoffee);
app.get("/", coffeeController.getAllcoffee);

module.exports = app;
