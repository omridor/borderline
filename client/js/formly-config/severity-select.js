'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {  

  var severityLevels = [
    {
      "name": "Severity 1",
      "value": 1,
      "verbose": "The person in question has sometimes made me uncomfortable. It didn't bother me all that much, but it's enough to warrant sending a message"
    },
    {
      "name":"Severity 2",
      "value": 2,
      "verbose": "The person in question has made me very uncomfortable, however I don't think this person's behavior is criminal."
    },
    {
      "name":"Severity 3",
      "value": 3,
      "verbose": "The person in question's behavior is boderline criminal sexual harassment."
    },
    {
      "name":"Severity 4",
      "value": 4,
      "verbose": "The person in question's behavior is, in my opinion, criminal sexual harassment. I've considered reporting this to an authority / the police."
    }
  ];

  formlyConfig.setType({
    name: 'severitySelect',
    extends: 'select',
    template: '<select class="form-control" ng-model="model[options.key]"></select><p>{{getVerboseDescription()}}</p>',
    defaultOptions: {
      templateOptions: {
        options: severityLevels
      }
    },
    controller: ['$scope', function ($scope) {
      $scope.getVerboseDescription = function() {
        var selectedItem = severityLevels.find(function(item) {
          return item.value == $scope.model[$scope.options.key];
        });
        return (selectedItem && selectedItem.verbose)  || '';
      };
    }]
  });
});
