'use strict';

angular.module('borderlineApp').controller('FormController',['$scope', '$resource', '$location', 'dialogs', '$rootScope', '$state', function($scope, $resource, $location, dialogs, $rootScope, $state) {
  var Report = $resource('/api/reports');

  // View model alias indicates what should be exposed in html.
  var vm = this;

  window.onbeforeunload = function(){
      return 'You have unsaved data.';
  };

  // Defines form step order, their state names (for ui-router navigation), their fields (for formly form generation) and valid/visited flags. The valid flag
  // retains the last known state of the step right before we navigated away from it.
  vm.steps = [
    {
      stepName: 'what',
      stepDisplayName: 'What',
      valid: false,
      visited: false,
      fields: [
        {
          key: 'severity',
          type: 'severitySelect',
          templateOptions: {
            label: 'Severity of behavior',
            required: true
          }
        },
        {
          key: 'behaviors',
          type: 'behaviorCheckList',
          templateOptions: {
            label: 'What did this person do?'          }
        }
      ]
    },
    {
      stepName: 'how',
      stepDisplayName: 'How',
      valid: false,
      visited: false,
      fields: [
        {
          key: 'whenToSend',
          type:  'select',
          templateOptions: {
            required: true,
            options: [
              {value: "unconditional", name: "Send the message within the next 24 hours"},
              {value: "conditional", name: "Wait until the person in question gets at least one other message before sending mine. I don't want to be the first to send a message to the person in question"}
            ]
          }
        }
      ]
    },
    {
      stepName: 'when',
      stepDisplayName: 'When',
      valid: false,
      visited: false,
      fields: [
        {
          key: 'months',
          type: 'monthpicker',
          templateOptions: {
            label: 'Months when incidents occured',
            type: 'text',
            required: true
          }
        },
        {
          key: 'frequencyNumerator',
          type: 'input',
          templateOptions: {
            label: 'Frequency of incidents',
            type: 'number',
            required: true
          }
        },
        {
          key: 'frequencyDenominator',
          type: 'frequencySelect',
          templateOptions: {
            required: true,
          }
        }
      ]
    },
    {
      stepName: 'where',
      stepDisplayName: 'Where',
      valid: false,
      visited: false,
      fields: [
        {
          key: 'country',
          type: 'countrySelect',
          templateOptions: {
            label: 'Country where most incidents occured',
            required: true,
          }
        }
      ]
    },
    {
      stepName: 'who',
      stepDisplayName: 'Who',
      valid: false,
      visited: false,
      fields: [
        {
          key: 'relationship',
          type: 'relationshipSelect',
          templateOptions: {
            label: 'Who is this person to you?',
            required: true
          }
        },
        {
          key: 'email',
          type: 'input',
          templateOptions: {
            type: 'email',
            label: 'The person\'s Email Address. The message will be sent here!',
            placeholder: 'Email',
          }
        },
        {
          key: 'phoneNumber',
          type: 'phoneNumber',
          templateOptions: {
            label: 'Phone Number. If we receive other reports with this number, we will know they relate to the same person, even if the email is different',
            placeholder: 'Phone Number',
          }
        }
      ]
    }
  ];

  // Set flags on out-of-DOM form steps.
  // Visited flag applies to all visited or skipped steps (errors will be indicated on nav bar with this).
  // Valid flag assigned when user leaves the form step, even if user does so with back button
  // or manual navigation.
  $rootScope.$on('$stateChangeStart', 
  function(event, toState, toParams, fromState, fromParams, options){
    var fromStepIndex = vm.findStepIndexByStateName(fromState.name);
    if (fromStepIndex > -1) {
      vm.saveValidityOfStep(fromStepIndex);
    }

    // Hack to check validity of When step.
    if (vm.model && vm.model.months && !vm.model.months.length) {
      vm.steps[vm.findStepIndexByStateName('when')].valid = false;
    }

    // Mark all previous steps as visited, even if they were skipped.
    // Not that final step (confirm) never gets this flag set. This is
    // by design.
    var toStepIndex = vm.findStepIndexByStateName(toState.name);
    for (var i = 0; i < toStepIndex; i++) {
      vm.steps[i].visited = true;
    }
  });

  vm.findStepIndexByStateName = function(stateName) {
    return vm.steps.findIndex(function(element) {
      return element.stepName === stateName; 
    });
  };

  // Copy validity state of form into steps array.
  vm.saveValidityOfStep = function(stepIndex) {
    if (!vm.steps[stepIndex].form) {
      // If step has no form (i.e. informational), just mark as valid to indicate user has seen it.
      vm.steps[stepIndex].valid = true;
    } else {
      vm.steps[stepIndex].valid = vm.steps[stepIndex].form.$valid;
    }
  };

  vm.getClass = function (step) {
    if (!step) {
      return '';
    }
    if (step.stepName === $state.current.name) {
      return 'active';
    }

    if (step.visited === false) {
      return 'unvisited';
    }
    return (step.valid) ? 'valid': 'invalid';
  };

  vm.shouldDrawFormNav = function() {
    return vm.steps.some(function (step, index) {
      return step.stepName === $state.current.name;
    });
  };

  vm.submitReport = function() {
    // Save current step validity into same structure as all other steps, then check validity of all of them.
    vm.saveValidityOfStep(vm.findStepIndexByStateName($state.current.name));
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
      window.onbeforeunload = null;
      $location.path('/done');
    }, function(err){
        dialogs.error('Server error', JSON.stringify(err));
    });
  };
}]);
