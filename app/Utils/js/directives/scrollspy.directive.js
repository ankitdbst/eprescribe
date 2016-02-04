(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('scrollSpy', scrollSpy);

    function scrollSpy($timeout) {
        return {
            restrict: 'A',
            link: function (scope, elem, attr) {
                var offset = parseInt(attr.scrollOffset, 10)
                if (!offset)
                    offset = 10;
                console.log("offset:  " + offset);
                elem.scrollspy({"offset": offset});
                scope.$watch(attr.scrollSpy, function (value) {
                    $timeout(function () {
                        elem.scrollspy('refresh', {"offset": offset})
                    }, 1);
                }, true);
            }
        }
    }
})();