(function() {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.directives').
    directive('items', items);

    items.$inject = ['$rootScope'];

    function items($rootScope) {
        function link(scope, element, attrs) {
           scope.editable = false;
           if(attrs.editable) {
            scope.editable = true;
           }
           scope.type = attrs.type;
        }

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: function(element, attrs) {
              return 'Prescriptions/partials/prescriptions.' + attrs.type + 's.html';
            },
            controller: 'PrescriptionItemsCtrl',
            scope: {
              prescription: '=prescription'
            }
        };

        return directive;
    }
})();
