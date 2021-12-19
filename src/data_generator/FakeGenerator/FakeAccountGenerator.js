const model = require("../../components/partner/partnerModel");
const faker = require("faker");

/**
 * Tao du lieu gia
 * @returns {Promise<*[]>}
 */
module.exports.generateFakeAccount = async () => {
  try {
    let accounts = [];
    for (let i = 0; i < 100; ++i) {
      const admin = new model();
      admin.username = faker.internet.userName();
      admin.password = faker.internet.password();
      admin.account_status = faker.datatype.boolean();
      accounts.push(await admin.save());
    }
    return accounts;
  } catch (err) {
    throw err;
  }
}