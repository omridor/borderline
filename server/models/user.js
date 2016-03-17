'use strict';

var mongoose = require('mongoose');
var schema = mongoose.Schema({
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

module.exports = mongoose.model('User', schema);
