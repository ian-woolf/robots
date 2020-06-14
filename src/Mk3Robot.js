/*
The Mk3Robot class represents the Mk3 Spider Robot
Has rockets!
Rotates and moves forwards rather than crabbing sideways and moving backwards
*/

const Robot = require('./Robot.js');

var angles = require('angles');
angles.SCALE = 360;

module.exports = class Mk3Robot extends Robot {

    constructor(position, orientation) {
        super(position, orientation);
    }

    static simplifyCmdSeq(cmdSeq) {
        // translates command sequences back into the numberless format
        // i.e. 3F -> FFF
        let simpleCmdSeq = '';
        [...cmdSeq].forEach((el, index) => {
            if (el >= '0' && el <= '9') {
                // found a number
                let num = parseInt(el);
                for (let i = 0; i < num-1; i++) {
                    simpleCmdSeq += 'F';
                }       
            }
            else {
                simpleCmdSeq += el;
            }
        })

        return simpleCmdSeq;
    }

    control(cmdSeq) {
        // assumptions:
        // - forwards means move in the direction of current orientation
        // - left and right mean modify orientation
        // - backwards means modify orientation by 180 degrees and move
        // - mars is sufficiently large the robot won't reach the other two edges
        // - forward is the only instruction that can have a number in front of it

        let oldCmdSeq = Mk3Robot.simplifyCmdSeq(cmdSeq);

        if ((oldCmdSeq.match(/F/g) || []).length > 30) {
            throw new Error('provided command sequence will cause robot to run out of fuel');
        }

        if (oldCmdSeq.match(/FFFFFF/g)) {
            throw new Error('provided command sequence will cause robot to overheat');
        }

        [...oldCmdSeq].forEach(el => {
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
                            this.position = {x: this.position.x, y: this.position.y - 1};
                            break;
                        case 270:
                            this.position = {x: this.position.x - 1, y: this.position.y};
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