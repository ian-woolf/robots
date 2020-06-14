const Mk3Robot = require('../src/Mk3Robot.js');

describe(`Mk3Robot`, () => {
    test(`constructor`, () => {
        let robot = new Mk3Robot();
        expect(robot).toBeInstanceOf(Mk3Robot);
    })

    test(`simplifyCmdSeq`, () => {
        expect(Mk3Robot.simplifyCmdSeq('F')).toBe('F');
        expect(Mk3Robot.simplifyCmdSeq('FF')).toBe('FF');
        expect(Mk3Robot.simplifyCmdSeq('2F')).toBe('FF');
        expect(Mk3Robot.simplifyCmdSeq('2F3F')).toBe('FFFFF');
        expect(Mk3Robot.simplifyCmdSeq('LR2FRL3F')).toBe('LRFFRLFFF');
    })

    describe(`control`, () => {

        let robot = new Mk3Robot();

        beforeEach(() => {
            robot.position = { x: 0, y: 0 };
            robot.orientation = 0;
        })
        
        test(`rotation right`, () => {
            robot.control('R');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(90);
        })

        test(`rotation right wrap`, () => {
            robot.control('RRRR');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(0);
        })

        test(`rotation right overflow`, () => {
            robot.control('RRRRRR');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(180);
        })

        test(`rotation left`, () => {
            robot.control('L');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(270);
        })

        test(`rotation left wrap`, () => {
            robot.control('LLLLLLLL');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(0);
        })

        test(`rotation left overflow`, () => {
            robot.control('LLLLL');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(270);
        })

        test(`forwards, orientation 0`, () => {
            robot.control('F');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(1);
            expect(robot.orientation).toBe(0);
        })

        test(`forwards, orientation 90`, () => {
            robot.control('RF');
            expect(robot.position.x).toBe(1);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(90);
        })

        test(`forwards, orientation 180`, () => {
            robot.position = { x: 0, y: 1 };
            robot.control('RRF');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(180);
        })

        test(`forwards, orientation 270`, () => {
            robot.position = { x: 1, y: 0 };
            robot.control('RRRF');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(270);
        })

        test(`backwards`, () => {
            robot.position = { x: 0, y: 1 };
            robot.control('B');
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(180);
        })

        test(`forwards, off edge`, () => {
            robot.position = { x: 1, y: 0 };
            robot.control('RRRFF');
            expect(robot.position.x).toBe(-1);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(270);
        })

        test(`multiple control sequences`, () => {
            robot.control('FR');
            robot.control('FL');
            expect(robot.position.x).toBe(1);
            expect(robot.position.y).toBe(1);
        })

        test(`overheat`, () => {
            // 6 consecutive Fs
            expect(() => { robot.control({ x: 0, y: 0 }, 'FFFFFF') }).toThrow();
        })

        test(`out of fuel`, () => {
            // 31 Fs, but none consecutively to avoid overheating
            expect(() => { robot.control({ x: 0, y: 0 }, 'FRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRFRF') }).toThrow();
        })
    })
});