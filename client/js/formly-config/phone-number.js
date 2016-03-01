'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {  
  formlyConfig.setType({
    name: 'phoneNumber',
    extends:  'input',
    defaultOptions: {
      validators: {
        phoneNumber: function($viewValue, $modelValue, scope) {
          var value = $modelValue || $viewValue;
          if(value) {
            return /^0[234578]\d{6}\d?\d?$/.test(value);
          }
        }  
      }
    }
  });
});
