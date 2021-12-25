const playerFactory = require("./factories/playerFactory");
const gameBoardFactory = require("./factories/gameBoardFactory");
const shipFactory = require("./factories/shipFactory");

function startOfGame() {

    const body = document.querySelector('body');

    const battleshipTitle = document.createElement('h1');
    battleshipTitle.innerHTML = "Battleship!";
    const enterYourName = document.createElement('h2');
    enterYourName.innerHTML = "Enter your name";
    const playerName = document.createElement('input');
    playerName.type = 'text';
    playerName.maxLength = 8;
    const startButton = document.createElement('button');
    startButton.innerHTML = 'Continue';


    body.appendChild(battleshipTitle);
    body.appendChild(enterYourName);
    body.appendChild(playerName);
    body.appendChild(startButton)


    function playerCheck() {
        if (!playerName.value) {
            let errorMessage = document.createElement('p');
            errorMessage.id = "errorMessage";
            errorMessage.innerHTML = 'No name! Enter one to play';
            body.appendChild(errorMessage);
        } else {
            createPlayer()
        }
    }

    startButton.addEventListener('click', playerCheck);


    function createPlayer() {
        //removes everything that is not needed
        body.removeChild(battleshipTitle);
        body.removeChild(enterYourName);
        body.removeChild(startButton);
        let em = document.querySelectorAll('#errorMessage');
        em = Array.from(em);
        em.forEach(e => {
            body.removeChild(e)
        });


        //before removing the input grab the value and create player with grid
        let player1 = new playerFactory(playerName.value);
        body.removeChild(playerName);
        let player1Grid = new gameBoardFactory;

        const player1Obj = {
            player1: player1,
            grid: player1Grid,
        };

        return playerShipPlacement(player1Obj)
    }

    function playerShipPlacement(player1Obj) {
        const grids = document.createElement('div');
        grids.id = 'grids';
        const containerPlayer = document.createElement('div');
        containerPlayer.id = 'containerPlayer';
        const shipContainer = document.createElement('div');
        shipContainer.id="shipContainer";
        grids.appendChild(containerPlayer);
        grids.appendChild(shipContainer)
        //create button for axis shift
        const axisButton = document.createElement('button');
        axisButton.classList.add("axisButton");
        axisButton.innerHTML = "X";
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
        containerPlayer.style.gridTemplateColumns = "repeat(10, 1fr)";
        containerPlayer.style.gridTemplateRows = "repeat(10, 1fr)";

        let patrolForDrag = document.createElement('div');
        patrolForDrag.id = "patrol";
        patrolForDrag.classList.add("shipsDom")
        patrolForDrag.draggable = true;
        let curserForDrag = document.createElement('div');
        curserForDrag.id = "curser";
        curserForDrag.classList.add("shipsDom")
        curserForDrag.draggable = true;
        let subForDrag = document.createElement('div');
        subForDrag.id = "sub";
        subForDrag.classList.add("shipsDom")
        subForDrag.draggable = true;
        let battleshipForDrag = document.createElement('div');
        battleshipForDrag.id = "battleship";
        battleshipForDrag.classList.add("shipsDom")
        battleshipForDrag.draggable = true;
        let admiralForDrag = document.createElement('div');
        admiralForDrag.id = "admiral";        
        admiralForDrag.classList.add("shipsDom")
        admiralForDrag.draggable = true;
        shipContainer.appendChild(patrolForDrag);
        shipContainer.appendChild(curserForDrag);
        shipContainer.appendChild(subForDrag);
        shipContainer.appendChild(battleshipForDrag);
        shipContainer.appendChild(admiralForDrag);
        
        //change axis
        axisButton.addEventListener('click', (e) => {
            if (e.target.value == "x") {
                e.target.value = "y";
                e.target.innerHTML = "Y";
                shipContainer.classList.add("shipContainer90")
            } else {
                e.target.value = "x";
                e.target.innerHTML = "X";
                shipContainer.classList.remove("shipContainer90")
            }
        });

        let myShipsDom = document.querySelectorAll('.shipsDom');
        myShipsDom.forEach(ship => ship.addEventListener('dragstart', function drag(e){
            e.dataTransfer.setData("text", e.target.id)
        }));

        let gridCells = document.querySelectorAll('.playerGridCell');
        gridCells.forEach(cell => cell.addEventListener("dragover",
            function allowDrag(e){
                e.preventDefault()
            }
        ));

        gridCells.forEach(cell=> cell.addEventListener('drop',
            function drop(e){
                e.preventDefault();
                let data = e.dataTransfer.getData('text');
                let currentShip = document.querySelector(`#${data}`);
                let ship = new shipFactory(data);
                let c = parseInt(e.path[0].id);
                if(typeof (player1Obj.grid.shipAllocation(ship, c, axisButton.value)) == "string"){
                    let errorMessage = document.createElement('p');
                    errorMessage.id="errorMessage"
                    errorMessage.innerHTML = (player1Obj.grid.shipAllocation(ship, c, axisButton.value))
                    body.appendChild(errorMessage);
                }else{ 
                    shipContainer.removeChild(currentShip)
                    console.log(player1Obj.grid.gameBoard)
                    //add class so that you can see your own ships
                }
            }
        )) 
    }
}

module.exports = startOfGame