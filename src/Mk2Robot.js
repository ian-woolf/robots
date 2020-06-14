/*
The Mk2Robot class represents the Mk2 Spider Robot
Rotates and moves forwards rather than crabbing sideways and moving backwards
Operates in the vertical plane
*/

const Robot = require('./Robot.js');

var angles = require('angles');
angles.SCALE = 360;

module.exports = class Mk2Robot extends Robot {

    constructor(position, orientation) {
        super(position, orientation);
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

    control(cmdSeq) {
        // assumptions:
        // - forwards means move in the direction of current orientation
        // - left and right mean modify orientation
        // - backwards means modify orientation by 180 degrees and move
        // - if the robot is commanded to move left from x = 0, or down from y = 0, it doesn't move
        // - building is sufficiently large the robot won't reach the other two edges 
        [...cmdSeq].forEach(el => {
            switch(el) {
                case 'L':
                    this.orientation = angles.normalize(this.orientation - 90);
                    break;
                case 'R':
                    this.orientation = angles.normalize(this.orientation + 90);
                    break;
                case 'B':
                    this.orientation = angles.normalize(this.orientation - 180);
                    // deliberate fall through
                case 'F':
                    // need to move in the direction we're currently oriented
                    switch(this.orientation) {
                        case 0:
                            this.position = {x: this.position.x, y: this.position.y + 1};
                            break;
                        case 90:
                            this.position = {x: this.position.x + 1, y: this.position.y};
                            break;
                        case 180:
                            if (this.position.y > 0) {
                                this.position = {x: this.position.x, y: this.position.y - 1};
                            }
                            break;
                        case 270:
                            if (this.position.x > 0) {
                                this.position = {x: this.position.x - 1, y: this.position.y};
                            }
                            break;
                        default:
                            throw new Error(`invalid orientation enountered`);
                    }
                    break;
                default:
                    throw new Error(`invalid command encountered`);
            }
        })

    }

}