(function() {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.directives').
    directive('medicines', medicines);

    medicines.$inject = ['$rootScope'];

    function medicines($rootScope) {
        function link(scope, element, attrs) {
           //
        }

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Prescriptions/partials/prescriptions.medicines.html'
        };

        return directive;
    }
})();