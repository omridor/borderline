'use strict';

var express = require('express'),
    router = express.Router(),
    reportsController = require('./controllers/reports-controller'),
    passport = require('passport');


router.get('/api/reports', reportsController.list);
router.post('/api/reports', reportsController.create);

router.use('/dist', express.static(process.cwd() + '/dist/static'));
router.use('/lib', express.static(process.cwd() + '/bower_components'));

router.get('/login/facebook',
  passport.authenticate('facebook', {scope: ['email']}));

router.get('/login/facebook/return',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res, next) {
  	if (req.session.returnToForm) {
  		delete req.session.returnToForm;
  		res.redirect('/form');	
  	} else {
      res.redirect('/');
    }
  });

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/', function (req, res) {
    res.render(process.cwd() + '/dist/ejs/index.ejs',
    	         {user: req.user,
    	          activeNav: "home"});
});

router.get('/about', function (req, res) {
    res.render(process.cwd() + '/dist/ejs/about.ejs',
    	         {user: req.user,
    	          activeNav: "about"});
});

router.get('/faq', function (req, res) {
    res.render(process.cwd() + '/dist/ejs/faq.ejs',
    	         {user: req.user,
    	          activeNav: "faq"});
});

router.get('/warning', function (req, res) {
    res.render(process.cwd() + '/dist/ejs/warning.ejs',
    	         {user: req.user,
    	          activeNav: "form"});
});

router.get('/preFormLogin', function (req, res) {
    res.render(process.cwd() + '/dist/ejs/preFormLogin.ejs',
    	         {user: req.user,
    	          activeNav: "form"});
});

router.get('/done', function (req, res) {
    res.render(process.cwd() + '/dist/ejs/done.ejs',
               {user: req.user,
                activeNav: "form"});
});

router.get('/login/facebook/returntoform',
	function(req, res, next) {
		req.session.returnToForm = true;
		next();
	},
  passport.authenticate('facebook', {scope: ['email']}));

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

router.get('/form*', 
	loggedIn,
	function (req, res) {
    res.render(process.cwd() + '/dist/ejs/form.ejs',
    	         {user: req.user,
    	          activeNav: "form"});
});

module.exports = router;
