function Game() {
  this.players = [];
  this.activePlayer = 0;
}

function Player() {
  this.turnScore = 0;
  this.totalScore = 0;
}

function diceRoll() {
  return Math.floor((Math.random() * 6) + 1);
}

Game.prototype.switchPlayer = function () {
  if (this.activePlayer===0) {
    this.activePlayer = 1;
  } else {
    this.activePlayer = 0;
  }
}

Player.prototype.rollDice = function() {
  let roll = diceRoll();
  if (roll === 1) {
    this.turnScore = 0;
    newGame.switchPlayer();
    return roll;
  } else {
    this.turnScore += roll;
    return roll;
  }
};

Player.prototype.endTurn = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  newGame.switchPlayer();
  return this.totalScore;
}

let newGame = new Game();
let player1 = new Player(0, 0);
let player2 = new Player(0, 0);
newGame.players.push(player1, player2);


//UI


//need to make current roll an object property
function displayScores() {
  document.querySelector("span#player1TotalScore").innerText = player1.totalScore;
  document.querySelector("span#player2TotalScore").innerText = player2.totalScore;
  //document.querySelector("span#player1CurrentRoll").innerText = player1.currentRoll;
  //document.querySelector("span#player2CurrentRoll").innerText = player2.currentRoll;
  //document.querySelector("span#player1TurnScore").innerText = player1.turnScore;
  //document.querySelector("span#player2TurnScore").innerText = player2.turnScore;
}
 
window.addEventListener("load", function() {
  let rollBtn = document.getElementById("rollDice");
  let passBtn = document.getElementById("passDice");
  rollBtn.addEventListener('click', function () {
    newGame.players[newGame.activePlayer].rollDice();
  });
  rollBtn.addEventListener('click', displayScores);
  passBtn.addEventListener('click', function () {
    newGame.players[newGame.activePlayer].endTurn();
  });
  // passBtn.addEventListener('click', newGame.players[newGame.activePlayer].endTurn());
  passBtn.addEventListener('click', displayScores);
});




/* const player = {
  currentChoice: null
}
const computer = {
  currentChoice: null
}
const choices = ["Rock", "Paper", "Scissors"];

player.currentChoice = choices[2];
var rockBtn = document.getElementById('rock');
var paprBtn = document.getElementById('paper');
var scirBtn = document.getElementById('scissors');

if(rockBtn || paprBtn || scirBtn) {
    rockBtn.addEventListener('click', updateVar);
    paprBtn.addEventListener('click', updateVar);
    scirBtn.addEventListener('click', updateVar);
}
function updateVar(event){
    if(event.target.id == 'rock'){
        player.currentChoice = choices[0];
    } else if (event.target.id == 'paper'){
        player.currentChoice = choices[1];
    } else if (event.target.id == 'scissors'){
        player.currentChoice = choices[2];
    }
    console.log(player.currentChoice);
}
*/
