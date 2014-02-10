define('tiler', ['tile'], function (Tile) {

    var tileSide = 50,
        trackWidth = 20;

    function Tiler(config) {
        this.config = config;
        this.track = [];
        this.init();
    };

    Tiler.prototype.init = function() {
        var track = this.config.track,
            l = this.config.track[0].length - 1,  // length of the row
            r = this.config.track.length - 1,      // number of rows
            tile;

        while (r >= 0) {     // cycling through the number of rows
            l = this.config.track[0].length - 1; // length of the row
            while (l >= 0) {
                c = {
                    trackWidth : trackWidth,
                    w : tileSide,
                    h : tileSide,
                    r : r,  // row number
                    l : l,  // position in the row
                    track : track
                };
                this.track[r] = this.track[r] || [];
                this.track[r][l] = new Tile(c);
                l--;
            }
            r--;
        }
    };

    return Tiler;
});