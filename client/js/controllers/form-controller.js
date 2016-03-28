'use strict';

angular.module('borderlineApp').controller('FormController',['$scope', '$resource', '$location', 'dialogs', '$rootScope', '$state', function($scope, $resource, $location, dialogs, $rootScope, $state) {
  var Report = $resource('/api/reports');

  // View model alias indicates what should be exposed in html.
  var vm = this;

  // Defines form step order, their state names (for ui-router navigation), their fields (for formly form generation) and whether they are known to be valid. This does not
  // ensure validity, but gives an indication that the form was valid as the user navigated out of it.
  vm.steps = [
    {
      stepName: 'general',
      valid: false,
      fields: [
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
      ]
    },
    {
      stepName: 'location',
      valid: false,
      fields: []
    },
    {
      stepName: 'ids',
      valid: false,
      fields: [
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
    },
    {
      stepName: 'confirm',
      valid: false,
      fields: []
    },

  ];

  // Save validity of form step when the user leaves the step. Necessary b/c when form step is removed from
  // DOM it's no longer possible to access $valid. This covers hitting back or manually navigating into a form step.
  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams, options){
    vm.saveValidityOfStep(fromState.name); 
  });

  vm.saveValidityOfStep = function(stepName) {
    var stepIndex = vm.steps.findIndex(function(element) {
      return element.stepName === stepName; 
    });
    if (stepIndex === -1) {
      // We are not leaving from one of the form steps, nothing to do
      return;
    }

    if (!vm.steps[stepIndex].form) {
      // If step has no form (i.e. informational), just mark as valid to indicate user has seen it.
      vm.steps[stepIndex].valid = true;
    } else if (vm.steps[stepIndex].form.$valid) {
      vm.steps[stepIndex].valid = true;
    } else {
      // Remember that the step was not valid. This will disallow form submission.
      vm.steps[stepIndex].valid = false;
    }
  };

  vm.submitReport = function() {
    // Save current step validity into same structure as all other steps, then check validity of all of them.
    vm.saveValidityOfStep($state.current.name);
    for (var index in vm.steps) {
      if (!vm.steps[index].valid) {
        dialogs.error('Incomplete form', 'Please go back and complete previous form steps');
        return;
      }
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
      $location.path('/done');
    }, function(err){
        dialogs.error('Server error', JSON.stringify(err));
    });
  };
}]);
