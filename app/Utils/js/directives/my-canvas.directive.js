(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('myCanvas', myCanvas);

    myCanvas.$inject = ['$rootScope'];

    function myCanvas($rootScope) {
        function link(scope, elm, attrs) {
            //create canvas and context
            var canvas = document.createElement('canvas');
            canvas.id = 'canvas';
            canvas.setAttribute('resize', '');
            var canvasTmp = document.createElement('canvas');
            canvasTmp.id = 'canvasTmp';
            canvasTmp.setAttribute('resize', '');
            angular.element(canvasTmp).css({
              position: 'absolute',
              top: 0,
              left: 0
            });
            elm.find('div').append(canvas);
            elm.find('div').append(canvasTmp);
            var ctx = canvas.getContext('2d');
            var ctxTmp = canvasTmp.getContext('2d');

            //set canvas size
//            canvas.width = canvasTmp.width = 600;
//            canvas.height = canvasTmp.height = 400;

            paper.setup(canvasTmp);
            canvas.width = canvasTmp.width;
            canvas.height = canvasTmp.height;

            paper.onResize = function(event) {
              canvas.width = canvasTmp.width;
              canvas.height = canvasTmp.height;
            }

            var tool = new paper.Tool();

            tool.minDistance = 0;
            tool.maxDistance = 45;

            var path;

            tool.onMouseDown = function(event) {
              path = new paper.Path();
              path.fillColor = 'black';
              path.fillCap = 'round'
              path.add(event.point);
              var dot = new paper.Path.Circle(event.point, 1.5);
              dot.fillColor = 'black';
            }

            tool.onMouseDrag = function(event) {
              var step = event.delta.divide(2);
              var fillWidth = 1.5;

              //var alpha = 1/step.length;
              var lineWidth = fillWidth/step.length;
              //console.log('Event.Length: ', step.length);
              //console.log('Alpha: ', alpha);

              var len = step.length;
              //console.log('Step Before:', step.length);

              var alpha = 1;
              var velocity = alpha*((2*len)/tool.maxDistance);
              console.log('scalar: ', (fillWidth - velocity));
              step = step.multiply((fillWidth - velocity)/len);
              //console.log('Step After:', step.length);

              console.log('step before: ', step.angle);
              step.angle += 90;
              console.log('step after: ', step.angle);

              //console.log('Step length: ', step.length);

              console.log('\n');
              var top = event.middlePoint.add(step);
              var bottom = event.middlePoint.subtract(step);

              path.add(top);
              path.insert(0, bottom);
              path.smooth({type: 'catmull-rom'});
            }

            tool.onMouseUp = function(event) {
              path.add(event.point);
              path.closed = true;

              ctx.drawImage(canvasTmp, 0, 0, canvas.width, canvas.height);
              paper.project.clear();

//              path.smooth({type: 'catmull-rom'});
//              path.rasterize();
//              path.visible = false;
            }
        }

        var directive = {
            link: link,
            restrict: 'AE',
            scope: {
              ngModel: '='
            },
            template: '<div class="myCanvasPaint" style="position:relative"></div>'
        };

        return directive;
    }
})();