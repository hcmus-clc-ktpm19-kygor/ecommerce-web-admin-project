const express = require('express');
const router = express.Router();

const controller = require("./orderApiController");

router.get("/sales", controller.getSales);
router.get("/sales-in-last-10-days", controller.getSalesInLast10Days);

module.exports = router;