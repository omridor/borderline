'use strict';

angular.module('borderlineApp').controller('FormController',['$scope', '$resource', '$window', 'dialogs', function($scope, $resource, $window, dialogs) {
  var Report = $resource('api/reports');

  // View model alias indicates what should be exposed in html.
  var vm = this;

  // Runs when we leave a step in the wizard.
  vm.exitValidation = function(form) {
    return form && !form.$invalid;
  };

  vm.fields = {
    step1: [
      {
        key: 'dateOfIncident',
        type: 'datepicker',
        templateOptions: {
          label: 'Approximate Date of Uncomfortable Behavior',
          type: 'text',
          required: true,
          datepickerPopup: 'dd-MMMM-yyyy',
          datepickerOptions: {
            datepickerMode: "year",
            maxDate: new Date(),
            minDate: new Date().setYear(new Date().getYear()-50),
            showWeeks: false,
            format: 'dd-MMMM-yyyy'
          }
        }
      },
      {
        key: 'severity',
        type: 'severitySelect',
        templateOptions: {
          label: 'Severity of behavior',
          required: true,
        }
      },
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          type: 'text',
          label: 'His Name',
          placeholder: 'Full Name',
          required: true,
          minlength: 3,
          maxlength: 64
        }
      }
    ],
    step2: [
      {
        key: 'email',
        type: 'input',
        templateOptions: {
          type: 'email',
          label: 'His Email Address',
          placeholder: 'Email',
        }
      },
      {
        key: 'phoneNumber',
        type: 'phoneNumber',
        templateOptions: {
          label: 'His Phone Number',
          placeholder: 'Phone Number',
        }
      }
    ]
  };

  vm.submitForm = function() {
    if (vm.form.$invalid) {
      return;
    }

    var report = new Report();
    report.dateOfIncident = vm.model.dateOfIncident;
    report.severity = vm.model.severity;
    report.ids = [];
    report.ids.push({idType: 'name',
                     value: vm.model.name});
    if (vm.model.email) {
      report.ids.push({idType: 'email',
                       value: vm.model.email});
    }
    if (vm.model.phoneNumber) {
      report.ids.push({idType: 'phoneNumber',
                       value: vm.model.phoneNumber});
    }
    report.$save(function(result) {
      if (!result) {
        dialogs.error('Could not connect to DB', 'Please try again in a few minutes');
      }
      $window.location.href = '/done';
    });
  };
}]);
