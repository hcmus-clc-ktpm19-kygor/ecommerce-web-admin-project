const express = require("express");
const router = express.Router();
const controller = require("./orderController");
const { sequelize } = require("../../config/database.config");
const sql = require("mssql");

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
router.get("/fix-lost-update-trans-1", async function (req, res) {
  try {
    await sequelize.query("EXEC sp_LOSTUPDATE_FIX_TRAN1 'DH01', 'TX02'");
    res.redirect("/order");
  } catch (err) {
    res.json({ message: err.message });
  }
});
router.get("/fix-lost-update-trans-2", async function (req, res) {
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
    request.input("MA_DON_HANG", sql.VarChar, "DH01");
    request.input("MA_TAI_XE", sql.VarChar, "TX02");
    request.execute("sp_LOSTUPDATE_FIX_TRAN2", async (err, result) => {
      if (result.returnValue) {
        req.flash(
          "lost_update_message",
          "CẬP NHẬT TÌNH TRẠNG ĐƠN HÀNG SANG ĐANG ĐÓNG GÓI THẤT BẠI"
        );
      }

      res.redirect("/order");
    });
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/conversion-deadlock-error-trans-1", async function (req, res) {
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
    request.input("MA_TAI_XE", sql.VarChar, "TX01");
    request.input("MA_DON_HANG", sql.VarChar, "DH04");
    request.execute("CONVERSION_DEADLOCK", function (err, results) {
      console.log(results.returnValue);
      if (results.returnValue === 1205) {
        req.flash("deadlock_message", "CÓ DEADLOCK XẢY RA");
      }

      res.redirect("/order");
    });
  } catch (err) {
    res.json({ message: err.message });
  }
})
router.get("/conversion-deadlock-error-trans-2", async function (req, res) {
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
    request.input("MA_TAI_XE", sql.VarChar, "TX04");
    request.input("MA_DON_HANG", sql.VarChar, "DH04");
    request.execute("CONVERSION_DEADLOCK", function (err, results) {
      console.log(results.returnValue);
      if (results.returnValue === 1205) {
        req.flash("deadlock_message", "CÓ DEADLOCK XẢY RA");
      }

      res.redirect("/order");
    });
  } catch (err) {
    res.json({ message: err.message });
  }
})
router.get("/fix-conversion-deadlock-trans-1", async function (req, res) {
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
    request.input("MA_TAI_XE", sql.VarChar, "TX01");
    request.input("MA_DON_HANG", sql.VarChar, "DH04");
    request.execute("CONVERSION_DEADLOCK_FIX", function (err, results) {
      console.log(results.returnValue);
      if (results.returnValue === 1205) {
        req.flash("deadlock_message", "CÓ DEADLOCK XẢY RA");
      }

      res.redirect("/order");
    });
  } catch (err) {
    res.json({ message: err.message });
  }
})
router.get("/fix-conversion-deadlock-trans-2", async function (req, res) {
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
    request.input("MA_TAI_XE", sql.VarChar, "TX04");
    request.input("MA_DON_HANG", sql.VarChar, "DH04");
    request.execute("CONVERSION_DEADLOCK_FIX", function (err, results) {
      console.log(results.returnValue);
      if (results.returnValue === 1205) {
        req.flash("deadlock_message", "CÓ DEADLOCK XẢY RA");
      }

      res.redirect("/order");
    });
  } catch (err) {
    res.json({ message: err.message });
  }
})

// GET Method
router.get("/:id", controller.get);
router.get("/", controller.getAll);

module.exports = router;
