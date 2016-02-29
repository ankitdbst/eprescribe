(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('resizableCanvas', resizableCanvas);

    resizableCanvas.$inject = ['$rootScope'];

    function resizableCanvas($rootScope) {
        function link(scope, element, attrs) {
            var canvas = element.find('canvas').get(0);

            var listener = scope.$watch(function() {
              Init();
            });

            function Init() {
              listener();
              var options = {};
              if( !_.isUndefined(attrs.defaultSize) ) {
                options.defaultSize = attrs.defaultSize;
              }

              if( !_.isUndefined(attrs.defaultColor) ) {
                options.defaultColor = attrs.defaultColor;
              }

              scope.height = attrs.height;
              scope.width = attrs.width;

              console.log('Options: ', options);

              $(canvas).sketch(options);
              var imageObject = element.find('img').get(0);

              LoadCanvasFromImage();
              $(window).bind('resize', LoadCanvasFromImage);
              $(canvas).bind('touchend mouseup', PaintCanvasToImage);

              function PaintCanvasToImage() {
                console.log('Watch called');
                var imageData = canvas.toDataURL();
                imageObject.src = imageData;
                scope.$apply(function() {
                  scope.ngModel = imageData;
                });
              }

              function LoadCanvasFromImage() {
                var context = canvas.getContext('2d');
                context.clearRect(0, 0, canvas.width, canvas.height);
                canvas.width = element.parent().width();
                imageObject.src = scope.ngModel;
                context.drawImage(imageObject, 0, 0);
              }

              scope.$on('$destroy', function() {
                $(window).unbind('resize', LoadCanvasFromImage);
                $(window).unbind('touchend mouseup', PaintCanvasToImage);
                console.log('Unbinded resize, mouseup handlers from canvas');
              });
            }
        }

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
              ngModel: '='
            },
            templateUrl: 'Utils/partials/resizable-canvas.html'
        };

        return directive;
    }
})();