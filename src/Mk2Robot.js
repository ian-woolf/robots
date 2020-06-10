/*
The Mk2Robot class represents the Mk2 Spider Robot
Rotates and moves forwards rather than crabbing sideways and moving backwards
Operates in the vertical plane
*/

module.exports = class Mk2Robot {

    constructor() {
        this._position = {
            x: undefined,
            y: undefined
        }
        this._orientation = 0;
    }

    set position(pos) {
        if (pos.x > -1 && pos.y > -1) {
            this._position.x = pos.x;
            this._position.y = pos.y;
        }
        else {
            throw new Error(`invalid position supplied`);
        }
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
        console.log(`Command sequence complete. Current position is (${this.position.x}, ${this.position.y}). Orientation is ${this.orientation}.`);
    }

    control(position, cmdSeq) {
        this.position = position;

        // assumptions:
        // - forwards means move in the direction of current orientation
        // - left and right mean modify orientation
        // - backwards means modify orientation by 180 degrees and move
        // - if the robot is commanded to move left from x = 0, or down from y = 0, it doesn't move
        // - building is sufficiently large the robot won't reach the other two edges 
        [...cmdSeq].forEach(el => {
            switch(el) {
                case 'F':
                    // TODO
                    break;
                case 'B':
                    // TODO
                    break;
                case 'L':
                    // TODO
                    break;
                case 'R':
                    // TODO
                    break;
                default:
                    throw new Error(`invalid command encountered`);
            }
        })

    }

}