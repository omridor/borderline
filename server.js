'use strict';

var express = require('express'),
    app     = express(),
    mongoose = require('mongoose'),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('./server/models/user'),
    router = require('./server/router'),
    config = require('./config');

console.log('About to connect to DB: ' + config.dbURI);
mongoose.connect(config.dbURI);
console.log('Connected to DB');

passport.use(new FacebookStrategy({
    clientID: config.facebookAppId,
    clientSecret: config.facebookAppSecret,
    callbackURL: config.callbackUrl,
    profileFields: ['id', 'email', 'name']
  },
  function(token, refreshToken, profile, done) {
    process.nextTick(function() {
        // find the user in the database based on their facebook id
        User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
          // if there is an error, stop everything and return that
          // ie an error connecting to the database
          if (err) {
            return done(err);
          }

          // if the user is found, then log them in
          if (user) {
              return done(null, user); // user found, return that user
          } else {
            // if there is no user found with that facebook id, create them
            var newUser            = new User();
            // set all of the facebook information in our user model
            newUser.facebook.id    = profile.id; // set the users facebook id                   
            newUser.facebook.token = token; // we will save the token that facebook provides to the user                    
            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
            newUser.save(function(err) {
              if (err) {
                throw err;
              }
              // if successful, return the new user
              return done(null, newUser);
            });
          }
        });
    });

}));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.set('views', process.env.PWD + '/dist/views');
app.set('view engine', 'ejs');

app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')(config.expressSessionOptions));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log('listening on port ' + port);
});