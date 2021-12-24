const express = require('express');
const router = express.Router();

const { sequelize } = require("../../config/database.config");
const sql = require("mssql");

const controller = require('./productController');
const service = require("./productService");

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

router.get("/phantom-error-trans-1", async function (req, res) {
  const sql = require("mssql");
  const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };

  try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(sqlConfig);

    const request = new sql.Request();
    request.input("MA_SO_THUE", sql.VarChar, "DT02");
    request.input("MA_CHI_NHANH", sql.VarChar, "CN03");
    request.output("COUNT", sql.Int);
    request.execute("PHANTOM_TRANS_1", async function (err, results) {
      const products = await service.getByPartner("DT02", "CN03");
      res.render("product/views/products", {
        products: [products],
        total_found: results.output.COUNT,
      })
    })
  } catch (err) {
    res.json({ message: err.message });
  }
})
router.get("/phantom-error-trans-2", async function (req, res) {
  const sql = require("mssql");
  const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };

  try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(sqlConfig);

    const request = new sql.Request();
    request.input("MA_SAN_PHAM", sql.VarChar, "SP10");
    request.input("TEN_SAN_PHAM", sql.NVarChar, "Ốp lưng iphone 12");
    request.input("SO_LUONG_TON", sql.Int, "100");
    request.input("GIA_CA", sql.Money, "50000");
    request.input("MA_SO_THUE", sql.VarChar, "DT02");
    request.input("MA_CHI_NHANH", sql.VarChar, "CN03");
    request.execute("PHANTOM_TRANS_2")

    res.redirect("/products");
  } catch (err) {
    res.json({ message: err.message });
  }
})
router.get("/fix-phantom-trans-1", async function (req, res) {
  const sql = require("mssql");
  const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };

  try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(sqlConfig);

    const request = new sql.Request();
    request.input("MA_SO_THUE", sql.VarChar, "DT02");
    request.input("MA_CHI_NHANH", sql.VarChar, "CN03");

    request.output("COUNT", sql.Int);
    request.output("MA_SAN_PHAM", sql.VarChar);
    request.output("TEN_SAN_PHAM", sql.NVarChar);
    request.output("SO_LUONG_TON", sql.Int);
    request.output("GIA_CA", sql.Money);
    request.output("MA_SO_THUE_OUT", sql.VarChar);
    request.output("MA_CHI_NHANH_OUT", sql.VarChar);

    request.execute("XEM_SP_FIX", async function (err, results) {
      const output = results.output;
      let products = null;
      if (output.MA_SAN_PHAM) {
        const product = {
          _id: output.MA_SAN_PHAM,
          name: output.TEN_SAN_PHAM,
          stock: output.SO_LUONG_TON,
          price: output.GIA_CA,
          tax_id: output.MA_SO_THUE_OUT,
          brach_id: output.MA_CHI_NHANH_OUT,
        };

        products = [product];
      }

      res.render("product/views/products", {
        products,
        total_found: output.COUNT,
      })
    })
  } catch (err) {
    res.json({ message: err.message });
  }
})
router.get("/fix-phantom-trans-2", async function (req, res) {
  const sql = require("mssql");
  const sqlConfig = {
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000,
    },
    options: {
      encrypt: false, // for azure
      trustServerCertificate: true, // change to true for local dev / self-signed certs
    },
  };

  try {
    // make sure that any items are correctly URL encoded in the connection string
    const pool = await sql.connect(sqlConfig);

    const request = new sql.Request();
    request.input("MA_SAN_PHAM", sql.VarChar, "SP10");
    request.input("TEN_SAN_PHAM", sql.NVarChar, "Ốp lưng iphone 12");
    request.input("SO_LUONG_TON", sql.Int, "100");
    request.input("GIA_CA", sql.Money, "50000");
    request.input("MA_SO_THUE", sql.VarChar, "DT02");
    request.input("MA_CHI_NHANH", sql.VarChar, "CN03");
    request.execute("THEM_SP_FIX")

    res.redirect("/products");
  } catch (err) {
    res.json({ message: err.message });
  }
})

// GET Method
// Paging
// router.get('/', controller.paging);
router.get('/', controller.getAll);
// Render add new product page
router.get('/add-new-product', controller.renderAddProductPage);
// Get 1 product
router.get('/:id', controller.getById);

module.exports = router;