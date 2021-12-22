const express = require('express');
const router = express.Router();
const controller = require('./productController');
const { sequelize } = require("../../config/database.config");

// Demo lỗi
router.get("/dirty-read-error", async function (req, res) {
  try {
    await sequelize.query("EXEC sp_DIRTYREAD_TRAN1 'SP02', '1000'");
    res.redirect("/products/SP02");
  } catch (err) {
    res.json({ mess: err.message });
  }
});
router.get("/fix-dirty-read", async function (req, res) {
  try {
    await sequelize.query("EXEC sp_DIRTYREAD_FIX_TRAN1 'SP02', '1000'");
    res.redirect("/products/SP02");
  } catch (err) {
    res.json({ mess: err.message });
  }
});

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
router.put('/:id', controller.update);
// router.put('/update', controller.update);

// DELETE Method
router.delete('/:id', controller.delete);

module.exports = router;