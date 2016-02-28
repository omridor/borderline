app.controller('adminController',['$scope', '$resource', function($scope, $resource) {
    var Report = $resource('api/reports');
    $scope.reports = [];
    Report.query(function (results) {
        $scope.reports = results;
    });
}]);
