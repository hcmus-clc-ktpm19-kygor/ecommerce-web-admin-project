const { sequelize, DataTypes } = require("../../config/database.config");

/**
 * OrderDetailSchema đại diện cho collection OrderDetailSchema trong db
 */
const orderDetail = sequelize.define(
  "CHI_TIET_DON_HANG",
  {
    // Schema attributes are defined here
    order_id: {
      field: "MA_DON_HANG",
      type: DataTypes.UUID,
      primaryKey: true,
      foreignKey: true,
    },
    product_id: {
      field: "MA_SAN_PHAM",
      type: DataTypes.UUID,
      primaryKey: true,
      foreignKey: true,
    },
    quantity: { field: "SO_LUONG", type: DataTypes.INTEGER },
  },
  { timestamps: false, freezeTableName: true }
);

// Create orderDetail model in db
orderDetail
  .sync()
  .then(() =>
    console.log("The table for the CHI_TIET_DON_HANG model was just created!")
  )
  .catch((error) => console.error(error.message));

module.exports = orderDetail;