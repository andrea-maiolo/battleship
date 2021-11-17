import gameBoardFactory from "./factories/gameBoardFactory";
import shipFactory from "./factories/shipFactory";
import playerFactory from "./factories/playerFactory";
import cp from "./computerPlayer/cp";

const skynet = cp();
const andy = new playerFactory("andy");
const andyBoard = new gameBoardFactory();

const andyPatrol = new shipFactory('patrol');
const andyCurser = new shipFactory('curser');
const andySub = new shipFactory('sub');
const andyBattleship = new shipFactory('battleship');
const andyAdmiral = new shipFactory('admiral');

andyBoard.shipAllocation(andyPatrol, 3, "x");

let body = document.querySelector('body');
let playerContainer = document.createElement('div');
playerContainer.id= "playerContainer";
let cpContainer = document.createElement('div');
cpContainer.id = "cpContainer";
body.appendChild(playerContainer);
body.appendChild(cpContainer);

for (let i = 0; i < andyBoard.gameBoard.length; i++) {
    playerContainer.appendChild(document.createElement('div'))
}
// for (let i = 0; i < 256; i++) {
//     container.appendChild(document.createElement('div'))
// }