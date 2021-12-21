const express = require('express');
const router = express.Router();
const controller = require('./partnerController');

const { sequelize, DataTypes } = require("../../config/database.config");

// GET Method
router.get('/page', controller.paging);
router.get('/add-partner', controller.renderAddPartner);
router.get('/profile', controller.renderProfile);
// router.get('/:id', controller.get);

// POST Method
router.post('/', controller.insert);
// router.post('/generate-fake-data', controller.generateFakeData);

// PUT Method
router.put('/:id', controller.update);
router.put('/change-password/:id', controller.changePassword);

// DELETE Method
router.delete('/:id', controller.delete);

module.exports = router;