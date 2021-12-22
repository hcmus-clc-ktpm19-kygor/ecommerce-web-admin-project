const express = require("express");
const router = express.Router();
const controller = require("./orderController");
const { sequelize } = require("../../config/database.config");

// Demo lỗi
router.get("/lost-update-error-trans-1", async function (req, res) {
  try {
    await sequelize.query("EXEC sp_LOSTUPDATE_TRAN1 'DH01', 'TX01'");
    res.redirect("/order");
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/lost-update-error-trans-2", async function (req, res) {
  try {
    await sequelize.query("EXEC sp_LOSTUPDATE_TRAN2 'DH01', 'TX02'");
    res.redirect("/order");
  } catch (err) {
    res.json({ message: err.message });
  }
});

// GET Method
router.get("/:id", controller.get);
router.get("/", controller.getAll);

// POST Method
router.post("/", controller.insert);

// PUT Method
router.put("/:id", controller.update);

// DELETE Method
router.delete("/:id", controller.delete);

module.exports = router;
