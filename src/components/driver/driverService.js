const bcrypt = require('bcrypt');
const faker = require('faker');

const partnerModel = require('./driverModel');

module.exports.getById = async (id) => {
    try {
        return await partnerModel.findByPk(id);
    } catch (err) {
        throw err;
    }
};

/**
 * Them san pham moi vao database
 * @returns {Promise<{await: *}>}
 * @param newPartner
 */
exports.insert = async (newPartner) => {
    try {
        const rawPassword = faker.internet.password();

        newPartner.username = newPartner.email;
        newPartner.password = await bcrypt.hash(rawPassword, 10);

        const partner = partnerModel.build(newPartner);
        const addedPartner = await partner.save();
        return { partner: addedPartner , rawPassword };
    } catch (err) {
        throw err;
    }
}

/**
 * Cap nhat thong tin tai khoan co trong database
 *
 * @param id
 * @param updatePartner
 * @returns {Promise<{address, phone, name, email}>}
 */
exports.update = async (id, updatePartner) => {
    try {
        await partnerModel.update(updatePartner, { where: { id } });

        return await partnerModel.findOne({ where: { id }, raw: true });
    } catch (err) {
        throw err;
    }
};