define('shape', [] , function() {

    'use strict';

    function Shape(config) {

        this.config = config;
        this.x = config.x || 0;
        this.y = config.y || 0;
        this.w = config.w || 1;
        this.h = config.h || 1;
        this.fill = config.fill || '#AAAAAA';

        this.init();
    }

    Shape.prototype.init = function () {};

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