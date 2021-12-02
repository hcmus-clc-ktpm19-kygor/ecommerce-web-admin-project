// const model = require("../account/accountModel");
// const faker = require("faker");
//
// /**
//  * Tao du lieu gia
//  * @returns {Promise<*[]>}
//  */
// module.exports.generateFakeAccount = async () => {
//   try {
//     let accounts = [];
//     for (let i = 0; i < 100; ++i) {
//       const account = new model();
//       account.username = faker.internet.userName();
//       account.password = faker.internet.password();
//       account.account_status = faker.datatype.boolean();
//       accounts.push(await account.save());
//     }
//     return accounts;
//   } catch (err) {
//     throw err;
//   }
// }