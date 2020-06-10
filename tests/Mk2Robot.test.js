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

    describe(`control`, () => {

        let robot = new Mk2Robot();

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
    })
});