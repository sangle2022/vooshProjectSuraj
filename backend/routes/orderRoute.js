const express = require("express");
const {
  addOrderItem,

  getMyOrders,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/authMiddleware");
const router = express.Router();

//getUserOrder
router.route("/myorders").get(protect, getMyOrders);

router.route("/").post(protect, addOrderItem);

module.exports = router;
