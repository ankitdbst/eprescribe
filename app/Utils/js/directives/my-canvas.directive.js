(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('myCanvas', myCanvas);

    myCanvas.$inject = [];

    function myCanvas() {
        function link(scope, elm, attrs) {
            var isTouch = !!('ontouchstart' in window);

            var PAINT_START = isTouch ? 'touchstart' : 'mousedown';
            var PAINT_MOVE = isTouch ? 'touchmove' : 'mousemove';
            var PAINT_END = isTouch ? 'touchend' : 'mouseup';

            var options = attrs.options || {};

            // create canvas and context
            var canvas = document.createElement('canvas');
            canvas.id = options.canvasId;
            canvas.setAttribute('resize', '');

            var canvasTmp = document.createElement('canvas');
            canvasTmp.id = options.tmpCanvasId;
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

            //inti variables
            var point = {
              x: 0,
              y: 0
            };
            paper.remove();
            paper.setup(canvasTmp);

            // Set Canvas Width; At this point resize has taken effect and the
            // Canvas occupies the maximum width available
            canvas.width = canvasTmp.width;
            canvas.height = canvasTmp.height;

            // Paper JS Path
            var path;

            var getOffset = function(elem) {
              var offsetTop = 0;
              var offsetLeft = 0;
              do {
                if (!isNaN(elem.offsetLeft)) {
                  offsetTop += elem.offsetTop;
                  offsetLeft += elem.offsetLeft;
                }
                elem = elem.offsetParent;
              } while (elem);
              return {
                left: offsetLeft,
                top: offsetTop
              };
            };

            var setPointFromEvent = function(point, e) {
              if (isTouch) {
                point.x = e.changedTouches[0].pageX - getOffset(e.target).left;
                point.y = e.changedTouches[0].pageY - getOffset(e.target).top;
              } else {
                point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
                point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
              }
            };

            var saveImage = function () {
              scope.$apply(function() {
                scope.ngModel = canvas.toDataURL();
              });
            };

            var paint = function(e) {
              var p1 = new paper.Point(point.x, point.y), p2;
              if (e) {
                e.preventDefault();
                setPointFromEvent(point, e);
                p2 = new paper.Point(point.x, point.y);

                if (p1.equals(p2)) return;

                var delta = p2.subtract(p1);
                var step = delta.divide(2);

                var fillWidth = 2; // Hard coded as of now
                var lineWidth = fillWidth/step.length;
                var len = step.length;
                var alpha = 1;
                var velocity = alpha*((2*len)/45);

                step = step.multiply((fillWidth - velocity)/len);
                step.angle += 90;

                var middlePoint = (p1.add(p2)).divide(2);
                var top = middlePoint.add(step);
                var bottom = middlePoint.subtract(step);

                //console.log('Points: Top: ', top, 'Bottom: ', bottom);
                path.add(top);
                path.insert(0, bottom);

                // Smoothen the path
                path.smooth();
              }
            };

            var copyTmpImage = function(e) {
              setPointFromEvent(point, e);
              path.add(point);
              path.closed = true;

              canvasTmp.removeEventListener(PAINT_MOVE, paint, false);
              ctx.drawImage(canvasTmp, 0, 0);

              // Remove all the active layers in Paper JS
              // We do this because the re-draw becomes too time intensivev operation
              // once the number of drawing objects are large on the canvas
              paper.project.clear();
              // This is causing some performance impact.
              // Need to schedule this on demand
              // saveImage();
            };

            var startTmpImage = function(e) {
              e.preventDefault();
              canvasTmp.addEventListener(PAINT_MOVE, paint, false);

              setPointFromEvent(point, e);
              path = new paper.Path();
              path.fillColor = 'black';
              path.fillCap = 'round'
              path.add(point);
              paint();
            };

            var initListeners = function() {
              canvasTmp.addEventListener(PAINT_START, startTmpImage, false);
              canvasTmp.addEventListener(PAINT_END, copyTmpImage, false);

              if (!isTouch) {
                var MOUSE_DOWN;

                document.body.addEventListener('mousedown', mousedown);
                document.body.addEventListener('mouseup', mouseup);

                scope.$on('$destroy', removeEventListeners);

                canvasTmp.addEventListener('mouseenter', mouseenter);
                canvasTmp.addEventListener('mouseleave', mouseleave);
              }

              function mousedown() {
                MOUSE_DOWN = true;
              }

              function mouseup() {
                MOUSE_DOWN = false;
              }

              function removeEventListeners() {
                document.body.removeEventListener('mousedown', mousedown);
                document.body.removeEventListener('mouseup', mouseup);
              }

              function mouseenter(e) {
                // If the mouse is down when it enters the canvas, start a path
                if (MOUSE_DOWN) {
                  startTmpImage(e);
                }
              }

              function mouseleave(e) {
                // If the mouse is down when it leaves the canvas, end the path
                if (MOUSE_DOWN) {
                  copyTmpImage(e);
                }
              }
            };

            var init = function() {
              // Hack to get canvas to work on touch devices
              // This maybe due to some internal issue with e-remedium app
              // or it maybe a global issue
              var body = $('body').get(0);
              var scrollTopInitial = body.scrollTop;
              body.scrollTop = 0;

              scope.$on('$destroy', removeScrollTop);

              loadImage();

              function removeScrollTop() {
                body.scrollTop = scrollTopInitial;
              }

              function loadImage() {
                if (_.isEmpty(scope.ngModel)) {
                  return;
                }
                var image = document.createElement('img');
                image.src = scope.ngModel;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
              }

              // Initialize listeners
              initListeners();
            };

            init();
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

    angular.module('ERemediumWebApp.utils.directives').
    directive('palmReject', palmReject);

    palmReject.$inject = ['$rootScope'];

    function palmReject($rootScope) {
      function link(scope, elm, attrs) {
        var elem = elm;
        elm.on('touchstart touchmove', function(e) {
          e.preventDefault();
        });

        var buffer = 50; // 50px

        $rootScope.$on('canvas.write', function(e, top) {
          var windowHeight = $(window).height();
          var rTop = windowHeight - elem.height();
          if( rTop - top < 50 ) {
            var newHeight = windowHeight - (top + buffer);
            elem.height(newHeight);
          }
        });
      }

      return {
        link: link,
        restrict: 'AE'
      }
    }
})();
