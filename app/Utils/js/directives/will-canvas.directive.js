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

        strokes: new Array(),

        init: function(width, height, canvas) {
          this.isTouch = !!('ontouchstart' in window);
          this.initInkEngine(width, height, canvas);
          this.initEvents();
        },

        initInkEngine: function(width, height, canvas) {
          this.canvas = new Module.InkCanvas(canvas, width, height);
          this.strokesLayer = this.canvas.createLayer();

          this.clear();

          this.brush = new Module.SolidColorBrush();

          this.pathBuilder = new Module.SpeedPathBuilder();
          this.pathBuilder.setNormalizationConfig(5, 210);
          this.pathBuilder.setPropertyConfig(Module.PropertyName.Width, 1, 3.2, NaN, NaN, Module.PropertyFunction.Sigmoid, 0.6, true);

          this.smoothener = new Module.MultiChannelSmoothener(this.pathBuilder.stride);

          this.strokeRenderer = new Module.StrokeRenderer(this.canvas);
          this.strokeRenderer.configure({brush: this.brush, color: this.color});
        },

        initEvents: function() {
          var self = this;
          $(Module.canvas).on("mousedown touchstart", function(e) {self.beginStroke(e);});
          $(Module.canvas).on("mousemove touchmove", function(e) {self.moveStroke(e);});
          $(Module.canvas).on("mouseup touchend", function(e) {self.endStroke(e);});
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

        beginStroke: function(e) {
          e.preventDefault();
          var point = {x: 0, y: 0};
          this.setPointFromEvent(point, e.originalEvent);
//          console.log("Point", {x: e.clientX, y: e.clientY});
          console.re.log("Original Point", point);
          this.inputPhase = Module.InputPhase.Begin;

          this.buildPath(point);
          this.drawPath();
        },

        moveStroke: function(e) {
          e.preventDefault();
          if (!this.inputPhase) return;

          this.inputPhase = Module.InputPhase.Move;
          var point = {x: 0, y: 0};
          this.setPointFromEvent(point, e.originalEvent);
//          console.log("Point", {x: e.clientX, y: e.clientY});
          console.re.log("Original Point", point);
          this.pointerPos = point;

          if (WILL.frameID != WILL.canvas.frameID) {
            var self = this;

            WILL.frameID = WILL.canvas.requestAnimationFrame(function() {
              if (self.inputPhase && self.inputPhase == Module.InputPhase.Move) {
                self.buildPath(self.pointerPos);
                self.drawPath();
              }
            }, true);
          }
        },

        endStroke: function(e) {
          e.preventDefault();
          if (!this.inputPhase) return;

          this.inputPhase = Module.InputPhase.End;

          var point = {x: 0, y: 0};
          this.setPointFromEvent(point, e.originalEvent);
//          console.log("Point", {x: e.clientX, y: e.clientY});
          console.re.log("Original Point", point);
          this.buildPath(point);
          this.drawPath();

          var stroke = new Module.Stroke(this.brush, this.path, NaN, this.color, 0, 1);
          this.strokes.push(stroke);

          delete this.inputPhase;
        },

        buildPath: function(pos) {
          if (this.inputPhase == Module.InputPhase.Begin)
            this.smoothener.reset();

          var pathPart = this.pathBuilder.addPoint(this.inputPhase, pos, Date.now()/1000);
          console.re.log("Path Part", window.JSON.stringify(pathPart));
          var smoothedPathPart = this.smoothener.smooth(pathPart, this.inputPhase == Module.InputPhase.End);
          var pathContext = this.pathBuilder.addPathPart(smoothedPathPart);

          this.pathPart = pathContext.getPathPart();
          this.path = pathContext.getPath();

          if (this.inputPhase == Module.InputPhase.Move) {
            var preliminaryPathPart = this.pathBuilder.createPreliminaryPath();
            var preliminarySmoothedPathPart = this.smoothener.smooth(preliminaryPathPart, true);

            this.preliminaryPathPart = this.pathBuilder.finishPreliminaryPath(preliminarySmoothedPathPart);
          }
        },

        drawPath: function() {
          if (this.inputPhase == Module.InputPhase.Begin) {
            this.strokeRenderer.draw(this.pathPart, false);
            this.strokeRenderer.blendUpdatedArea();
          }
          else if (this.inputPhase == Module.InputPhase.Move) {
            this.strokeRenderer.draw(this.pathPart, false);
            this.strokeRenderer.drawPreliminary(this.preliminaryPathPart);

            this.canvas.clear(this.strokeRenderer.updatedArea, this.backgroundColor);
            this.canvas.blend(this.strokesLayer, {rect: this.strokeRenderer.updatedArea});

            this.strokeRenderer.blendUpdatedArea();
          }
          else if (this.inputPhase == Module.InputPhase.End) {
            this.strokeRenderer.draw(this.pathPart, true);
            this.strokeRenderer.blendStroke(this.strokesLayer, Module.BlendMode.NORMAL);

            this.canvas.clear(this.strokeRenderer.strokeBounds, this.backgroundColor);
            this.canvas.blend(this.strokesLayer, {rect: this.strokeRenderer.strokeBounds});
          }
        },

        redraw: function(dirtyArea) {
          if (!dirtyArea) dirtyArea = this.canvas.bounds;
          dirtyArea = Module.RectTools.ceil(dirtyArea);

          this.strokesLayer.clear(dirtyArea);

          this.strokes.forEach(function(stroke) {
            var affectedArea = Module.RectTools.intersect(stroke.bounds, dirtyArea);

            if (affectedArea) {
              this.strokeRenderer.draw(stroke);
              this.strokeRenderer.blendStroke(this.strokesLayer, stroke.blendMode);
            }
          }, this);

          this.refresh(dirtyArea);
        },

        refresh: function(dirtyArea) {
          this.canvas.blend(this.strokesLayer, {rect: Module.RectTools.ceil(dirtyArea)});
        },

        clear: function() {
          this.strokes = new Array();

          this.strokesLayer.clear(this.backgroundColor);
          this.canvas.clear(this.backgroundColor);
        },

        load: function(e) {
          var input = e.currentTarget;
          var file = input.files[0];
          var reader = new FileReader();

          reader.onload = function(e) {
            WILL.clear();

            var strokes = Module.InkDecoder.decode(new Uint8Array(e.target.result));
            WILL.strokes.pushArray(strokes);
            WILL.redraw(strokes.bounds);
          };

          reader.readAsArrayBuffer(file);
        },

        save: function() {
          var data = Module.InkEncoder.encode(this.strokes);
          saveAs(data, "export.data", "application/octet-stream");
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
