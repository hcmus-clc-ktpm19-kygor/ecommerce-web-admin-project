const { sequelize, DataTypes } = require('../../config/database.config');

/**
 * Schema
 */
const product = sequelize.define('SAN_PHAM', {
  // Schema attributes are defined here
  _id: {
    field: 'MA_SAN_PHAM',
    type: DataTypes.STRING,
    primaryKey: true,
  },
  name: { field: 'TEN_SAN_PHAM', type: DataTypes.STRING },
  stock: { field: 'SO_LUONG_TON', type: DataTypes.INTEGER },
  price: { field: 'GIA_CA', type: DataTypes.DECIMAL },
  image_url: { field: 'HINH_ANH', type: DataTypes.STRING },
  tax_id: { field: 'MA_SO_THUE', type: DataTypes.STRING },
  branch_id: { field: 'MA_CHI_NHANH', type: DataTypes.STRING }
}, { timestamps: false, freezeTableName: true });

product.sync()
    .then(() => console.log('The table for the SAN_PHAM model was just created!'))
    .catch((error) => console.error(error.message))

// Create customer model in db
module.exports = product;