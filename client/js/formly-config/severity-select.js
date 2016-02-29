app.run(function(formlyConfig) {  

  var severityLevels = [
    {
        "name": "Severity 1 - Inappropriate verbal remarks",
        "value": 1
    },
    {
        "name":"Severity 2 - Uncomfortable physical contact",
        "value": 2
    },
    {
        "name":"Severity 3 - Retaliatory behavior",
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
