const gameBoardFactory = function(){
    const gameBoard=[];
    const initialize = (function(){
        for(let i=0; i<100;i++){
            gameBoard.push({id:i, isBeenShot:false});
        }
    })();

    const shipAllocation = function(ship,cell,axis){
        if(axis =="x"){
            for(let i=0; i<ship.length; i++){
                gameBoard[cell+i].shipObj = ship;
            }
        }else{
            let currentCell = cell;
            for(let i=0; i<ship.length; i++){
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
    };

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
        shipAllocation:shipAllocation,
        attackIsBeenShot:attackIsBeenShot,
        isTheGameOver: isTheGameOver
    }
}

module.exports = gameBoardFactory