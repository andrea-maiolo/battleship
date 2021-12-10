const startOfGame = require('./startOfGame');
startOfGame()


function playerShipPlacement(player1Obj){
    //create this
    //  <!-- <div id="grids">
    // <div id="containerPlayer"></div>
    // </div> -->
    const grids = document.createElement('div');
    grids.id='grids';
    const containerPlayer = document.createElement('div');
    containerPlayer.id='containerPlayer';
    grids.appendChild(containerPlayer);
    //create button for axis shift
    const axisButton = document.createElement('button');
    axisButton.classList.add("axisButton");
    axisButton.innerHTML="X";
    axisButton.value = "x";
    body.appendChild(axisButton);
    body.appendChild(grids);

    //create grid in HTML
    let gameboardDOM = player1Obj.grid.gameBoard;
    for (let i = 0; i < gameboardDOM.length; i++) {
        let cell = gameboardDOM[i];
        let cellDiv = document.createElement('div');
        cellDiv.id = cell.id;
        cellDiv.classList.add('playerGridCell')
        containerPlayer.appendChild(cellDiv);
    }
    
    //making the grid a grid(if it makes sense)
    containerPlayer.style.gridTemplateColumns = "repeat(10, 1fr)";
    containerPlayer.style.gridTemplateRows = "repeat(10, 1fr)";

    //change axis
    axisButton.addEventListener('click', (e)=> {
        if(e.target.value =="x"){
            e.target.value = "y";
            e.target.innerHTML = "Y";
        }else{
            e.target.value ="x";
            e.target.innerHTML = "X";
        }
    });

    
    document.querySelectorAll('.playerGridCell').forEach(item => {
        item.addEventListener('mouseover', function(e){
          e.target.classList.add("hoverShipAllocation")
        });
        item.addEventListener('mouseout', function(e){
            console.log(e.target)
            e.target.classList.remove('hoverShipAllocation')
            for(let i=0; i<ship.length; i++){
                this.gameBoard[cell+i].shipObj = ship;
            }
        })
    });

    containerPlayer.addEventListener('click', function(e){
        let targetCell = e.path[0].id;
        if(targetCell == "containerPlayer"){
            return
        }else{
            checkShipPlacement(targetCell)
        }
    });

    const checkShipPlacement = function(targetCell){
         //create ships for later
        targetCell = parseInt(targetCell);
        let player1Patrol = new shipFactory("patrol");
        player1Obj.grid.shipAllocation(player1Patrol, targetCell, axisButton.value)
        // let player1Curser = new shipFactory("curser");
        // let player1Sub = new shipFactory("sub");
        // let player1Battleship = new shipFactory("battleship");
        // let player1Admiral = new shipFactory("admiral");
    

    }


}