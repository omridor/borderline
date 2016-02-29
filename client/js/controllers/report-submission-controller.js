app.controller('reportSubmissionController',['$scope', '$resource', function($scope, $resource) {
    var Report = $resource('api/reports');

    // Empty object will be populated by form.
    $scope.report = {};

    $scope.reportFields = [
    {
        key: 'name',
        type: 'input',
        templateOptions: {
            type: 'text',
            label: 'Offender Name',
            placeholder: 'Full name of offender',
            required: true
        }
    },
    {
        key: 'email',
        type: 'input',
        templateOptions: {
            type: 'email',
            label: 'Offender email address',
            placeholder: 'Email of Offender',
            required: true
        }
    }];

    $scope.submitReport = function() {
        var report = new Report();
        report.name = $scope.name;
        report.ids = [];
        report.ids.push({idType: 'email',
                          value: $scope.email});
        report.$save(function(result) {
            console.log(result);
        });
    };
}]);
