const Mk1Robot = require('../src/Mk1Robot.js');

describe(`Mk1Robot`, () => {
    test(`constructor`, () => {
        let robot = new Mk1Robot();
        expect(robot).toBeInstanceOf(Mk1Robot);
    })

    test(`position`, () => {
        let robot = new Mk1Robot();
        robot.position = { x: 0, y: 0 };

        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);
    })
});