'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {  

  var frequencyDenominators = [
    {
      "name": "incidents per day",
      "value": 1
    },
    {
      "name":"incidents per week",
      "value": 2
    },
    {
      "name":"incidents per month",
      "value": 3
    },
    {
      "name":"incidents per year",
      "value": 4
    },
    {
      "name":"incidents in total",
      "value": 5
    }
  ];

  formlyConfig.setType({
    name: 'frequencySelect',
    extends:  'select',
    defaultOptions: {
      templateOptions: {
        options: frequencyDenominators
      }
    }
  });
});
