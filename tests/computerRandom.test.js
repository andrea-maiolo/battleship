const computerPlayer = require('../computerPlayer/computerPlayerCreation');
const computerBoard = require('../computerPlayer/cpBoardCreation');
const computerShipArray = require('../computerPlayer/cpShipsCreation');

describe.only('computerPLayer exists',()=>{
    test.only('computer has a player',()=>{
        expect(computerPlayer).toBeTruthy();
        console.log(computerBoard)
    });
    test('computer has a board',()=>{
        expect(computerBoard.cpBoard).toBeTruthy();
        console.log(computerBoard.cpBoard)
    });
    // test('computer board has the right properties',()=>{
    //     expect(computerBoard.cpBoard.gameBoard).toBeTruthy()
    //     expect(computerBoard.cpBoard.shipAllocation).toBeTruthy()
    //     expect(computerBoard.cpBoard.isTheGameOver).toBeTruthy()
    //     expect(computerBoard.cpBoard.attackIsBeenShot).toBeTruthy()
    // })
    // test('computer array of ships is with 5 ships',()=>{
    //     expect(computerShipArray.length).toBe(5);
    // });
});

describe('computerShips are allocated',()=>{
    test('computer can allocate a ship',()=>{
        expect(randomAllocation(computerShipArray, computerBoard.cpBoard)).toContain(3);
    });
});