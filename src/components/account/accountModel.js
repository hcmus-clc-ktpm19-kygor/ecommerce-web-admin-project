const { sequelize, DataTypes } = require('../../config/database.config');

const account = sequelize.define('TAI_KHOAN', {
  // Schema attributes are defined here
  _id: {
    field: 'MA_NGUOI_DUNG',
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  username: {
    field: 'TEN_DANG_NHAP',
    type: DataTypes.STRING,
    primaryKey: true
  },
  password: {
    field: 'MAT_KHAU',
    type: DataTypes.STRING,
  },
  state: {
    field: 'TINH_TRANG',
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
}, { timestamps: false, freezeTableName: true });

account.sync()
    .then(() => console.log('The table for the TAI_KHOAN model was just created!'))
    .catch((error) => console.error(error.message));

// Create account model in db
module.exports = account;