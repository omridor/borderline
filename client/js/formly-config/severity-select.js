'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {  

  var severityLevels = [
    {
      "name": "Severity 1 - Repeating inappropriate verbal remarks",
      "value": 1
    },
    {
      "name":"Severity 2 - Repeating uncomfortable physical contact",
      "value": 2
    },
    {
      "name":"Severity 3 - Repeating forced physical contact",
      "value": 3
    }
  ];

  formlyConfig.setType({
    name: 'severitySelect',
    extends:  'select',
    defaultOptions: {
      templateOptions: {
        options: severityLevels
      }
    }
  });
});
