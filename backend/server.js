const express = require("express");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
require("colors");

const dotenv = require("dotenv");
const connectDb = require("./config/config");

const usersRoutes = require("./routes/UsersRoute");
const orderRoutes = require("./routes/orderRoute");

dotenv.config();

connectDb();
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>Welcome to Node Server</h1>");
});
app.use(cors());

app.use("/api/users", usersRoutes);
app.use("/api/orders", orderRoutes);

app.use(errorHandler);

const PORT = 8080;
app.listen(process.env.PORT || PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} Mode on Port ${process.env.PORT}`
      .inverse
  );
});
