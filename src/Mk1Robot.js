/*
The Mk1Robot class represents the Mk1 Spider Robot
*/

const Robot = require('./Robot.js');

module.exports = class Mk1Robot extends Robot {

    constructor() {
        super();
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

    control(position, cmdSeq) {
        this.position = position;

        // assumptions:
        // - forward means increase y, right means increase x
        // - if the robot is commanded to move left from x = 0, or down from y = 0, it doesn't move
        // - test chamber is sufficiently large the robot won't reach the other two edges 
        [...cmdSeq].forEach(el => {
            switch(el) {
                case 'F':
                    this.position = {x: this.position.x, y: this.position.y + 1};
                    break;
                case 'B':
                    if (this.position.y > 0) {
                        this.position = {x: this.position.x, y: this.position.y - 1};
                    }
                    break;
                case 'L':
                    if (this.position.x > 0) {
                        this.position = {x: this.position.x - 1, y: this.position.y};
                    }
                    break;
                case 'R':
                    this.position = {x: this.position.x + 1, y: this.position.y};
                    break;
                default:
                    throw new Error(`invalid command encountered`);
            }
        })

    }

}