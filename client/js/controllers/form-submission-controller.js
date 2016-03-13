'use strict';

angular.module('borderlineApp').controller('FormSubmissionController',['$scope', '$resource', '$location', 'dialogs', function($scope, $resource, $location, dialogs) {
  var Report = $resource('api/reports');

  // Empty object will be populated by form.
  $scope.report = {};

  $scope.incidentFields = [
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
      required: true
    }
  }
  ];
  $scope.idFields = [
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
  ];

  $scope.submitReport = function() {
    if ($scope.reportForm.$invalid) {
      return;
    }

    var report = new Report();
    report.dateOfIncident = $scope.report.dateOfIncident;
    report.severity = $scope.report.severity;
    report.ids = [];
    report.ids.push({idType: 'name',
                     value: $scope.report.name});
    if ($scope.report.email) {
      report.ids.push({idType: 'email',
                       value: $scope.report.email});
    }
    if ($scope.report.phoneNumber) {
      report.ids.push({idType: 'phoneNumber',
                       value: $scope.report.phoneNumber});
    }
    report.$save(function(result) {
      if (!result) {
        dialogs.error('Could not connect to DB', 'Please try again in a few minutes');
      }
      $location.path("done");
    });
  };
}]);
