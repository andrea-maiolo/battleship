const gameBoardFactory = function(){
    const gameBoard=[];
    const initialize = (function(){
        for(let i=0; i<100;i++){
            gameBoard.push({id:i, isBeenShot:false});
        }
    })();

    const shipAllocation = function(ship,cell,axis){
        switch (axis) {
            case "x":
                let rowLength = 10;
                let whichRowAmIIn = 1 +  Math.floor(cell / rowLength);
                let maxCoordAvailable = (rowLength*whichRowAmIIn) - ship.length;
                if(cell > maxCoordAvailable){
                    return "cannot place your ship here"
                }else{

                    let controlCells =[];
                    let lastCell = (cell + ship.length) - 1;
                    for (let i= cell; i<= lastCell; i++) {
                        controlCells.push(i)
                    }
                    const isEmpty = (currentValue) => this.gameBoard[currentValue].shipObj === undefined;
                    if(controlCells.every(isEmpty)){
                        for(let i=0; i<ship.length; i++){
                            this.gameBoard[cell+i].shipObj = ship;
                        }
                    }else{
                        return "cannot place 2 ships in the same spot"
                    }
                }
                break;
            case "y":
                let controlCells =[];
                let currentCell = cell;
                for (let i= 0; i<ship.length; i++) {
                    controlCells.push(currentCell)
                    currentCell += 10
                }

                const existenceCheck = (value) => this.gameBoard[value] ? true : false;
                if(!controlCells.every(existenceCheck)){
                    return "cannot place your ship here";
                }else{
                    const isEmpty = (currentValue) => this.gameBoard[currentValue].shipObj === undefined;
                    if(controlCells.every(isEmpty)){
                        let workingCell = cell;
                        for(let i=0; i<ship.length; i++){
                            this.gameBoard[workingCell].shipObj = ship
                            workingCell +=10;
                        }
                    }else{
                        return "cannot place 2 ships in the same spot"
                    }
                }
                break;
        }
    };

    const attackIsBeenShot = function(cell){
        gameBoard[cell].isBeenShot = true;
        if(gameBoard[cell].shipObj){
            let currentShip =  gameBoard[cell].shipObj;
            currentShip.hit(cell);
            if(currentShip.isSunk()){
               return `your ${currentShip.name} has been sunk!`
            }else{
                this.gameBoard[cell].missed = "missed";
            }
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