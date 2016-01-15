(function() {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('typeahead1', typeahead1);

    typeahead1.$inject = ['$rootScope'];

    function typeahead1($rootScope) {
        function link(scope, element, attrs) {
            var options = {
              minLength: 1,
              highlight: true
            };

            var dataset = {
              name: 'my-dataset',
              source: function(query, syncResults, asyncResults) {
                syncResults(['option1', 'option2', 'option3']);
              }
            };

            element.typehead(options, dataset);
        }

        var directive = {
            link: link,
            restrict: 'A',
            scope: {}
        };

        return directive;
    }
})();