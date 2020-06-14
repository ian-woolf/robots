const Mk1Robot = require('./src/Mk1Robot.js');
const Mk2Robot = require('./src/Mk2Robot.js');
const Mk3Robot = require('./src/Mk3Robot.js');

function main() {
    let mk1robot = new Mk1Robot({ x: 1, y: 1 });

    mk1robot.control('RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
    mk1robot.reportPosition();

    let mk2robot = new Mk2Robot({ x: 1, y: 1 });
    mk2robot.control('RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
    mk2robot.reportPosition();

    let mk3robot = new Mk3Robot();
    mk3robot.control('FFFFFLFFFFR5FL');
    mk3robot.reportPosition();

    // one of the provided command sequences will cause the robot to overheat
    // mk3robot.control('FFFFFF3FLFFFFFFR5FL');
    // the other provided command sequence will cause the robot to run out of fuel
    // mk3robot.control('FFFFFFFF5FRFFFFFF3FRFFFFFFLFFFFF5FFF5FFFFFFFLFFFFF');
}

main();