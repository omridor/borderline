  'use strict';

angular.module('borderlineApp').run(function(formlyConfig, formlyValidationMessages, formlyApiCheck) {
	formlyConfig.setWrapper({
	  name: 'validation',
	  types: ['input', 'phoneNumber', 'severitySelect', 'datepicker'],
	  templateUrl: 'form-messages.html'
	});

  formlyValidationMessages.addStringMessage('required', 'This field is required');
  formlyValidationMessages.addStringMessage('minlength', 'Too short');
  formlyValidationMessages.addStringMessage('maxlength', 'Too long');
  formlyValidationMessages.addStringMessage('email', 'Not a valid email address');
  formlyValidationMessages.addStringMessage('phoneNumber', 'Not a valid phone number');
});