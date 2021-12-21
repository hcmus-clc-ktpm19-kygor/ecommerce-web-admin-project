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

/**
 * Phan trang
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.paging = async (req, res) => {
  try {
    const accounts = await service.paging(req.query.page);
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}


/**
 * Render trang them partner
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderAddPartner = (req, res) => {
  res.render('partner/views/add_partner');
}

/**
 * Render profile
 * @param req request
 * @param res response
 */
exports.renderProfile = async (req, res) => {
  try {
    const invalidPasswordMess = req.query['invalid-password'] ?? null;
    const admins = await service.getAll();
    res.render("partner/views/profile", {
      admins,
      ["invalid-password-mess"]: invalidPasswordMess,
      message: req.flash("success"),
    });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}
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
exports.changePassword = async (req, res) => {
  try {
    const mess = await service.changePassword(req.params.id, req.body);
    if (typeof mess === "string") {
      res.redirect(`/admin/profile?invalid-password=${mess}`);
    } else {
      res.redirect('/logout');
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
  
}

//---------------------------------DELETE METHOD--------------------------------------------//
/**
 * Tim va xoa tai khoan trong database
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.delete = async (req, res) => {
  try {
    await service.delete(req.params.id);
    res.redirect('/partner/profile');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
