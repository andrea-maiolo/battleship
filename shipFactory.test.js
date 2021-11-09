const shipFactory = require('./shipFactory');

describe('ship factory is working',()=>{
    let testShip
    beforeEach(()=>{
        testShip = new shipFactory(5);
    });
    test('accepts a hit', () =>{
        testShip.hit(1),
        expect(testShip.totalHits).toEqual([1])
    });
    test('accepts multiple hits', () =>{
        testShip.hit(1),
        testShip.hit(2),
        expect(testShip.totalHits).toEqual([1,2])
    });
    test('the boat is not sunk', () =>{
        testShip.hit(1),
        testShip.hit(1),
        testShip.hit(2),
        expect(testShip.isSunk()).toBe(false);
    });
    test('the boat is sunk', () =>{
        testShip.hit(1),
        testShip.hit(1),
        testShip.hit(2),
        testShip.hit(1),
        testShip.hit(2),
        expect(testShip.isSunk()).toBe(true)
    });
})


