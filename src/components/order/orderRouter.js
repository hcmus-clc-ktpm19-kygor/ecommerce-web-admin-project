const express = require('express');
const router = express.Router();
const controller = require('./orderController');

// GET Method
// router.get("/api/sales", controller.getSales);
router.get("/best-seller", controller.getTop10BestSeller);
router.get('/', controller.getAll);
router.get('/:id', controller.get);

// POST Method
router.post('/', controller.insert);

// PATCH Method
router.patch("/:id", controller.updateStatus);

// DELETE Method
router.delete('/:id', controller.delete);

module.exports = router;
