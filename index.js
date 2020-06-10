const Mk1Robot = require('./src/Mk1Robot.js');

function main() {
    let robot = new Mk1Robot();

    robot.control({ x: 1, y: 1 }, 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
    robot.reportPosition();
}

main();