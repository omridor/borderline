'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {  

  var severityLevels = [
    {
      "name": "Severity 1 - The person in question has sometimes made me uncomfortable. It didn't bother me all that much, but it's just enough to warrant sending a message",
      "value": 1
    },
    {
      "name":"Severity 2 - The person in question has made me very uncomfortable, however I don't think this person's behavior is criminal.",
      "value": 2
    },
    {
      "name":"Severity 3 - The person in question's behavior is boderline criminal sexual harassment.",
      "value": 3
    },
    {
      "name":"Severity 4 - The person in question's behavior is, in my opinion, criminal sexual harassment. I've considered reporting this to an authority / the police.",
      "value": 4
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
