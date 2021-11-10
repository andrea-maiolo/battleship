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
            }
        }else{
            let currentCell = cell;
            for(let i=0; i<ship.length; i++){
                gameBoard[currentCell].shipPresent = true;
                currentCell +=10;
            }
        }
    }

    const attackIsBeenShot = function(cell){
        gameBoard[cell].isBeenShot = true;
    }


    return {
        gameBoard:gameBoard,
        shipAllocation:shipAllocation,
        attackIsBeenShot:attackIsBeenShot,
    }
}

module.exports = gameBoardFactory