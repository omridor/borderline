'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {  

  var relationships = [
    {
      "name": "Workplace - Superior",
      "value": 1
    },
    {
      "name":"Workplace - Colleague",
      "value": 2
    },
    {
      "name":"Workplace - Customer",
      "value": 3
    },
    {
      "name":"Workplace - Subordinate",
      "value": 4
    },
    {
      "name":"School - Your teacher / professor",
      "value": 5
    },
    {
      "name":"School - Student of yours",
      "value": 6
    },
    {
      "name":"School - Fellow student",
      "value": 7
    },
    {
      "name":"Family Member",
      "value": 8
    },
    {
      "name":"Other",
      "value": 9
    }
  ];

  formlyConfig.setType({
    name: 'relationshipSelect',
    extends:  'select',
    defaultOptions: {
      templateOptions: {
        options: relationships
      }
    }
  });
});
