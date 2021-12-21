const { sequelize, DataTypes } = require("../../config/database.config");

const partner = sequelize.define(
  "DOI_TAC",
  {
    // Schema attributes are defined here
    id: {
      field: "MA_SO_THUE",
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: { field: "TEN_DOI_TAC", type: DataTypes.STRING },
    representative: { field: "NGUOI_DAI_DIEN", type: DataTypes.STRING },
    number_of_branch: { field: "SO_CHI_NHANH", type: DataTypes.INTEGER },
    type_of_product: { field: "LOAI_HANG_VAN_CHUYEN", type: DataTypes.STRING },
    number_of_order: { field: "SO_LUONG_DON_HANG", type: DataTypes.INTEGER },
    sales: { field: "DOANH_SO", type: DataTypes.FLOAT },
    city: { field: "THANH_PHO", type: DataTypes.STRING },
    district: { field: "QUAN", type: DataTypes.STRING },
    address: { field: "DIA_CHI_KINH_DOANH", type: DataTypes.STRING },
    phone: { field: "SDT", type: DataTypes.STRING },
    email: { field: "EMAIL", type: DataTypes.STRING },
  },
  { timestamps: false, freezeTableName: true }
);

partner
  .sync()
  .then(() => console.log("The table for the DOI_TAC model was just created!"))
  .catch((error) => console.error(error.message));

// Create customer model in db
module.exports = partner;
