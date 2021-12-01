const express = require('express');
const router = express.Router();
const controller = require('./productController');
const fakeDataGenerator = require('../FakeGenerator/FakeAccountGenerator');

// GET Method
// Paging
router.get('/', controller.paging);
router.get('/gallery', controller.getAll);
// Get 1 product
router.get('/:id', controller.get);

// POST Method
router.post('/:id', controller.insert);
router.post('/generate-fake-data', fakeDataGenerator.generateFakeAccount);

// PUT Method
// router.put('/update/:id', controller.update);
router.put('/update', controller.update);

// DELETE Method
router.delete('/:id', controller.delete);

module.exports = router;