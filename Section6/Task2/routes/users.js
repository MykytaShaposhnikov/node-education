const express = require('express');

const router = express.Router();

const userData = require('./form');

router.get('/users', (req, res, next) => {
    res.render('users', { pageTitle: 'Users', path:'/users',users:userData.users });
});

module.exports = router;
