(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('resizableCanvas', resizableCanvas);

    resizableCanvas.$inject = ['$rootScope'];

    function resizableCanvas($rootScope) {
        function link(scope, element, attrs) {
            var options;
            eval("options="+attrs.options);

            var listener = scope.$watch(function() {
                var pwCanvasMain = element.find('#'+options.customCanvasId)
                if (!pwCanvasMain) return // check if its undefined
                // continue to manipulate children elements...
                Init();
            });

            function Init() {
              listener();
              var pwCanvasMain = element.find('#'+options.customCanvasId).get(0);
              var pwCanvasTmp = element.find('#'+options.customCanvasId+'Tmp').get(0);

              var imageObject = element.find('img').get(0);

              LoadCanvasFromImage();
              $(window).bind('resize', LoadCanvasFromImage);
              $(window).bind('mouseup', PaintCanvasToImage);

              function PaintCanvasToImage() {
                console.log('Watch called');
                var imageData = pwCanvasMain.toDataURL();
                imageObject.src = imageData;
                scope.$apply(function() {
                  scope.ngModel = imageData;
                });
              }

              function LoadCanvasFromImage() {
                var context = pwCanvasMain.getContext('2d');
                context.clearRect(0, 0, pwCanvasMain.width, pwCanvasMain.height);
                pwCanvasMain.width = element.parent().width();
                pwCanvasTmp.width = element.parent().width();
                imageObject.src = scope.ngModel;
                context.drawImage(imageObject, 0, 0);
              }

              scope.$on('$destroy', function() {
                $(window).unbind('resize', LoadCanvasFromImage);
                $(window).unbind('mouseup', PaintCanvasToImage);
                console.log('Unbinded resize, mouseup handlers from canvas');
              });
            }
        }

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
              ngModel: '=',
              options: '='
            },
            templateUrl: 'Utils/partials/resizable-canvas.html'
        };

        return directive;
    }
})();