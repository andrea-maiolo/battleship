const cp = require('../computerPlayer/cp');
const gameBoardFactory = require('../factories/gameBoardFactory');
const shipFactory = require('../factories/shipFactory');
const playerFactory = require('../factories/playerFactory')

describe('computerPLayer exists',()=>{
    beforeEach(()=>{
        testC = new cp();
        andy = new playerFactory("andy");
        andyBoard = new gameBoardFactory();
        andyShip = new shipFactory("patrol");
        andyBoard.shipAllocation(andyShip, 3, "x")
    });
    test('computer has a player',()=>{
        expect(testC.name).toBe('Skynet');
    });
    test('computer has a board',()=>{
        expect(testC.cpBoard.gameBoard.length).toBe(100);
    });
    test('computer array of ships is with 5 ships',()=>{
        expect(testC.cpShipArray.length).toBe(5);
    });
    // test('computer attacks',()=>{
    //     expect(testC.cpAttack(andyBoard)).toBe(andyBoard.attackIsBeenShot())
    // });
});   