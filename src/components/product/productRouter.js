const express = require('express');
const router = express.Router();
const controller = require('./productController');
const {sequelize} = require("../../config/database.config");

// GET Method
// Paging
// router.get('/', controller.paging);
router.get('/gallery', controller.getImage);
router.get('/', controller.getAll);
// Render add new product page
router.get('/add-new-product', controller.renderAddProductPage);
// Get 1 product
router.get('/:id', controller.getById);

// POST Method
router.post('/', controller.insert);

// PUT Method
router.put("/dirty-read-error", function (req, res) {
  sequelize
    .query("EXEC sp_DIRTYREAD_TRAN1 'SP02', '1000'")
    .then((v) => res.json({message: v}))
    .catch((err) => res.json({ message: err.message }));
});
router.put('/:id', controller.update);
// router.put('/update', controller.update);

// DELETE Method
router.delete('/:id', controller.delete);

module.exports = router;