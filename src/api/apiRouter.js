const express = require('express');
const router = express.Router();

const orderApiRouter = require("./order/orderApiRouter");

router.use("/order", orderApiRouter);

module.exports = router;