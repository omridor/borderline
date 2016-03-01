'use strict';

angular.module('borderlineApp').controller('navbarController',['$scope', '$location', function($scope, $location) {
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
}]);
