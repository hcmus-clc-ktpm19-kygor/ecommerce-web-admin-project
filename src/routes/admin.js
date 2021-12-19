var express = require('express');
var router = express.Router();

/* GET partner add. */
router.get('/', function(req, res, next) {
    res.render('partner/views/add_admin');
});


module.exports = router;
