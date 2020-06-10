const Mk1Robot = require('./src/Mk1Robot.js');
const Mk2Robot = require('./src/Mk2Robot.js');
const Mk3Robot = require('./src/Mk3Robot.js');

function main() {
    let mk1robot = new Mk1Robot();

    mk1robot.control({ x: 1, y: 1 }, 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
    mk1robot.reportPosition();

    let mk2robot = new Mk2Robot();
    mk2robot.control({ x: 1, y: 1 }, 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
    mk2robot.reportPosition();

    let mk3robot = new Mk3Robot();
    mk3robot.control({ x: 0, y: 0 }, 'FFFFFLFFFFR5FL');
    mk3robot.reportPosition();

    // one of the provided command sequences will cause the robot to overheat
    // mk3robot.control({ x: 0, y: 0 }, 'FFFFFF3FLFFFFFFR5FL');
    // the other provided command sequence will cause the robot to run out of fuel
    // mk3robot.control({ x: 4, y: 3 }, 'FFFFFFFF5FRFFFFFF3FRFFFFFFLFFFFF5FFF5FFFFFFFLFFFFF');
}

main();