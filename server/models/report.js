var mongoose = require('mongoose');

module.exports.idTypes = {
  name: 'name',
  email: 'email',
  fbProfileName: 'fbProfileName',
  fbProfileNumber: 'fbProfileNumber',
  phoneNumber: 'phoneNumber'
};

module.exports.Report = mongoose.model('Report', {
  submittedOn: { type: Date, default: Date.now, required: true},
  dateOfIncident: {type: Date, required: true},
  severity: {type: String, require: true},
  ids: [{idType: String, value: String}]
});