(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('palmReject', palmReject);

    palmReject.$inject = [];

    function palmReject() {
      function link(scope, elm, attrs) {
        var isTouch = !!('ontouchstart' in window);

        var START = isTouch ? 'touchstart' : 'mousedown';
        var MOVE = isTouch ? 'touchmove' : 'mousemove';
        var END = isTouch ? 'touchend' : 'mouseup';

        elm.on(START + ' ' + MOVE, function(e) {
          e.preventDefault();
          if (e.stopPropagation) {
            e.stopPropagation();
          }
        });

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

        var slider = elm.find('.rg-top').get(0);
        var palmReject = elm.find('.palm-rejection--wrapper');

        var dragging = true;
        var point = {};

        slider.addEventListener(START, function(e) {
          e.preventDefault();
          dragging = true;
          setPointFromEvent(point, e);
        }, false);

        slider.addEventListener(MOVE, function(e) {
          e.preventDefault();
          var prevY = point.y;
          setPointFromEvent(point, e);
          if (dragging) {
            var newTop = Math.min((parseInt(palmReject.css('top'), 10) + (point.y-prevY)), window.innerHeight-50);
            palmReject.css(
              'top', newTop + 'px'
            );
          }
        }, false);

        slider.addEventListener(END, function(e) {
          e.preventDefault();
          dragging = false;
        }, false);
      }

      return {
        link: link,
        restrict: 'AE',
        template: '<div class="palm-rejection--wrapper"><div class="rg-top"><span></span></div></div>'
      }
    }
}) ();