/*
The Mk1Robot class represents the Mk1 Spider Robot
*/

module.exports = class Mk1Robot {

    constructor() {
        this._position = {
            x: undefined,
            y: undefined
        }
    }

    set position(pos) {
        if (pos.x > -1 && pos.y > -1) {
            this._position.x = pos.x;
            this._position.y = pos.y;
        }
    }

    get position() {
        return this._position;
    }

    control(position, cmdSeq) {
        // TODO
    }

}