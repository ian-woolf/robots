const Robot = require('../src/Robot.js');

// can't instatiate Robots directly
// chose Mk3 because it doesn't override the position getters/setters, and it uses orientation
const Mk3Robot = require('../src/Mk3Robot.js');

describe(`Robot Parent Class`, () => {
    describe(`constructor`, () => {
        test(`prevent direct instantiation`, () => {
            expect(() => { let robot = new Robot(); }).toThrow();
        })

        test(`use default position and orientation`, () => {
            let robot = new Mk3Robot();
            expect(robot).toBeInstanceOf(Robot);
            expect(robot.position.x).toBe(0);
            expect(robot.position.y).toBe(0);
            expect(robot.orientation).toBe(0);
        })

        test(`accept position argument`, () => {
            let robot = new Mk3Robot({ x: 1, y: 1 });
            expect(robot).toBeInstanceOf(Robot);
            expect(robot.position.x).toBe(1);
            expect(robot.position.y).toBe(1);
        })

        test(`accept orientation argument`, () => {
            let robot = new Mk3Robot({ x: 0, y: 0 }, 180);
            expect(robot).toBeInstanceOf(Robot);
            expect(robot.orientation).toBe(180);
        })
    })

    test(`position`, () => {
        let robot = new Mk3Robot();
        robot.position = { x: 1, y: -1 };
        expect(robot.position.x).toBe(1);
        expect(robot.position.y).toBe(-1);
    })

    test(`orientation`, () => {
        let robot = new Mk3Robot();
        robot.orientation = 270;
        expect(robot.orientation).toBe(270);
        expect(() => { robot.orientation = 540; }).toThrow();
    })

    // TODO: test reportPosition method behaviour by spying on console.log

    // TODO: test control method behaviour (throws, since it should aalways be overridden)
    // by making a new child class that doesn't override it
    // obviously, none of the 'real' child classes allow you to test this

});