const playerFactory =  require("./factories/playerFactory");
const gameBoardFactory =require("./factories/gameBoardFactory");
const shipFactory = require("./factories/shipFactory");

function startOfGame(){

    const containerComputer = document.querySelector('#containerComputer');
    containerComputer.style.display = 'none';
    const body = document.querySelector('body');
    const containerPlayer = document.querySelector('#containerPlayer');
    const startButton = document.querySelector('#start');

    const playerName = document.createElement('input');
    playerName.type = 'text';
    playerName.maxLength = 8;
    body.appendChild(playerName);


    function playerCheck(){
        if(!playerName.value){
            alert("no name")
        }else{
            createPlayer()
        }
    }

    function createPlayer(){
        let player1 = new playerFactory(playerName.value);
        let player1Grid = new gameBoardFactory;
        let player1Patrol = new shipFactory("patrol");
        let player1Curser = new shipFactory("curser");
        let player1Sub = new shipFactory("sub");
        let player1Battleship = new shipFactory("battleship");
        let player1Admiral = new shipFactory("admiral");
        let shipArray = [];
        shipArray.push(player1Patrol)
        shipArray.push(player1Curser)
        shipArray.push(player1Sub)
        shipArray.push(player1Battleship)
        shipArray.push(player1Admiral)

        const player1Obj= {
            player1:player1,
            player1Grid:player1Grid,
            shipArray: shipArray
        };
        playerShipPlacement(player1Obj)
    }

    function playerShipPlacement(obj){
        //remove input
        body.removeChild(playerName);
        //create grid
        let pGrid = obj.player1Grid.gameBoard;
        for (let i = 0; i < pGrid.length; i++) {
            let cell = pGrid[i];
            let cellDiv = document.createElement('div');
            //this will be done later on
            // if(cell.shipObj){cellDiv.classList.add(cell.shipObj.name)}
            cellDiv.id = cell.id;
            cellDiv.classList.add('playerGridCell')
            containerPlayer.appendChild(cellDiv);
        }
        
        //making the grid a grid(if it makes sense)
        containerPlayer.style.gridTemplateColumns = "repeat(10, 1fr)";
        containerPlayer.style.gridTemplateRows = "repeat(10, 1fr)";
        //to rotate the ships
        const axisButton = document.createElement('button');
        axisButton.classList.add("x");
        axisButton.innerHTML="Axis x";
        axisButton.value = "x";
        body.appendChild(axisButton);

        //change axis
        axisButton.addEventListener('click', (e)=> {
            if(e.target.value =="x"){
                e.target.value = "y";
                e.target.innerHTML = "Axis y";
            }else{
                e.target.value ="x";
                e.target.innerHTML = "Axis x";
            }
        })

        //take the ship array and place ships
        let shipArray = obj.shipArray;
        shipArray.forEach(ship=>{
            let message = document.createElement('p');
            message.innerHTML = `${obj.player1.name} place your ${ship.name}`;
            body.appendChild(message);

            // //create a dummy ship
            // let dummyShip = document
            
        });
//        pGrid.shipAllocation() this is the actual grid so it doesnt have any function















    }

    startButton.addEventListener('click', playerCheck);

}

module.exports  = startOfGame