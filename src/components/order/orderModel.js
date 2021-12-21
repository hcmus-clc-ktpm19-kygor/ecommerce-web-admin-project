const { sequelize, DataTypes } = require("../../config/database.config");

const order = sequelize.define(
  "DON_HANG",
  {
    // Schema attributes are defined here
    id: {
      field: "MA_DON_HANG",
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: { field: "TEN_DON_HANG", type: DataTypes.STRING },
    status: { field: "TINH_TRANG", type: DataTypes.STRING },
    area: { field: "KHU_VUC", type: DataTypes.STRING },
    shipping_fee: { field: "PHI_VAN_CHUYEN", type: DataTypes.FLOAT },
    price: { field: "PHI_SAN_PHAM", type: DataTypes.FLOAT },
    address: {
      field: "DIA_CHI_GIAO_HANG",
      type: DataTypes.STRING,
    },
    customer_id: {
      field: "MA_KHACH_HANG",
      type: DataTypes.UUID,
      foreignKey: true,
    },
    tax_id: {
      field: "MA_SO_THUE",
      type: DataTypes.UUID,
      foreignKey: true,
    },
    driver_id: {
      field: "MA_TAI_XE",
      type: DataTypes.UUID,
      foreignKey: true,
    },
    payment: { field: "HINH_THUC_THANH_TOAN", type: DataTypes.STRING },
    date: { field: "NGAY_DAT", type: DataTypes.DATE }
  },
  { timestamps: false, freezeTableName: true }
);

// Create order model in db
order
  .sync()
  .then(() => console.log("The table for the DON_HANG model was just created!"))
  .catch((error) => console.error(error.message));

module.exports = order;