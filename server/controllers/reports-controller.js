var Report = require('../models/report').Report;

module.exports.create = function (req, res) {
    var report = new Report(req.body);
    report.save(function (err, result) {
        if (err) {
            console.log(err);
        }
        res.json(result);
    });
};

module.exports.list = function (req, res) {
    Report.find({}, function (err, results) {
        if (err) {
            console.log(err);
        }
        res.json(results);
    });
};