//need to add a way to end game at 100 pts
//need to display whose turn it currently is

//need to add/hide 


function Game() {
  this.players = [];
  this.activePlayer = 0;
}

function Player() {
  this.turnScore = 0;
  this.totalScore = 0;
  this.currentRoll = 0;
  this.rolledYet = false;
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
};

Player.prototype.rollDice = function() {
  this.rolledYet = true;
  let roll = diceRoll();
  if (roll === 1) {
    this.turnScore = 0;
    newGame.switchPlayer();
    this.currentRoll = roll;
    this.rolledYet = false;
    return roll;
  } else {
    this.turnScore += roll;
    this.currentRoll = roll;
    return roll;
  }
};

Player.prototype.endTurn = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  this.rolledYet = false;
  newGame.switchPlayer();
  return this.totalScore;
};

let newGame = new Game();
let player1 = new Player(0, 0);
let player2 = new Player(0, 0);
newGame.players.push(player1, player2);


//UI


//need to make current roll an object property
function displayScores() {
  document.querySelector("span#player1TotalScore").innerText = player1.totalScore;
  document.querySelector("span#player2TotalScore").innerText = player2.totalScore;
  document.querySelector("span#player1CurrentRoll").innerText = player1.currentRoll;
  document.querySelector("span#player2CurrentRoll").innerText = player2.currentRoll;
  document.querySelector("span#player1TurnScore").innerText = player1.turnScore;
  document.querySelector("span#player2TurnScore").innerText = player2.turnScore;
}

function manageUI () {
  let p1Controls = document.getElementById("player1Controls")
  let p2Controls = document.getElementById("player2Controls")

  if (newGame.activePlayer === 0 ) {
    p1Controls.removeAttribute("class", "hidden");
    p2Controls.setAttribute("class", "hidden");
  } else {
    p1Controls.setAttribute("class", "hidden");
    p2Controls.removeAttribute("class", "hidden");
  }

  if (newGame.players[newGame.activePlayer].rolledYet === false) {
      document.getElementById(`passDicePlayer${(newGame.activePlayer)+1}`).setAttribute("class", "hidden");
  }
}
 
window.addEventListener("load", function() {
  let player1RollBtn = document.getElementById("rollDicePlayer1");
  let player1PassBtn = document.getElementById("passDicePlayer1");
  let player2RollBtn = document.getElementById("rollDicePlayer2");
  let player2PassBtn = document.getElementById("passDicePlayer2");

  player1RollBtn.addEventListener('click', function () {
    newGame.players[newGame.activePlayer].rollDice();
    document.getElementById("passDicePlayer1").removeAttribute("class", "hidden");
    displayScores();
    manageUI();
  });

  player1PassBtn.addEventListener('click', function () {
    newGame.players[newGame.activePlayer].endTurn();
    document.getElementById("passDicePlayer1").setAttribute("class", "hidden");
    displayScores();
    manageUI();
  });


  player2RollBtn.addEventListener('click', function () {
    newGame.players[newGame.activePlayer].rollDice();
    document.getElementById("passDicePlayer2").removeAttribute("class", "hidden");
    displayScores();
    manageUI();
  });

  player2PassBtn.addEventListener('click', function () {
    newGame.players[newGame.activePlayer].endTurn();
    document.getElementById("passDicePlayer2").setAttribute("class", "hidden");
    displayScores();
    manageUI();
  });
});
