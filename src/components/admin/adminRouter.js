const express = require("express");
const router = express.Router();

const partnerRouter = require("../partner/partnerRouter");
const controller = require("./adminController");
const sql = require("mssql");

// Demo lỗi
router.get("/cycle-deadlock-error-trans-1", async function (req, res) {
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
    request.input("TEN_DANG_NHAP_1", sql.VarChar, "LOGIN_DT01");
    request.input("MAT_KHAU_MOI", sql.VarChar, "456");
    request.input("TEN_DANG_NHAP_2", sql.VarChar, "LOGIN_DT02");
    request.execute("sp_CYCLE_DEADLOCK_TRAN1", function (err, results) {
      console.log(results.returnValue);
      if (results.returnValue === 1205) {
        req.flash("deadlock_message", "CÓ DEADLOCK XẢY RA");
      }

      res.redirect('/admin/profile');
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/cycle-deadlock-error-trans-2", async function (req, res) {
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
    request.input("TEN_DANG_NHAP_1", sql.VarChar, "LOGIN_DT01");
    request.input("MAT_KHAU_MOI", sql.VarChar, "456");
    request.input("TEN_DANG_NHAP_2", sql.VarChar, "LOGIN_DT02");
    request.execute("sp_CYCLE_DEADLOCK_TRAN2", function (err, results) {
      console.log(results.returnValue);
      if (results.returnValue === 1205) {
        req.flash("deadlock_message", "CÓ DEADLOCK XẢY RA");
      }

      res.redirect('/admin/profile');
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/fix-cycle-deadlock-trans-1", async function (req, res) {
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
    request.input("TEN_DANG_NHAP_1", sql.VarChar, "LOGIN_DT01");
    request.input("MAT_KHAU_MOI", sql.VarChar, "456");
    request.input("TEN_DANG_NHAP_2", sql.VarChar, "LOGIN_DT02");
    request.execute("sp_CYCLE_DEADLOCK_FIX_TRAN1", function (err, results) {
      console.log(results.returnValue);
      if (results.returnValue === 1205) {
        req.flash("deadlock_message", "CÓ DEADLOCK XẢY RA");
      }

      res.redirect('/admin/profile');
    });

    res.redirect('/admin/profile');
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/fix-cycle-deadlock-trans-2", async function (req, res) {
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
    request.input("TEN_DANG_NHAP_1", sql.VarChar, "LOGIN_DT01");
    request.input("MAT_KHAU_MOI", sql.VarChar, "456");
    request.input("TEN_DANG_NHAP_2", sql.VarChar, "LOGIN_DT02");
    request.execute("sp_CYCLE_DEADLOCK_FIX_TRAN2", function (err, results) {
      console.log(results.returnValue);
      if (results.returnValue === 1205) {
        req.flash("deadlock_message", "CÓ DEADLOCK XẢY RA");
      }

      res.redirect('/admin/profile');
    });
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.use("/partner", partnerRouter);

// GET Method
router.get("/profile", controller.renderProfile);
router.get("/:id", controller.get);

// POST Method
router.post("/", controller.insert);

// PUT Method
router.put("/account/:id", controller.update);

module.exports = router;
