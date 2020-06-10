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

        robot.control({ x: 0, y: 0 }, '');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);

        robot.control({ x: 0, y: 0 }, 'FFRR');
        expect(robot.position.x).toBe(2);
        expect(robot.position.y).toBe(2);

        robot.control({ x: 0, y: 0 }, 'FBRL');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);

        robot.control({ x: 0, y: 0 }, 'BL');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);

        robot.control({ x: 1, y: 1 }, 'BL');
        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);

        robot.control({ x: 0, y: 0 }, 'FRFRFFFFFFFLLLLFFFFFRFFFFLFFLRRF');
        expect(robot.position.x).toBe(2);
        expect(robot.position.y).toBe(21);

        robot.control({ x: 1, y: 1 }, 'FFFFFFFFRRRRRRRFFFFLLLBBRRRRRLLLLLLLLLRFFF');
        expect(robot.position.x).toBe(2);
        expect(robot.position.y).toBe(14);

        robot.control({ x: 1, y: 1 }, 'RRRRRRRRFFFFFFFFFFFLLLBBBBBRRRLLLLLFFLR');
        expect(robot.position.x).toBe(4);
        expect(robot.position.y).toBe(9);

        expect(() => { robot.control({ x: 0, y: 0 }, 'X') }).toThrow();
    })
});