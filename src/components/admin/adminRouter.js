const express = require('express');
const router = express.Router();
const controller = require('./adminController');

// GET Method
router.get('/page', controller.paging);
router.get('/add-admin', controller.renderAddAdmin);
router.get('/profile', controller.renderProfile);
// router.get('/:id', controller.get);
router.get('/profile', controller.getAllAdmins);

// POST Method
router.post('/', controller.insert);
// router.post('/generate-fake-data', controller.generateFakeData);

// PUT Method
router.put('/:username', controller.update);

// DELETE Method
router.delete('/:id', controller.delete);

module.exports = router;