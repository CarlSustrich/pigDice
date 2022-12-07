//business

function Game() {
  this.players = [];
  this.activePlayer = 0;
  this.playerCount;
  this.diceCount;
  this.maxScore;
}

function Player() {
  this.turnScore = 0;
  this.totalScore = 0;
  this.currentRoll1 = 0;
  this.currentRoll2 = 0;
  this.rollsThisTurn = 0;
  this.rolledYet = false;
}

function diceRoll() {
  return Math.floor((Math.random() * 6) + 2);
}

Game.prototype.switchPlayer = function () {
  if (this.activePlayer === 0) {
    this.activePlayer = 1;
  } else {
    this.activePlayer = 0;
  }
};

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

Game.prototype.aiCheck = function () {
  if (this.activePlayer === 1 && this.playerCount === 1) {
    return true;
  } else {
    return false;
  }
};

Game.prototype.chooseAction = function() {
  while (this.aiCheck()) {
    if (this.players[this.activePlayer].rollsThisTurn < 2) {
      newGame.diceCount === 2 ? newGame.players[newGame.activePlayer].roll2Dice() : newGame.players[newGame.activePlayer].rollDice();
      amIWinner(newGame.maxScore);
      displayScores();
      manageUI();
      // sleep(2000);
    } else {
      this.players[this.activePlayer].endTurn();
      amIWinner(newGame.maxScore);
    }

  }
}

Player.prototype.rollDice = function() {
  this.rolledYet = true;
  let roll1 = diceRoll();
  if (roll1 === 1) {
    this.turnScore = 0;
    this.rollsThisTurn = 0;
    newGame.switchPlayer();
    this.currentRoll1 = roll1;
    this.rolledYet = false;
  } else {
    this.turnScore += roll1;
    this.currentRoll1 = roll1;
    this.rollsThisTurn += 1;
  }
};

Player.prototype.roll2Dice = function() {
  this.rolledYet = true;
  let roll1 = diceRoll();
  let roll2 = diceRoll();
  if ((roll1 === 1)||(roll2===1)) {
    this.turnScore = 0;
    this.rollsThisTurn = 0;
    newGame.switchPlayer();
    this.currentRoll1 = roll1;
    this.currentRoll2 = roll2;
    this.rolledYet = false;
  } else {
    this.turnScore += (roll1 + roll2);
    this.currentRoll1 = roll1;
    this.currentRoll2 = roll2;
    this.rollsThisTurn += 1;
  }
};

Player.prototype.endTurn = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  this.rolledYet = false;
  this.rollsThisTurn = 0;
  newGame.switchPlayer();
};

let newGame = new Game();
let player1 = new Player();
let player2 = new Player();
newGame.players.push(player1, player2);

//UI

function displayScores() {
  document.querySelector("span#player1TotalScore").innerText = player1.totalScore;
  document.querySelector("span#player2TotalScore").innerText = player2.totalScore;
  document.querySelector("span#player1CurrentRoll").innerText = player1.currentRoll1;
  document.querySelector("span#player2CurrentRoll").innerText = player2.currentRoll1;
  document.querySelector("span#player1TurnScore").innerText = player1.turnScore;
  document.querySelector("span#player2TurnScore").innerText = player2.turnScore;
  document.querySelector("span#player1CurrentRoll2").innerText = player1.currentRoll2;
  document.querySelector("span#player2CurrentRoll2").innerText = player2.currentRoll2;
  
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

  if (newGame.diceCount === 2) {
    document.querySelector("#player1roll2").removeAttribute("class", "hidden");
    document.querySelector("#player2roll2").removeAttribute("class", "hidden");
  }

  if (newGame.players[newGame.activePlayer].rolledYet === false) {
      document.getElementById(`passDicePlayer${(newGame.activePlayer)+1}`).setAttribute("class", "hidden");
  }
}

function amIWinner(maxScore) {
  let p1Controls = document.getElementById("player1Controls")
  let p2Controls = document.getElementById("player2Controls")

  if ((player1.totalScore + player1.turnScore) >= maxScore) {
    player1.totalScore += player1.turnScore;
    p1Controls.setAttribute("class", "hidden");
    p2Controls.setAttribute("class", "hidden");
    document.getElementById("winner").removeAttribute("class");
    document.getElementById("winnerIndex").innerText = "1";
  } else if ((player2.totalScore + player2.turnScore) >= maxScore) {
    player2.totalScore += player2.turnScore;
    p1Controls.setAttribute("class", "hidden");
    p2Controls.setAttribute("class", "hidden");
    document.getElementById("winner").removeAttribute("class");
    document.getElementById("winnerIndex").innerText = "2";
  }
}

window.addEventListener("load", function() {
  let player1RollBtn = document.getElementById("rollDicePlayer1");
  let player1PassBtn = document.getElementById("passDicePlayer1");
  let player2RollBtn = document.getElementById("rollDicePlayer2");
  let player2PassBtn = document.getElementById("passDicePlayer2");
  let settings = document.getElementById("settings");

  settings.addEventListener('submit', function(event) {
    event.preventDefault();
    document.querySelector("#game").removeAttribute("id", "hidden");
    document.querySelector("form").setAttribute("class", "hidden");
    newGame.playerCount = Number(document.querySelector('input[name="userCount"]:checked').value);
    newGame.diceCount = Number(document.querySelector('input[name="diceCount"]:checked').value);
    newGame.maxScore = Number(document.querySelector("#maxScore").value);
    manageUI();
  });

  player1RollBtn.addEventListener('click', function() {
    newGame.diceCount === 2 ? newGame.players[newGame.activePlayer].roll2Dice() : newGame.players[newGame.activePlayer].rollDice();
    document.getElementById("passDicePlayer1").removeAttribute("class", "hidden");
    amIWinner(newGame.maxScore);
    displayScores();
    manageUI();
    newGame.chooseAction();
    displayScores();
    manageUI();
  });

  player1PassBtn.addEventListener('click', function () {
    newGame.players[newGame.activePlayer].endTurn();
    document.getElementById("passDicePlayer1").setAttribute("class", "hidden");
    amIWinner(newGame.maxScore);
    displayScores();
    manageUI();
    newGame.chooseAction();
    displayScores();
    manageUI();
  });

  player2RollBtn.addEventListener('click', function () {
    newGame.diceCount === 2 ? newGame.players[newGame.activePlayer].roll2Dice() : newGame.players[newGame.activePlayer].rollDice();
    document.getElementById("passDicePlayer2").removeAttribute("class", "hidden");
    amIWinner(newGame.maxScore);
    displayScores();
    manageUI();
  });

  player2PassBtn.addEventListener('click', function () {
    newGame.players[newGame.activePlayer].endTurn();
    document.getElementById("passDicePlayer2").setAttribute("class", "hidden");
    amIWinner(newGame.maxScore);
    displayScores();
    manageUI();
  });
});
