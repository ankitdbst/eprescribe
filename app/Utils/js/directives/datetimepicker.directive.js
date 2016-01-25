(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
            directive('datetimepicker', datetimepicker);

    datetimepicker.$inject = ['$rootScope'];

    function datetimepicker($rootScope) {
        function link(scope, element, attrs) {
            element.find('.date').datetimepicker();
            element.find('input').attr('placeholder', attrs.placeholder);

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