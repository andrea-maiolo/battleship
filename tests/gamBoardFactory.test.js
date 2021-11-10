const gameBoardFactory = require('../factories/gameBoardFactory');
const shipFactory = require('../factories/shipFactory');

describe('gameboard is created with 10x10 cells',()=>{
    let testGameBoard
    beforeEach(()=>{
        testGameBoard = new gameBoardFactory();
    });
    test('gaameBoard exists',() =>{
        expect(testGameBoard).toBeTruthy();
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
        testShip = new shipFactory(4);
    });
    test('gaameBoard shipAllocation works with x axis',() =>{
        testGameBoard.shipAllocation(testShip,3, "x");
        expect(testGameBoard.gameBoard[3].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[4].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[5].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[6].shipPresent).toBe(true);
    });
    test('gaameBoard shipAllocation works with y axis',() =>{
        testGameBoard.shipAllocation(testShip,3, "y");
        expect(testGameBoard.gameBoard[3].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[13].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[23].shipPresent).toBe(true);
        expect(testGameBoard.gameBoard[33].shipPresent).toBe(true);
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


