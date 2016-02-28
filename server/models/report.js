var mongoose = require('mongoose');

module.exports = mongoose.model('Report', {
    culpritName: String
});