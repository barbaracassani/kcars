define('Shape', [] , function() {

    'use strict';

    function Shape(x, y, w, h, fill) {
        this.x = x || 0;
        this.y = y || 0;
        this.w = w || 1;
        this.h = h || 1;
        this.fill = fill || '#AAAAAA';
    }

    Shape.prototype.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    };

    Shape.prototype.setSize = function (w, h) {
        this.w = w;
        this.h = h;
    };

    Shape.prototype.setColor = function (color) {
        this.fill = color;
    };

    Shape.prototype.draw = function(ctx) {
        ctx.fillStyle = this.fill;
        ctx.fillRect(this.x, this.y, this.w, this.h);
    };

    Shape.prototype.onFrame = function () {};

    return Shape;

});