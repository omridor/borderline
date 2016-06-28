'use strict';

angular.module('borderlineApp').run(function(formlyConfig) {  
  formlyConfig.setType({
    name: 'behaviorCheckList',
    extends: 'input',
    template:   
      '<div ng-repeat="behavior in possibleBehaviors">' +
        '<div class="checkbox">' +      
          '<label>' +
            '<input type="checkbox" checklist-model="model[options.key]" checklist-value="behavior.simpleText"> {{behavior.verbose}}' +
          '</label>' +
        '</div>' +
      '</div>',
    controller: ['$scope', function ($scope) {
      $scope.possibleBehaviors = [
        {simpleText: 'touch', verbose: 'Inappropriate physical contact (May include \'innocent\' brushing, hand on shoulder, hugging)'},
        {simpleText: 'verbal', verbose: 'Inappropriate personal verbal remarks (May include comments about your figure or clothes)'},
        {simpleText: 'sexist', verbose: 'Sexist remarks (Not specifically about you)'},
        {simpleText: 'look', verbose: 'Inappropriate looks or stares'},
        {simpleText: 'invite', verbose: 'Inappropriate or hard-to-justify invitations for \'innocent\' one-on-one meetings or activities'},
        {simpleText: 'dates', verbose: 'Repeated invitations to dates of obviously romantic nature, despite your refusal'},
        {simpleText: 'stalking', verbose: 'Physical stalking - \'Accidently\' being where you are'},
        {simpleText: 'onlinestalking', verbose: 'Online stalking - Frequenting your online profiles, possibly commenting / liking'},
        {simpleText: 'promises', verbose: 'Promises - Subtly letting you understand that good consequences may follow if you behave in a certain way'},
        {simpleText: 'threats', verbose: 'Threats - Subtly letting you understand that bad consequences may follow if you behave in a certain way'},
        {simpleText: 'negativediscrimination', verbose: 'Negative discrimination - Treating you worse due to your looks, gender or sexual tendencies'},
        {simpleText: 'positivediscrimination', verbose: 'Positive discrimination - Treating you better due to your looks, gender or sexual tendencies'},
        {simpleText: 'flirt', verbose: 'Flirting - Initiating or prolonging conversations with romantic motives'}
      ];
      if (!$scope.model[$scope.options.key]) {
        $scope.model[$scope.options.key] = [];
      }
    }]
  });
});