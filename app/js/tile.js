define('tile', ['breve-js', 'shape'], function (breve, shape) {

    var Tile = breve.extend(function Tile(config) {
        this.config = config;
        this.init();
        this.onFrame = this.draw;
    }, shape);

    Tile.prototype.init = function() {

        var track = this.config.track,
            l = this.config.l,  // position in the row
            r = this.config.r;  // row number

        this.sym = track[r][l];

        switch (this.sym) {
            case 'x' :
                this.shape = 'empty';
                break;
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

        this.draw = this.createDrawFunc();

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

    Tile.prototype.createDrawFunc = function () {

    var ctx = this.config.ctx, tileSide = this.config.w;
    var x = this.config.x,
        y = this.config.y,
        w = this.config.w,
        h = this.config.h,
        func,
        trackWidth = this.config.trackWidth;
        ctx.lineWidth = trackWidth;

        switch (this.shape) {
            case 'hor':
                func = function() {
                    ctx.beginPath();
                    ctx.moveTo(x, y + tileSide / 2);
                    ctx.lineTo(x + tileSide, y + tileSide / 2);
                    ctx.closePath();
                    ctx.stroke();
                }
                break;
            case 'ver' :
                func = function() {
                    ctx.beginPath();
                    ctx.moveTo(x + tileSide / 2, y);
                    ctx.lineTo(x + tileSide / 2, y + tileSide);
                    ctx.closePath();
                    ctx.stroke();
                }
                break;
            case 'ctl':
                func = function() {
                    ctx.beginPath();
                    ctx.moveTo(x + tileSide, y + tileSide / 2);
                    ctx.lineTo(x + tileSide / 2, y + tileSide / 2);
                    ctx.lineTo(x + tileSide / 2, y + tileSide);
                    ctx.stroke();
                }
                break;
            case 'ctr' :
                func = function() {
                    ctx.beginPath();
                    ctx.moveTo(x, y + tileSide / 2);
                    ctx.lineTo(x + tileSide / 2, y + tileSide / 2);
                    ctx.lineTo(x + tileSide / 2, y + tileSide);
                    ctx.stroke();
                }
                break;
            case 'cbl':
                func = function() {
                    ctx.beginPath();
                    ctx.moveTo(x + tileSide / 2, y);
                    ctx.lineTo(x + tileSide / 2, y + tileSide / 2);
                    ctx.lineTo(x + tileSide, y + tileSide / 2);
                    ctx.stroke();
                }
                break;
            case 'cbr':
                func = function() {
                    ctx.beginPath();
                    ctx.moveTo(x + tileSide / 2, y);
                    ctx.lineTo(x + tileSide / 2, y + tileSide / 2);
                    ctx.lineTo(x, y + tileSide / 2);
                    ctx.stroke();
                }
                break;
            case 'empty' :
                func = function() {}
                break;
            default :
                throw new Error('No shape')
        }

        return func;
    };

    return Tile;

});