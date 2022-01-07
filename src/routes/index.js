const express = require('express');
const router = express.Router();

const orderService = require("../components/order/orderService");

/* GET home page. */
router.get('/', async function(req, res, next) {
  res.render("index");
});

module.exports = router;
