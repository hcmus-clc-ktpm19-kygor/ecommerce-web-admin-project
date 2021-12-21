const service = require('./partnerService');

//---------------------------------GET METHOD--------------------------------------------//
/**
 * Lay 1 tai khoan len bang id
 *
 * @param req request
 * @param res respone
 * @returns {Promise<void>}
 */
exports.get = async (req, res) => {
    try {
        const account = await service.getById(req.params.id);
        res.json(account);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//---------------------------------POST METHOD--------------------------------------------//
/**
 * Them account moi vao database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.insert = async (req, res) => {
    try {
        const { partner, rawPassword } = await service.insert(req.body);
        req.flash('success', `Password của ${partner.email}: ${rawPassword}`);
        res.redirect('/partner/profile');
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

//---------------------------------PUT METHOD--------------------------------------------//
/**
 * Tim va Update account da co trong database tra ket qua neu thanh cong
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.update = async (req, res) => {
    try {
        await service.update(req.params.id, req.body);
        res.redirect("/partner/profile");
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}