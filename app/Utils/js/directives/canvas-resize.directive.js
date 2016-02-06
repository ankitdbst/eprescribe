(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
            directive('canvasResize', canvasResize);

    canvasResize.$inject = ['$rootScope'];

    function canvasResize($rootScope) {
        function link(scope, element, attrs) {
          scope.$watch('canvasEditable', function(newValue, oldValue) {
            repaint(newValue);
          });

          $(window).bind('resize', LoadCanvasFromImage);

          var pwCanvasMain = element.find('#pwCanvasMain').get(0);
          var pwCanvasTmp = element.find('#pwCanvasTmp').get(0);
          var context = pwCanvasMain.getContext('2d');

          var imageObject = $('.img-diagnosis').get(0);
//          imageObject.onload = LoadCanvasFromImage();

          function repaint(editable) {
            if(editable == true) {
              LoadCanvasFromImage();
            } else {
              if($(imageObject).attr('src') === "" && scope.prescription.imageSrc !== undefined) {
                imageObject.src = scope.prescription.imageSrc;
              } else {
                PaintCanvasToImage();
              }

            }
          }

          function PaintCanvasToImage() {
            var imageData = pwCanvasMain.toDataURL();
            imageObject.src = imageData;
            scope.prescription.imageSrc = imageData;
          }

          function LoadCanvasFromImage() {
            context.clearRect(0, 0, pwCanvasMain.width, pwCanvasMain.height);
            pwCanvasMain.width = element.parent().width();
            pwCanvasTmp.width = element.parent().width();
            context.drawImage(imageObject, 0, 0);
          }
        }

        var directive = {
            link: link,
            restrict: 'A'
        };

        return directive;
    }
})();