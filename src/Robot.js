/*
Abstract parent class for all robot types
*/

module.exports = class Robot {
    constructor(position = {x: 0, y: 0}, orientation = 0) {
        if (new.target === Robot) {
            throw new Error("Cannot construct Robot instances directly");
        }

        this._position = {
            x: position.x,
            y: position.y
        }

        // take 0 to be in the positive y direction (i.e. upwards on a building)
        // then 90 is facing right, 180 is facing down and 270 is facing left
        this._orientation = orientation;
    }

    // parent class gets the simplest position setter
    // i.e. accept any input
    // child classes are free to override if they want additional restrictions
    // (e.g. no negative positions)
    set position(pos) {
        this._position.x = pos.x;
        this._position.y = pos.y;
    }

    get position() {
        return this._position;
    }

    set orientation(angle) {
        if (angle >= 0 && angle <= 360) {
            this._orientation = angle;
        }
        else {
            throw new Error(`invalid orientation supplied`);
        }
    }

    get orientation() {
        return this._orientation;
    }

    reportPosition() {
        console.log(`Current position is (${this.position.x}, ${this.position.y}). Orientation is ${this.orientation}.`);
    }

    control(position, cmdSeq) {
        throw new Error(`Child class must overload control method`)
    }

}