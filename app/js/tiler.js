define('tiler', ['tile'], function (Tile) {

    var tileSide = 50,
        trackWidth = 20;

    function Tiler(config) {
        this.config = config;
        this.ctx = this.config.canvas.getContext('2d');
        this.track = [];
        this.init();
    };

    Tiler.prototype.getTrack = function () {
        return this.track;
    };

    Tiler.prototype.init = function() {
        var track = this.config.track,
            y = 0,
            x = 0,
            l = this.config.track[0].length - 1,  // length of the row
            r = this.config.track.length - 1,      // number of rows
            tile, c;

        while (r >= 0) {     // cycling through the number of rows
            l = this.config.track[0].length - 1; // length of the row
            y = tileSide * r;
            while (l >= 0) {
                x = tileSide * l;
                c = {
                    ctx : this.ctx,
                    trackWidth : trackWidth,
                    w : tileSide,
                    h : tileSide,
                    x : x,
                    y : y,
                    r : r,  // row number
                    l : l,  // position in the row
                    track : track
                };
                this.track.push(new Tile(c));
                l--;
            }
            r--;
        }
    };

    return Tiler;
});