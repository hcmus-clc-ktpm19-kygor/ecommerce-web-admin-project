const express = require('express');
const router = express.Router();

const service = require("../components/product/productService");

/* GET home page. */
router.get('/', async function (req, res, next) {
    try {
        const products = await service.getAll();
        res.render('product/views/products', {products});
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

module.exports = router;
