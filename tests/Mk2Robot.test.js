const Mk2Robot = require('../src/Mk2Robot.js');

describe(`Mk2Robot`, () => {
    test(`constructor`, () => {
        let robot = new Mk2Robot();
        expect(robot).toBeInstanceOf(Mk2Robot);
    })

    test(`position`, () => {
        let robot = new Mk2Robot();
        robot.position = { x: 0, y: 0 };

        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);
    })

    test(`orientation`, () => {
        let robot = new Mk2Robot();

        robot.orientation = 0;
        expect(robot.orientation).toBe(0);

        robot.orientation = 180;
        expect(robot.orientation).toBe(180);
    })

    test(`control`, () => {
        let robot = new Mk2Robot();

        // TODO
    })
});