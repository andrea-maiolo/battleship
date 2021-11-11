const gameBoardFactory = require('../factories/gameBoardFactory');
const shipFactory = require('../factories/shipFactory');

describe('gameboard is created with 10x10 cells',()=>{
    let testGameBoard
    beforeEach(()=>{
        testGameBoard = new gameBoardFactory();
    });
    test('gaameBoard has 100 cells',()=>{
        expect(testGameBoard.gameBoard.length).toBe(100);
    });
    test('every cell has an id',()=>{
        expect(testGameBoard.gameBoard[99].id).toBe(99);
    });
    test('every cell has a way to check for attacks',()=>{
        expect(testGameBoard.gameBoard[5].isBeenShot).toBe(false);
    });
    test('every cell has a way to check for ships',()=>{
        expect(testGameBoard.gameBoard[26].shipPresent).toBe(false);
    });
});

describe('gameBoard has a function for allocating the ship',()=>{
    let testGameBoard
    let testShip
    beforeEach(()=>{
        testGameBoard = new gameBoardFactory();
        testShip = new shipFactory('admiral');
    });
    test('gameBoard shipAllocation works with x axis',() =>{
        testGameBoard.shipAllocation(testShip,3, "x");
        expect(testGameBoard.gameBoard[3].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[4].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[5].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[6].shipPresent).toBe(true);
    });
    test('gameBoard shipAllocation works with y axis',() =>{
        testGameBoard.shipAllocation(testShip,3, "y");
        expect(testGameBoard.gameBoard[3].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[13].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[23].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[33].shipPresent).toBe(true);
    });
    test('gameBoard shipAllocation save the ship obj in the cells in which is present',() =>{
        testGameBoard.shipAllocation(testShip,3, "x");
        expect(testGameBoard.gameBoard[3].shipObj.name).toMatch(testShip.name);
        expect(testGameBoard.gameBoard[3].shipObj.length).toBe(testShip.length);
        expect(testGameBoard.gameBoard[3].shipObj.totalHits).toBe(testShip.totalHits);
        expect(testGameBoard.gameBoard[4].shipObj.length).toBe(testShip.length);
        expect(testGameBoard.gameBoard[6].shipObj.totalHits).toBe(testShip.totalHits);
    });
});

describe('gameBoard has a function for attacks',()=>{
    let testGameBoard
    beforeEach(()=>{
        testGameBoard = new gameBoardFactory();
    });
    test('gameBoard can register attacks',() =>{
        testGameBoard.attackIsBeenShot(3);
        expect(testGameBoard.gameBoard[3].isBeenShot).toBe(true);
        testGameBoard.attackIsBeenShot(0);
        expect(testGameBoard.gameBoard[0].isBeenShot).toBe(true);
        testGameBoard.attackIsBeenShot(88);
        expect(testGameBoard.gameBoard[88].isBeenShot).toBe(true);
        testGameBoard.attackIsBeenShot(54);
        expect(testGameBoard.gameBoard[54].isBeenShot).toBe(true);
    });
});

describe('gameBoard attack function can call on the ship if hit',()=>{
    let testGameBoard
    let testShip
    beforeEach(()=>{
        testShip = new shipFactory('battleship')
        testGameBoard = new gameBoardFactory();
        testGameBoard.shipAllocation(testShip,3, "x");
    });
    test('gameBoard attack return a sentence if missed',() =>{
        expect(testGameBoard.attackIsBeenShot(21)).toBe('you missed')
    });
    test('the attack on a ship fire the hit function of the ship',() =>{
        testGameBoard.attackIsBeenShot(3);
        expect(testShip.totalHits).toEqual([3]);
        expect(testShip.isSunk()).toBe(false)
    });
    test('the ship is sunk',()=>{
        testGameBoard.attackIsBeenShot(3);
        testGameBoard.attackIsBeenShot(4);
        testGameBoard.attackIsBeenShot(5);
        expect(testGameBoard.attackIsBeenShot(6)).toBe(`your ${testShip.name} has been sunk!`);
        expect(testShip.isSunk()).toBe(true);
    })
});


