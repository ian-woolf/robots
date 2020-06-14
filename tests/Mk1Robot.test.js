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

    test(`control`, () => {
        let robot = new Mk1Robot();

        robot.position = {x: 0, y: 0};
        robot.control('');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);

        robot.position = {x: 0, y: 0};
        robot.control('FFRR');
        expect(robot.position.x).toBe(2);
        expect(robot.position.y).toBe(2);

        robot.position = {x: 0, y: 0};
        robot.control('FBRL');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);

        robot.position = {x: 0, y: 0};
        robot.control('BL');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);

        robot.position = {x: 1, y: 1};
        robot.control('BL');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);

        robot.position = {x: 0, y: 0};
        robot.control('FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF');
        expect(robot.position.x).toBe(2);
        expect(robot.position.y).toBe(21);

        robot.position = {x: 1, y: 1};
        robot.control('FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF');
        expect(robot.position.x).toBe(2);
        expect(robot.position.y).toBe(14);

        robot.position = {x: 1, y: 1};
        robot.control('RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
        expect(robot.position.x).toBe(4);
        expect(robot.position.y).toBe(9);

        expect(() => { robot.control({ x: 0, y: 0 }, 'X') }).toThrow();
    })

    test(`multiple control sequences`, () => {
        let robot = new Mk1Robot();

        robot.control('FR');
        robot.control('FL');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(2);
    })
});