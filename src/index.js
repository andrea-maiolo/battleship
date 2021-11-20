import gameBoardFactory from "./factories/gameBoardFactory";
import shipFactory from "./factories/shipFactory";
import playerFactory from "./factories/playerFactory";
import cp from "./computerPlayer/cp";

//this is initialization
const skynet = cp();
const andy = new playerFactory("andy");
const andyBoard = new gameBoardFactory();

const andyPatrol = new shipFactory('patrol');
// const andyCurser = new shipFactory('curser');
// const andySub = new shipFactory('sub');
// const andyBattleship = new shipFactory('battleship');
// const andyAdmiral = new shipFactory('admiral');

andyBoard.shipAllocation(andyPatrol, 3, "y");


//this is dom
let body = document.querySelector('body');
let containerPlayer = document.querySelector('#containerPlayer');
let containerComputer = document.querySelector('#containerComputer');

//display player 's grid
for (let i = 0; i < andyBoard.gameBoard.length; i++) {
    let cell = andyBoard.gameBoard[i];
    let cellDiv = document.createElement('div');
    if(cell.shipObj){cellDiv.classList.add("ship")}
    cellDiv.id = cell.id;
    cellDiv.classList.add('playerGridCell')
    containerPlayer.appendChild(cellDiv);
}

//making the grid a grid(if it makes sense)
containerPlayer.style.gridTemplateColumns = "repeat(10, 1fr)";
containerPlayer.style.gridTemplateRows = "repeat(10, 1fr)";
containerComputer.style.gridTemplateColumns = "repeat(10, 1fr)";
containerComputer.style.gridTemplateRows = "repeat(10, 1fr)";

//display computer's grid
for (let i = 0; i < skynet.cpBoard.gameBoard.length; i++) {
    let cell = skynet.cpBoard.gameBoard[i];
    let cellDiv = document.createElement('div');
    cellDiv.id = cell.id;
    cellDiv.classList.add('computerGridCell')
    containerComputer.appendChild(cellDiv);
}


