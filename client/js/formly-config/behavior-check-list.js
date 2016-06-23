'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {  
  formlyConfig.setType({
    name: 'behaviorCheckList',
    extends: 'input',
    template:   
      '<div ng-repeat="behavior in possibleBehaviors">' +
        '<label>' +
          '<input type="checkbox" checklist-model="model[options.key]" checklist-value="behavior.simpleText"> {{behavior.verbose}}' +
        '</label>' +
      '</div>',
    controller: ['$scope', function ($scope) {
      $scope.possibleBehaviors = [
        {simpleText: 'touch', verbose: 'Uncomfortable physical contact'},
        {simpleText: 'talk', verbose: 'Inappropriate verbal remarks'}
      ];
      if (!$scope.model[$scope.options.key]) {
        $scope.model[$scope.options.key] = [];
      }
    }]
  });
});