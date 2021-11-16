const cp = require('../computerPlayer/cp');

describe('computerPLayer exists',()=>{
    beforeEach(()=>{
        testC = new cp();
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
});   