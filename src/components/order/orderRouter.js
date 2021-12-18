const express = require('express');
const router = express.Router();
const controller = require('./orderController');

// GET Method
router.get('/:id', controller.get);
router.get('/', controller.getAll);

// POST Method
router.post('/', controller.insert);

// PUT Method
router.put('/:id', controller.update);

// DELETE Method
router.delete('/:id', controller.delete);
// Render edit product page
router.get('/edit-product/:id', controller.edit);

module.exports = router;
