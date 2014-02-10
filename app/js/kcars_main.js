define('kcars_main', ['breve-js', 'state', 'canvas_state', 'lodash'], function (breve, state, CanvasState, _) {

    function KCars () {};

    KCars.prototype.init = function () {

        this.canvasState = new CanvasState();
        this.canvasState.init(document.getElementById('canvas'));
        // setup the stuff!
        state.subscribe('onLevelChanged', this.onLevelChanged, this);
        state.init();

    };

    KCars.prototype.onLevelChanged = function () {
        this.animLoop();
    };

    KCars.prototype.checkImpact = function () {


    };

    KCars.prototype.markPoint = function() {

    };

    KCars.prototype.formatScore = function(score) {
    };

    KCars.prototype.elementsToAnimate = [];

    KCars.prototype.registerObject = function (obj, params) {
        this.elementsToAnimate.push({
            obj : obj,
            params : params
        })
    };

    KCars.prototype.animateElements = function () {
        var l = this.elementsToAnimate.length - 1,
            el;
        while (l >= 0) {
            el = this.elementsToAnimate[l];
            el.obj.onFrame.call(el.obj, el.params);
            l--;
        }
        this.canvasState.redraw();
    };

    KCars.prototype.animLoop = function() {

        var clockInterval, onClock;

        onClock = _.bind(function() {
            this.animateElements();
            clockInterval = window.requestAnimationFrame(onClock);
        }, this);
        onClock();
    };

    var game = breve.makeObservable(new KCars());
    return game.init();
});