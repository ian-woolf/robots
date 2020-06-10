const Mk3Robot = require('../src/Mk3Robot.js');

describe(`Mk3Robot`, () => {
    test(`constructor`, () => {
        let robot = new Mk3Robot();
        expect(robot).toBeInstanceOf(Mk3Robot);
    })

    test(`position`, () => {
        let robot = new Mk3Robot();
        robot.position = { x: 0, y: 0 };

        expect(robot.position.x).toBe(0);
        expect(robot.position.y).toBe(0);
    })

    test(`orientation`, () => {
        let robot = new Mk3Robot();

        robot.orientation = 0;
        expect(robot.orientation).toBe(0);

        robot.orientation = 180;
        expect(robot.orientation).toBe(180);
    })

    test(`simplifyCmdSeq`, () => {
        expect(Mk3Robot.simplifyCmdSeq('F')).toBe('F');
        expect(Mk3Robot.simplifyCmdSeq('FF')).toBe('FF');
        expect(Mk3Robot.simplifyCmdSeq('2F')).toBe('FF');
        expect(Mk3Robot.simplifyCmdSeq('2F3F')).toBe('FFFFF');
        expect(Mk3Robot.simplifyCmdSeq('LR2FRL3F')).toBe('LRFFRLFFF');
        expect(() => { Mk3Robot.simplifyCmdSeq('6F') }).toThrow();
    })

    describe(`control`, () => {

        let robot = new Mk3Robot();

        beforeEach(() => {
            robot.orientation = 0;
        })
        
        test(`rotation right`, () => {
            robot.control({ x: 0, y: 0 }, 'R');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(90);
        })

        test(`rotation right wrap`, () => {
            robot.control({ x: 0, y: 0 }, 'RRRR');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(0);
        })

        test(`rotation right overflow`, () => {
            robot.control({ x: 0, y: 0 }, 'RRRRRR');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(180);
        })

        test(`rotation left`, () => {
            robot.control({ x: 0, y: 0 }, 'L');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(270);
        })

        test(`rotation left wrap`, () => {
            robot.control({ x: 0, y: 0 }, 'LLLLLLLL');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(0);
        })

        test(`rotation left overflow`, () => {
            robot.control({ x: 0, y: 0 }, 'LLLLL');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(270);
        })

        test(`forwards, orientation 0`, () => {
            robot.control({ x: 0, y: 0 }, 'F');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(1);
            expect(robot.orientation).toBe(0);
        })

        test(`forwards, orientation 90`, () => {
            robot.control({ x: 0, y: 0 }, 'RF');
            expect(robot.position.x).toBe(1);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(90);
        })

        test(`forwards, orientation 180`, () => {
            robot.control({ x: 0, y: 1 }, 'RRF');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(180);
        })

        test(`forwards, orientation 270`, () => {
            robot.control({ x: 1, y: 0 }, 'RRRF');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(270);
        })

        test(`forwards, off edge`, () => {
            robot.control({ x: 1, y: 0 }, 'RRRFF');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(270);
        })

        test(`backwards`, () => {
            robot.control({ x: 0, y: 1 }, 'B');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(180);
        })
    })
});