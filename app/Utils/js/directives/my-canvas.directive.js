(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('myCanvas', myCanvas);

    myCanvas.$inject = ['$rootScope'];

    function myCanvas($rootScope) {
        function link(scope, element, attrs) {
            var canvas = element.get(0);
            scope.height = attrs.height;
            scope.width = attrs.width;

            var options = {};
            if( !_.isUndefined(attrs.defaultSize) ) {
              options.defaultSize = attrs.defaultSize;
            }

            if( !_.isUndefined(attrs.defaultColor) ) {
              options.defaultColor = attrs.defaultColor;
            }

            LoadCanvasFromImage();
            element.sketch(options);
            element.bind('touchend mouseup', PaintCanvasToImage);

            function PaintCanvasToImage() {
              scope.$apply(function() {
                scope.ngModel = canvas.toDataURL();
              });
            }

            function LoadCanvasFromImage() {
              var image = document.createElement('img');
              image.src = scope.ngModel;

              var context = canvas.getContext('2d');
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(image, 0, 0);
            }

            scope.$on('$destroy', function() {
              $(window).unbind('touchend mouseup', PaintCanvasToImage);
              console.log('Unbinded resize, mouseup handlers from canvas');
            });
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