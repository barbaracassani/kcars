define('canvas_state', [], function () {

    'use strict';

    function CanvasState() {}

    CanvasState.prototype.init = function (canvas) {

        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.shapes = [];
        this.ctx = canvas.getContext('2d');
    };

    CanvasState.prototype.addShape = function(shape) {
        this.shapes.push(shape);
        shape.draw(this.ctx);
        this.valid = false;
    };

    CanvasState.prototype.clear = function() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    };

    CanvasState.prototype.redraw = function () {
        var ctx = this.ctx,
            shapes = this.shapes,
            l = this.shapes.length - 1;

        this.clear();

        while (l >= 0) {
            shapes[l].draw(ctx);
            l--;
        }

    };

    return CanvasState;
});