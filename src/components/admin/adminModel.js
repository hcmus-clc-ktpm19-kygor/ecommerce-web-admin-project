const { sequelize, DataTypes } = require('../../config/database.config');

const admin = sequelize.define('ADMINISTRATOR', {
  // Schema attributes are defined here
  id: {
    field: 'MA_ADMIN',
    type: DataTypes.UUID,
    primaryKey: true
  },
  name: { field: 'HO_TEN', type: DataTypes.STRING },
  phone: { field: 'SDT', type: DataTypes.STRING },
  address: { field: 'DIA_CHI', type: DataTypes.STRING},
  email: { field: 'EMAIL', type: DataTypes.STRING }
}, { timestamps: false, freezeTableName: true });

admin.sync()
  .then(() => console.log('The table for the ADMINISTRATOR model was just created!'))
  .catch((error) => console.error(error.message))

// Create customer model in db
module.exports = admin;