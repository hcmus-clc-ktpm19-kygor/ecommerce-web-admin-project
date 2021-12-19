const express = require('express');
const router = express.Router();
const accountController = require('./accountController');
const customerController = require('../customer/customerController');
const upload = require('../../config/multer.config');

// GET Method
router.get('/:id', accountController.get);

// POST Method
router.post('/', accountController.insert);

// PUT Method
router.put('/:id', upload.single('avatar'), customerController.update);

module.exports = router;