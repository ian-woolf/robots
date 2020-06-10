const Mk1Robot = require('./src/Mk1Robot.js');
const Mk2Robot = require('./src/Mk2Robot.js');

function main() {
    let mk1robot = new Mk1Robot();

    mk1robot.control({ x: 1, y: 1 }, 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
    mk1robot.reportPosition();

    let mk2robot = new Mk2Robot();
    mk2robot.control({ x: 1, y: 1 }, 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
    mk2robot.reportPosition();
}

main();