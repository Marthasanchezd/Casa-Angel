const express = require('express');
const router = express.Router();

/* GET contact page. */
router.get('/', function(req, res, next) {
    res.render('experiencias');
});

module.exports = router;