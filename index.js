const express = require(`express`);
const app = express();
const cors = require(`cors`);
app.use(cors());

const admin = require(`./routes/admin.route`);
app.use(`/admin`, admin);

const coffee = require(`./routes/coffee.route`);
app.use(`/coffee`, coffee);

const order = require(`./routes/order.route`);
app.use(`/order`, order);

const PORT = 8000;
app.listen(PORT, () => {
  console.log(`Server of Ticket Sales runs on port ${PORT}`);
});
