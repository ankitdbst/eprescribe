(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('spy', spy);

    spy.$inject = ['$location', '$anchorScroll'];

    function spy($location, $anchorScroll) {
        return {
            restrict: "A",
            require: "^scrollSpy",
            link: function (scope, elem, attrs, affix) {
                elem.click(function () {
                    $location.hash(attrs.spy);
                    $anchorScroll();
                });

                affix.addSpy({
                    id: attrs.spy,
                    in: function () {
                        elem.addClass('active');
                    },
                    out: function () {
                        elem.removeClass('active');
                    }
                });
            }
        };
    }
})();