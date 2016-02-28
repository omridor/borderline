app.controller('reportsController',['$scope', '$resource', function($scope, $resource) {
    var Report = $resource('api/reports');
    $scope.createReport = function() {
        var report = new Report();
        report.culpritName = $scope.culpritName;
        report.$save(function(result) {
            console.log(result);
            $scope.reports.push(result);
            $scope.culpritName='';
        });
    };
}]);
