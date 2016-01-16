(function() {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('datetimepicker', datetimepicker);

    datetimepicker.$inject = ['$rootScope'];

    function datetimepicker($rootScope) {
        function link(scope, element, attrs) {
            element.find('.date').datetimepicker();
            element.find('input').attr('placeholder', attrs.placeholder);
        }

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Utils/partials/datetimepicker.html',
            scope: {}
        };

        return directive;
    }
})();