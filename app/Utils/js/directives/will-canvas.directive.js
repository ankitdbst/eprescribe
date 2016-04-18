(function() {
  'use strict';

  angular.module('ERemediumWebApp.utils.directives').
  directive('willCanvas', willCanvas);

  willCanvas.$inject = [];

  function willCanvas() {
    function link(scope, elem, attrs) {
      var canvas = elem.get(0);
      var WILL = {
        backgroundColor: Module.Color.WHITE,
        color: Module.Color.BLACK,

        init: function(width, height, canvas) {
          this.isTouch = !!('ontouchstart' in window);
          this.initInkEngine(width, height, canvas);
          this.initEvents();
        },

        initInkEngine: function(width, height, canvas) {
          this.canvas = new Module.InkCanvas(canvas, width, height);
          this.canvas.clear(this.backgroundColor);

          this.brush = new Module.DirectBrush();

          this.speedPathBuilder = new Module.SpeedPathBuilder();
          this.speedPathBuilder.setNormalizationConfig(182, 3547);
          // this.speedPathBuilder.setPropertyConfig(Module.PropertyName.Width, 2.05, 34.53, 0.72, NaN, Module.PropertyFunction.Power, 1.19, false);
          this.speedPathBuilder.setPropertyConfig(Module.PropertyName.Width, 0.5, 1.2, NaN, NaN, Module.PropertyFunction.Sigmoid, 0.6, true);

          if (window.PointerEvent) {
            this.pressurePathBuilder = new Module.PressurePathBuilder();
            this.pressurePathBuilder.setNormalizationConfig(0.195, 0.88);
            this.pressurePathBuilder.setPropertyConfig(Module.PropertyName.Width, 2.05, 34.53, 0.72, NaN, Module.PropertyFunction.Power, 1.19, false);
            this.smoothener = new Module.MultiChannelSmoothener(this.pressurePathBuilder.stride);
          } else {
            this.smoothener = new Module.MultiChannelSmoothener(this.speedPathBuilder.stride);
          }

          this.strokeRenderer = new Module.StrokeRenderer(this.canvas, this.canvas);
          this.strokeRenderer.configure({brush: this.brush, color: this.color});
        },

        initEvents: function() {
          var self = this;

          if (window.PointerEvent) {
            Module.canvas.addEventListener("pointerdown", function(e) {self.beginStroke(e);});
            Module.canvas.addEventListener("pointermove", function(e) {self.moveStroke(e);});
            document.addEventListener("pointerup", function(e) {self.endStroke(e);});
          }
          else {
            Module.canvas.addEventListener("mousedown", function(e) {self.beginStroke(e);});
            Module.canvas.addEventListener("mousemove", function(e) {self.moveStroke(e);});
            document.addEventListener("mouseup", function(e) {self.endStroke(e);});

            if (window.TouchEvent) {
              Module.canvas.addEventListener("touchstart", function(e) {self.beginStroke(e);});
              Module.canvas.addEventListener("touchmove", function(e) {self.moveStroke(e);});
              document.addEventListener("touchend", function(e) {self.endStroke(e);});
            }
          }
        },

        getOffset: function(elem) {
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
        },

        setPointFromEvent: function(point, e) {
          if (this.isTouch) {
            point.x = e.changedTouches[0].pageX - this.getOffset(e.target).left;
            point.y = e.changedTouches[0].pageY - this.getOffset(e.target).top;
          } else {
            point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
            point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
          }
        },

        getPressure: function(e) {
          return (window.PointerEvent && e instanceof PointerEvent && e.pressure !== 0.5)?e.pressure:NaN;
        },

        beginStroke: function(e) {
          // if (e.button != 0) return;
          console.re.log("Event [Begin Phase]: ", e);
          e.preventDefault();
          this.inputPhase = Module.InputPhase.Begin;
          this.pressure = this.getPressure(e);
          this.pathBuilder = isNaN(this.pressure)?this.speedPathBuilder:this.pressurePathBuilder;

          var point = {x: 0, y: 0};
          this.setPointFromEvent(point, e);
          this.buildPath(point);
          this.drawPath();
        },

        moveStroke: function(e) {
          if (!this.inputPhase) return;
          e.preventDefault();
          this.inputPhase = Module.InputPhase.Move;
          var point = {x: 0, y: 0};
          this.setPointFromEvent(point, e);

          this.pointerPos = point;
          this.pressure = this.getPressure(e);

          if (WILL.frameID != WILL.canvas.frameID) {
            var self = this;
//            if(!self.lastCalledTime) {
//               self.lastCalledTime = Date.now();
//               var fps = 0;
//               return;
//            }
//            var delta = (Date.now() - self.lastCalledTime)/1000;
//            self.lastCalledTime = Date.now();
//            fps = 1/delta;
//            console.re.log("FPS: ", fps);

            WILL.frameID = WILL.canvas.requestAnimationFrame(function() {
              if (self.inputPhase && self.inputPhase == Module.InputPhase.Move) {
                self.buildPath(self.pointerPos);
                self.drawPath();
              }
            }, true);
          }
        },

        endStroke: function(e) {
          if (!this.inputPhase) return;
          e.preventDefault();
          this.inputPhase = Module.InputPhase.End;
          this.pressure = this.getPressure(e);
          var point = {x: 0, y: 0};
          this.setPointFromEvent(point, e);
          this.buildPath(point);
          this.drawPath();

          delete this.inputPhase;
        },

        buildPath: function(pos) {
          if (this.inputPhase == Module.InputPhase.Begin)
            this.smoothener.reset();

          var pathBuilderValue = isNaN(this.pressure)?Date.now() / 1000:this.pressure;

          var pathPart = this.pathBuilder.addPoint(this.inputPhase, pos, pathBuilderValue);
          // var pathContext = this.pathBuilder.addPathPart(pathPart);
          var smoothedPathPart = this.smoothener.smooth(pathPart, this.inputPhase == Module.InputPhase.End);
          var pathContext = this.pathBuilder.addPathPart(smoothedPathPart);

          this.pathPart = pathContext.getPathPart();
        },

        drawPath: function() {
          this.strokeRenderer.draw(this.pathPart, this.inputPhase == Module.InputPhase.End);
        },

        clear: function() {
          this.canvas.clear(this.backgroundColor);
        }
      };

      Module.InkDecoder.getStrokeBrush = function(paint) {
        return WILL.brush;
      }

      WILL.init(canvas.parentElement.offsetWidth, canvas.parentElement.offsetHeight, canvas);
    }

    var directive = {
        link: link,
        restrict: 'AE',
        scope: {
          ngModel: '='
        }
    };

    return directive;
  }
}) ();
