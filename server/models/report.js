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
  //timeOfIncident: {type: Date, required: true},
  ids: [{idType: String, value: String}]
});