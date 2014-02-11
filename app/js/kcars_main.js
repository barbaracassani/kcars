define('kcars_main', ['breve-js', 'state', 'canvas_state', 'tiler', 'tracks', 'lodash'], function (breve, state, CanvasState, Tiler, tracks, _) {

    function KCars () {};

    KCars.prototype.init = function () {

        var _self = this;

        this.canvasState = new CanvasState();
        this.canvas = document.getElementById('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.height = 300;
        this.width = 500;

        this.canvasState.init(this.canvas);
        // setup the stuff!

        this.track = new Tiler({
            track : tracks['default'],
            canvas : this.canvas}).getTrack();

        this.track.forEach(function(tile) {
            _self.registerObject(tile);
        });

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
        this.ctx.clearRect(0, 0, this.width, this.height);
        while (l >= 0) {
            el = this.elementsToAnimate[l];
            el.obj.onFrame.call(el.obj, el.params);
            l--;
        }
        //this.canvasState.redraw();
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