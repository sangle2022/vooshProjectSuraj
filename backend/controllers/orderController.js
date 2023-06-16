const asyncHandler = require("express-async-handler");
const Order = require("../models/OrderModel");

const addOrderItem = asyncHandler(async (req, res) => {
  const { sub_total } = req.body;
  if (!sub_total) {
    console.log("sub_total", sub_total);
    res.status(400);
    throw new Error("No Order Found");
    return;
  } else {
    const order = new Order({
      user: req.user._id,
      name: req.user.name,
      sub_total,
      phoneNumber: req.user.phoneNumber,
    });

    const createOrder = await order.save();
    res.status(201).json(createOrder);
  }
});

const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

module.exports = { addOrderItem, getMyOrders };
