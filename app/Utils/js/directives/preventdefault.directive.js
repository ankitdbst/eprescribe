(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('preventDefault', preventDefault);

    function preventDefault() {
        return function (scope, element, attrs) {
            jQuery(element).click(function (event) {
                event.preventDefault();
            });
        }
    }
})();