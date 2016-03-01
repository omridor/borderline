'use strict';

angular.module('borderlineApp').controller('ReportSubmissionController',['$scope', '$resource', '$location', 'dialogs', function($scope, $resource, $location, dialogs) {
  var Report = $resource('api/reports');

  // Empty object will be populated by form.
  $scope.report = {};

  $scope.reportFields = [
  {
    key: 'dateOfIncident',
    type: 'datepicker',
    templateOptions: {
      label: 'Approximate Date of Incident',
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
      label: 'Severity of incident',
      required: true,
    }
  },
  {
    key: 'name',
    type: 'input',
    templateOptions: {
      type: 'text',
      label: 'Offender\'s Name',
      placeholder: 'Full Name',
      required: true
    }
  },
  {
    key: 'email',
    type: 'input',
    templateOptions: {
      type: 'email',
      label: 'Offender\'s email address',
      placeholder: 'Email',
    }
  },
  {
    key: 'phoneNumber',
    type: 'phoneNumber',
    templateOptions: {
      label: 'Offender\'s Phone Number',
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
