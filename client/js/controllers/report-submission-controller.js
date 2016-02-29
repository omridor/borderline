app.controller('ReportSubmissionController',['$scope', '$resource', function($scope, $resource) {
    var Report = $resource('api/reports');

    // Empty object will be populated by form.
    $scope.report = {};

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

    $scope.reportFields = [
    {
        key: 'date',
        type: 'datepicker',
        templateOptions: {
            label: 'Approximate Date of Incident',
            type: 'text',
            required: true,
            datepickerPopup: 'dd-MMMM-yyyy',
            datepickerOptions: {
                datepickerMode: "year",
                maxDate: new Date(),
                minDate: new Date().setYear(new Date().getYear()-50),
                showWeeks: false,
                format: 'dd-MMMM-yyyy'
            }
        }
    },
    {
        key: 'severity',
        type: 'select',
        templateOptions: {
            label: 'Severity of incident',
            required: true,
            options: severityLevels
        }
    },
    {
        key: 'name',
        type: 'input',
        templateOptions: {
            type: 'text',
            label: 'Offender\'s Name',
            placeholder: 'Full name of offender',
            required: true
        }
    },
    {
        key: 'email',
        type: 'input',
        templateOptions: {
            type: 'email',
            label: 'Offender\'s email address',
            placeholder: 'Email of Offender',
            required: true
        }
    },
    {
        key: 'phoneNumber',
        type: 'input',
        templateOptions: {
            type: '',
            label: 'Offender\'s Phone Number',
            placeholder: 'Phone Number',
            required: false
        },
        validators: {
            phoneNumber: function($viewValue, $modelValue, scope) {
                var value = $modelValue || $viewValue;
                if(value) {
                    return /^0[234578]\d{6}\d?\d?$/.test(value);
                }
           }
       }

    }
    ];

    $scope.submitReport = function() {
        var report = new Report();
        report.name = $scope.name;
        report.ids = [];
        report.ids.push({idType: 'email',
                          value: $scope.email});
        report.$save(function(result) {
            console.log(result);
        });
    };
}]);
