'use strict';

var express = require('express'),
    router = express.Router(),
    reportsController = require('./controllers/reports-controller'),
    passport = require('passport');


router.get('/api/reports', reportsController.list);
router.post('/api/reports', reportsController.create);

router.use('/dist', express.static(process.env.PWD + '/dist'));
router.use('/lib', express.static(process.env.PWD + '/bower_components'));

router.get('/login/facebook',
  passport.authenticate('facebook'));

router.get('/login/facebook/return', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

// route for logging out
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('*', function (req, res) {
    res.render(process.env.PWD + '/dist/views/index.ejs',
    	         {user: req.user});
});

module.exports = router;
