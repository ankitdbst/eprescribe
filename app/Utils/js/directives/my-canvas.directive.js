(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('myCanvas', myCanvas);

    myCanvas.$inject = ['$rootScope'];

    function myCanvas($rootScope) {
        function link(scope, element, attrs) {
            var canvas = element.get(0);
            var options = {
              minWidth: 0.5,
              maxWidth: 2,
              penColor: '#000',
              onEnd: ToImage
            };
            var signaturePad = new SignaturePad(canvas, options);

            FromImage();

            function ToImage() {
              scope.$apply(function() {
                scope.ngModel = signaturePad.toDataURL();
              });
            }

            function FromImage() {
              var image = document.createElement('img');
              image.src = scope.ngModel;

              var context = canvas.getContext('2d');
              context.clearRect(0, 0, canvas.width, canvas.height);
              context.drawImage(image, 0, 0);
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