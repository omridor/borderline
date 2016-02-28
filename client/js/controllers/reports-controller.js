app.controller('reportsController',['$scope', '$resource', function($scope, $resource) {
    var Report = $resource('api/reports');

    Report.query(function (results) {
        $scope.reports = results;
    });

    $scope.reports = [
        {culpritName: "John"},
        {culpritName: "Doe"}
    ];
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
