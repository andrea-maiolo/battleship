const sF = require('../factories/shipFactory');

const cp = function() {
    const name = "Skynet";

    //create ships for cp
    const cPatrol = new sF('patrol');
    const cCurser = new sF('curser');
    const cSub = new sF('sub');
    const cBattleship = new sF('battleship');
    const cAdmiral = new sF('admiral');
    //put the ships in an array so it is easier to work with
    const cpShipArray = [];
    cpShipArray.push(cPatrol);
    cpShipArray.push(cCurser);
    cpShipArray.push(cSub);
    cpShipArray.push(cBattleship);
    cpShipArray.push(cAdmiral);



    const cpBoard = (function() {
        const gameBoard = [];
        const initialize = (function() {
            for (let i = 0; i < 100; i++) {
                gameBoard.push({
                    id: i,
                    isBeenShot: false
                });
            }
        })();

        const getRandom = function(max) {
            return Math.floor(Math.random() * max);
        }


        function randomAllocationOfShipsForComputer(ship) {
            let randomAxis = getRandom(2);
            let shipArrayLength
            if (randomAxis === 0) {
                shipArrayLength = [...Array(ship.length).keys()];
                randomAxis = 1
            } else {
                shipArrayLength = [...Array(ship.length).keys()];
                randomAxis = 10;
                shipArrayLength = shipArrayLength.map(x => x * randomAxis)
            };

            let randomStart = getRandom(gameBoard.length - (ship.length * randomAxis));

            //check if all cells are free 
            const isTaken = shipArrayLength.some(index => gameBoard[randomStart + index].shipObj);
            //check that you are not going to wrap around the grid
            let rowLength = 10;
            const isAtRightEdge = shipArrayLength.some(index => (randomStart + index) % rowLength === rowLength - 1)
            //or that you are not on the left edge
            const isAtLeftEdge = shipArrayLength.some(index => (randomStart + index) % rowLength === 0);

            if (!isTaken && !isAtLeftEdge && !isAtRightEdge) {
                for (let i = 0; i < ship.length; i++) {
                    gameBoard[randomStart + shipArrayLength[i]].shipObj = ship;
                }
            } else {
                randomAllocationOfShipsForComputer(ship)
            }
        };
        randomAllocationOfShipsForComputer(cpShipArray[4]);
        randomAllocationOfShipsForComputer(cpShipArray[3]);
        randomAllocationOfShipsForComputer(cpShipArray[2]);
        randomAllocationOfShipsForComputer(cpShipArray[1]);
        randomAllocationOfShipsForComputer(cpShipArray[0]);



        const attackIsBeenShot = function(cell) {
            if (gameBoard[cell].isBeenShot) {
                console.log(cell)
                return console.log("you cannot shoot in the same cell twice, player should repeat the option")
            } else {
                gameBoard[cell].isBeenShot = true;
                console.log(cell)
                if (gameBoard[cell].shipObj) {
                    let currentShip = gameBoard[cell].shipObj;
                    currentShip.hit(cell);
                }
                return cell
            }
        };

        //this is the random attack function form the computer
        let arrayOfIllegalMoves = [];

        const randomAttackEnemy = function(gb) {
            console.log(gb)
            let coord = getRandom(100);
            console.log(coord)
            if (arrayOfIllegalMoves.includes(coord)) {
                return randomAttackEnemy(gb)
            } else {
                arrayOfIllegalMoves.push(coord)
                return gb.attackIsBeenShot(coord)
            }
        }

        return {
            gameBoard: gameBoard,
            attackIsBeenShot: attackIsBeenShot,
            randomAttackEnemy: randomAttackEnemy
        }
    })();

    return {
        name: name,
        cpShipArray: cpShipArray,
        cpBoard: cpBoard,
    }
}

module.exports = cp