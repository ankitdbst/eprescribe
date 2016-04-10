(function() {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.directives').
    directive('navbar', navbar);

    navbar.$inject = ['$rootScope'];

    function navbar($rootScope) {
        function link(scope, element, attrs) {

        }

        var directive = {
            link: link,
            restrict: 'E',
            transclude: true,
            templateUrl: function(element, attr) {
              return 'Prescriptions/partials/prescriptions.' + attr.type + '.html';
            }
        };

        return directive;
    }
})();
