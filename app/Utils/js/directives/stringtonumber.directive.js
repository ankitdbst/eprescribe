(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('stringToNumber', stringToNumber);

    stringToNumber.$inject = ['$rootScope'];

    function stringToNumber($rootScope) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function (value) {
                    return parseFloat(value, 10);
                });
            }
        };
    }
})();