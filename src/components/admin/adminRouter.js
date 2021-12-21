const express = require('express');
const router = express.Router();

const partnerRouter = require('../partner/partnerRouter');
const controller = require('./adminController');

router.use('/partner', partnerRouter);

// GET Method
router.get('/:id', controller.get);

// POST Method
router.post('/', controller.insert);

// PUT Method
router.put('/account/:id', controller.update);

module.exports = router;