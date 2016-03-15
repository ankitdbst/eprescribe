(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('myCanvas', myCanvas);

    myCanvas.$inject = ['$rootScope'];

    function myCanvas($rootScope) {
        function link(scope, element, attrs) {
            var canvas = element.get(0);

            paper.setup(canvas);
            var tool = new paper.Tool();

            tool.minDistance = 0;
            tool.maxDistance = 45;

            var path;
            tool.onMouseDown = function(event) {
                path = new paper.Path({
                    segments: [event.point],
                    strokeColor: 'black',
                    strokeWidth: 3,
                    strokeCap: 'round'
                });
                var dot = new paper.Path.Circle(event.point, 1.5);
                dot.fillColor = 'black';
            }

            tool.onMouseDrag = function(event) {
              path.add(event.point);
            }

            tool.onMouseUp = function(event) {
              path.add(event.point);
              path.simplify();
            }
        }

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
              ngModel: '='
            }
        };

        return directive;
    }
})();