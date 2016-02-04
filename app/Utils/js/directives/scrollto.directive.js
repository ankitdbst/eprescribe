(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('scrollTo', scrollTo);

    scrollTo.$inject = ['$window'];

    function scrollTo($window) {
        return {
            restrict: "AC",
            compile: function () {

                function scrollInto(elementId) {
                    if (!elementId)
                        $window.scrollTo(0, 0);
                    //check if an element can be found with id attribute
                    var el = document.getElementById(elementId);
                    if (el)
                        el.scrollIntoView();
                }

                return function (scope, element, attr) {
                    element.bind("click", function (event) {
                        scrollInto(attr.scrollTo);
                    });
                };
            }
        };
    }
})();