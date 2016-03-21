'use strict';

var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    router = require('./server/router'),
    config = require('./config');

console.log('About to connect to DB: ' + config.dbURI);
mongoose.connect(config.dbURI);
console.log('Connected to DB');

app.set('views', process.cwd() + '/dist/ejs/');
app.set('view engine', 'ejs');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')(config.expressSessionOptions));

app.use(passport.initialize());
app.use(passport.session());
// Config passport
require('./server/passport-config')(passport);

app.use('/', router);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('listening on port ' + port);
});