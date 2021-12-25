const gameBoardFactory = require('../factories/gameBoardFactory');
const shipFactory = require('../factories/shipFactory');
const playerFactory = require('../factories/playerFactory')

describe('player is created', () => {
    test('a player is born', () => {
        let andy = new playerFactory("andy");
        expect(andy.name).toBe("andy")
    });
});

describe('testing attack function of player', () => {
    let andyBoard
    let andyShip
    let markShip
    let markBoard
    let andy
    let mark
    beforeEach(() => {
        andyShip = new shipFactory('battleship');
        markShip = new shipFactory('patrol');
        andyBoard = new gameBoardFactory();
        markBoard = new gameBoardFactory();
        andyBoard.shipAllocation(andyShip, 3, "x");
        markBoard.shipAllocation(markShip, 10, "x");
        andy = new playerFactory("andy");
        mark = new playerFactory("mark");
    });
    test('one player attack the other', () => {
        expect(andy.attackEnemy(markBoard, 10)).toBe(markShip.totalHits[10]);
        expect(andy.attackEnemy(markBoard, 10)).toBe("you can't shoot on the same cell")
        expect(markBoard.gameBoard[10].isBeenShot).toBe(true);
    });
    test('after attack ship sinks', () => {
        andy.attackEnemy(markBoard, 11)
        andy.attackEnemy(markBoard, 10)
        expect(markShip.isSunk()).toBe(true)
    })
})