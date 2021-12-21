const { sequelize, DataTypes } = require("../../config/database.config");

const driver = sequelize.define(
    "TAI_XE",
    {
        // Schema attributes are defined here
        id: {
            field: "MA_TAI_XE",
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: { field: "HO_TEN", type: DataTypes.STRING },
        identity_number: { field: "CMND", type: DataTypes.STRING },
        phone: { field: "DIEN_THOAI", type: DataTypes.STRING },
        license_plates: { field: "BIEN_SO_XE", type: DataTypes.STRING },
        address: { field: "DIA_CHI", type: DataTypes.STRING },
        area: { field: "KHU_VUC", type: DataTypes.INTEGER },
        email: { field: "EMAIL", type: DataTypes.STRING },
        bank_account: { field: "TKNH", type: DataTypes.FLOAT },
    },
    { timestamps: false, freezeTableName: true }
);

driver
    .sync()
    .then(() => console.log("The table for the TAI_XE model was just created!"))
    .catch((error) => console.error(error.message));

// Create customer model in db
module.exports = driver;