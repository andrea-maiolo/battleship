const gameBoardFactory = require('../factories/gameBoardFactory');
const sF = require('../factories/shipFactory');
        
const cp = function(){
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



    const cpBoard = (function(){
        const gameBoard=[];
        const initialize = (function(){
            for(let i=0; i<100;i++){
                gameBoard.push({id:i, isBeenShot:false});
            }
        })();

        const getRandom = function(max){
            return Math.floor(Math.random() * max);
        }


        function randomAllocationOfShipsForComputer(ship){
            let randomAxis = getRandom(2);
            let shipArrayLength
                if(randomAxis === 0){
                    shipArrayLength = [...Array(ship.length).keys()];
                    randomAxis = 1
                }else{
                    shipArrayLength = [...Array(ship.length).keys()];
                    randomAxis = 10;
                    shipArrayLength = shipArrayLength.map(x => x * randomAxis)
                };

            let randomStart = getRandom(gameBoard.length - (ship.length * randomAxis));

            //check if all cells are free 
            // let shipArrayLength = [...Array(ship.length).keys()];
            const isTaken = shipArrayLength.some(index => gameBoard[randomStart + index].shipObj);
            //check that you are not going to wrap around the grid
            let rowLength = 10;
            const isAtRightEdge = shipArrayLength.some(index => (randomStart + index) % rowLength === rowLength - 1)
            //or that you are not on the left edge
            const isAtLeftEdge = shipArrayLength.some(index => (randomStart + index) % rowLength === 0);

            if(!isTaken && !isAtLeftEdge && !isAtRightEdge){
                for(let i=0; i<ship.length; i++){
                    gameBoard[randomStart + shipArrayLength[i]].shipObj = ship;
                }
            }else{
                randomAllocationOfShipsForComputer(ship)
            }
        };
        randomAllocationOfShipsForComputer(cpShipArray[4]);
        randomAllocationOfShipsForComputer(cpShipArray[3]);
        randomAllocationOfShipsForComputer(cpShipArray[2]);
        randomAllocationOfShipsForComputer(cpShipArray[1]);
        randomAllocationOfShipsForComputer(cpShipArray[0]);
     
    //this is to read the enemy's fire
        const attackIsBeenShot = function(cell){
            gameBoard[cell].isBeenShot = true;
            if(gameBoard[cell].shipObj){
                let currentShip =  gameBoard[cell].shipObj;
                currentShip.hit(cell);
                if(currentShip.isSunk()){
                   return `your ${currentShip.name} has been sunk!`
                }
                
            }else{
                return 'you missed'
            }
        };

    //     //this is the random attack from cp
    //     const computerRandomAttack = function(gb){  
    //         let legalAtt=[];

    //         for(let i=0; i< gb.length; i++){
    //                 if(!gb[i].isBeenShot){
    //                     legalAtt.push(gb[i])
    //                 }
    //         }
        
    //         let coordOfAttack = legalAtt[getRandom(legalAtt.length)];
    //         // const attackEnemy = function(gb,coord){
    //         //     if(arrayOfIllegalMoves.includes(coord)){
    //         //         return "you can't shoot on the same cell"
    //         //     }else{
    //         //         arrayOfIllegalMoves.push(coord)
    //         //         return gb.attackIsBeenShot(coord)
    //         //     }
    //         // }
    //         return attackIsBeenShot(coord)
            
    //     }
    
        // Gameboards should be able to report whether or not all of their ships have been sunk.
        const isTheGameOver = function(){
            let arrayOfShips=[];
            let tempArr= [];
            for(let i=0; i< gameBoard.length; i++){
                if(gameBoard[i].shipObj){
                    arrayOfShips.push(gameBoard[i].shipObj)
                    arrayOfShips.forEach(ship => tempArr.push(ship.isSunk()));
                }
            }
            const allTrue = (currentValue) => currentValue ==true;
        
            return tempArr.every(allTrue)
        }

        return {
            gameBoard:gameBoard,
            attackIsBeenShot:attackIsBeenShot,
            isTheGameOver: isTheGameOver,
            // cpAttack: cpAttack
        }
    })();

    return {
        // cpPlayer: cpPlayer ,
        name: name,
        cpShipArray: cpShipArray,
        cpBoard: cpBoard,
    }
}

module.exports = cp