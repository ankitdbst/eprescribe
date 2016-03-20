(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
            directive('datetimepicker', datetimepicker);

    datetimepicker.$inject = ['$rootScope'];

    function datetimepicker($rootScope) {
        function link(scope, element, attrs) {
            var options = {
              useCurrent: false
            };

            var pickerEl = element.find('.date');
            scope.$watch('ngModel', function(newValue) {
              if(_.isEmpty(pickerEl.data("DateTimePicker"))) {
                pickerEl.datetimepicker(options);
              } else {
                if(!_.isEmpty(newValue)) {
                  pickerEl.data("DateTimePicker").date(new Date(newValue));
                }
              }
            });

            element.find('input').attr('placeholder', attrs.placeholder);
            element.find('input').attr('ng-change', attrs.ngChange);

            element.bind('dp.change', function (e) {
                scope.ngModel = e.date;
            });
        }

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Utils/partials/datetimepicker.html',
            scope: {
                ngModel: '='
            }
        };

        return directive;
    }
})();