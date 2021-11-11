const { isNullLiteral, isIdentifier, arrayExpression } = require("@babel/types");

const gameBoardFactory = function(){
    const gameBoard=[];
    const initialize = (function(){
        for(let i=0; i<100;i++){
            gameBoard.push({id:i, isBeenShot:false, shipPresent:false});
        }
    })();

    const shipAllocation = function(ship,cell,axis){
        if(axis =="x"){
            for(let i=0; i<ship.length; i++){
                gameBoard[cell+i].shipPresent = true;
                gameBoard[cell+i].shipObj = ship;
            }
        }else{
            let currentCell = cell;
            for(let i=0; i<ship.length; i++){
                gameBoard[currentCell].shipPresent = true;
                gameBoard[currentCell].shipObj = ship
                currentCell +=10;
            }
        }
    };

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
        isTheGameOver()
    };

    // Gameboards should be able to report whether or not all of their ships have been sunk.
    const isTheGameOver = function(){
        let arrayOfShips=[];
        for(let i=0; i< gameBoard.length; i++){
            if(gameBoard[i].shipPresent){
                arrayOfShips.push(gameBoard[i].shipObj)
            }
        }

        let uniqueShips = [...new Set(arrayOfShips)];
        
        //now take the unique set and loop trough the objects and check the isSunk function
        //if ALL of them return true then the game is finisched
        // uniqueShips.isSunk()
    }

    return {
        gameBoard:gameBoard,
        shipAllocation:shipAllocation,
        attackIsBeenShot:attackIsBeenShot,
    }
}

module.exports = gameBoardFactory