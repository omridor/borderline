'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {
  
  formlyConfig.setType({
    name: 'monthpicker',
    templateUrl:  'dist/views/formly-bootstrap-monthpicker.html',
    wrapper: ['bootstrapLabel', 'bootstrapHasError'],
    defaultOptions: {
      templateOptions: {
        minDate: new Date().setYear(new Date().getYear()-100),
        maxDate: new Date(),
        showWeeks: false,
        datepickerMode: "year",
        minMode: "month"
      }
    },
    controller: ['$scope', function ($scope) {
      $scope.clear = function() {
        $scope.dt = null;
        $scope.model[$scope.options.key] = [];
      };

      if (!$scope.model[$scope.options.key]) {
        $scope.model[$scope.options.key] = [];
      }
    }]
  });
});
