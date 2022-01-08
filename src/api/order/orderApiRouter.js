const express = require('express');
const router = express.Router();

const controller = require("./orderApiController");

router.get("/sales", controller.getSales);

module.exports = router;