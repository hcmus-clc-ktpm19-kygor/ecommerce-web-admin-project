const express = require('express');
const router = express.Router();
const controller = require('./orderController');

// GET Method
router.get("/api/sales", controller.getSales);
router.get('/', controller.getAll);
router.get('/:id', controller.get);

// POST Method
router.post('/', controller.insert);

// PUT Method
router.put('/:id', controller.update);

// DELETE Method
router.delete('/:id', controller.delete);

module.exports = router;
