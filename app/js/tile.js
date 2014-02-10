define('tile', ['breve-js', 'shape'], function (breve, shape) {

    var Tile = breve.extend(function Tile(config) {
        this.config = config;
        this.init();
    }, shape);

    Tile.prototype.init = function() {

        var track = this.config.track,
            l = this.config.l,  // position in the row
            r = this.config.r;  // row number

        this.sym = track[r][l];

        switch (this.sym) {
            case 'x' :
                this.shape = 'empty';
                return;
            case '-':
                this.shape = 'hor';
                break;
            case '|':
                this.shape = 'ver';
                break;
            case '/' :

                if (this.aboutRight() && this.aboutDown()) {
                    this.shape = 'ctl';
                } else if (this.aboutTop() && this.aboutLeft()) {
                    this.shape = 'cbr';
                } else {
                    throw new Error('Cannot determine shape ' +  l + ' ' + r);
                }
                break;
            case '\\':
                if (this.aboutTop() && this.aboutRight()) {
                    this.shape = 'cbl';
                } else if (this.aboutDown() && this.aboutLeft()) {
                    this.shape = 'ctr';
                } else {
                    throw new Error('Cannot determine shape ' +  l + ' ' + r);
                }
                break;
        }


    };

    Tile.prototype.aboutRight = function() {
        var l = this.config.l + 1,
            r = this.config.r;
        return this.config.track[r][l] &&
            this.config.track[r][l] !== 'x' &&
            this.config.track[r][l] !== '|';
    };

    Tile.prototype.aboutLeft = function() {
        var l = this.config.l - 1,
            r = this.config.r;
        return this.config.track[r][l] &&
            this.config.track[r][l] !== 'x' &&
            this.config.track[r][l] !== '|';
    };

    Tile.prototype.aboutDown = function() {
        var l = this.config.l,
            r = this.config.r + 1;
        return this.config.track[r] &&
            this.config.track[r][l] !== 'x' &&
            this.config.track[r][l] !== '-';
    };

    Tile.prototype.aboutTop = function() {
        var l = this.config.l,
            r = this.config.r - 1;
        return this.config.track[r] &&
            this.config.track[r][l] !== 'x' &&
            this.config.track[r][l] !== '-';
    };

    Tile.prototype.draw = function () {
        switch (this.shape) {
            case 'hor':
                break;
        }
    };

    return Tile;

});