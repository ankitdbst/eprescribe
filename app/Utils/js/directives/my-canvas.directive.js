(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('myCanvas', myCanvas);

    myCanvas.$inject = ['$rootScope'];

    function myCanvas($rootScope) {
        function link(scope, element, attrs) {
            var canvas = element.get(0);

            if( attrs.fullScreen )
              canvas.height = window.innerHeight;

            // Adjust canvas coordinate space taking into account pixel ratio,
            // to make it look crisp on mobile devices.
            // This also causes canvas to be cleared.
            function resizeCanvas() {
                // When zoomed out to less than 100%, for some very strange reason,
                // some browsers report devicePixelRatio as less than 1
                // and only part of the canvas is cleared then.
                var ratio =  Math.max(window.devicePixelRatio || 1, 1);
                canvas.width = canvas.offsetWidth * ratio;
                canvas.height = canvas.offsetHeight * ratio;
                console.log("Ratio: ", ratio);
                FromImage();
                canvas.getContext("2d").scale(ratio, ratio);
            }

            window.onresize = resizeCanvas;
            resizeCanvas();

            var options = {
              minWidth: 0.5,
              maxWidth: 2,
              penColor: '#000',
              onEnd: ToImage
            };
            var signaturePad = new SignaturePad(canvas, options);

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