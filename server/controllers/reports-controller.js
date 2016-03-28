'use strict';

var Report = require('../models/report').Report;

module.exports.create = function (req, res) {
  console.log('create report: ' + JSON.stringify(req.body));
  var report = new Report(req.body);
  report.save(function (err, result) {
    if (err) {
      var returnedError = (process.env.env === 'dev') ? err :
        'The server encountered an error while trying to save this report';
      res.send(500, returnedError);
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