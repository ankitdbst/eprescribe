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
            templateUrl: 'Prescriptions/partials/prescriptions.navbar.html'
        };

        return directive;
    }
})();