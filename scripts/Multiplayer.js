// Player 1 buttons
const p1scissors = document.getElementById("player1Scissors");
const p1lizard = document.getElementById("player1Lizard");
const p1paper = document.getElementById("player1Paper");
const p1rock = document.getElementById("player1Rock");
const p1spock = document.getElementById("player1Spock");
// Player 2 buttons
const p2scissors = document.getElementById("player2Scissors");
const p2lizard = document.getElementById("player2Lizard");
const p2paper = document.getElementById("player2Paper");
const p2rock = document.getElementById("player2Rock");
const p2spock = document.getElementById("player2Spock");
// home and replay button
const replayButton = document.getElementById("replay");
const homeButton = document.getElementById("home");
//My Counters and player choice variables
let player1Choice = null;
let player2Choice = null;
let player1points = 0;
let player2points = 0;
let roundCount = 0;
let roundsToWin = 0;
let player1Chose = player1Choice == null ? false : true;
let player2Chose = player2Choice == null ? false : true;

//My Score boxes
const player1ScoreBox = document.getElementById("player1scoretracker");
const player2ScoreBox = document.getElementById("player2scoretracker");
const bestofText = document.getElementById("bestOf");
const multiplayerRoundTracker = document.getElementById(
  "multiplayerRoundtracker"
);
const winnerShowcaseText = document.getElementById("winnerTracker");

const localStorageValue = localStorage.getItem("gameMode");

document.addEventListener("DOMContentLoaded", () => {
  OnloadRoundToWin();
});

function OnloadRoundToWin() {
  bestofText.innerText = localStorageValue;
}

const winningConditions = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

const allButtons = [
  p1scissors,
  p1lizard,
  p1paper,
  p1rock,
  p1spock,
  p2scissors,
  p2lizard,
  p2paper,
  p2rock,
  p2spock,
];

function updateScores() {
  multiplayerRoundTracker.innerText = `Round: ${roundCount}`;
  player1ScoreBox.innerText = `Player 1: ${player1points}`;
  player2ScoreBox.innerText = `Player 2: ${player2points}`;
}

function compareChoices(player1Choice, player2Choice) {
  if (winningConditions[player1Choice].includes(player2Choice)) {
    player1points++;
    winnerShowcaseText.innerText = `Player 1 Wins`;
  } else if (winningConditions[player2Choice].includes(player1Choice)) {
    player2points++;
    winnerShowcaseText.innerText = `Player 2 Wins`;
  } else {
    winnerShowcaseText.innerText = `Draw!`;
  }
  roundCount++;
  updateScores();
  checkGameEnd();
}

function checkGameEnd() {
  if (localStorageValue === "Best out of 1") {
    roundsToWin = 1;
    bestofText.innerText = "Best of 1";
  } else if (localStorageValue === "Best Out of 5") {
    roundsToWin = 5;
    bestofText.innerText = "Best of 5";
  } else if (localStorageValue === "Best out of 7") {
    roundsToWin = 7;
    bestofText.innerText = "Best of 7";
  }

  if (roundsToWin === 5 && player1points === 3 && player2points === 0) {
    bestofText.innerText = "player1 Wins (3-0)";
    resetGame();
  }
  if (roundsToWin === 5 && player2points === 0 && player1points === 3) {
    bestofText.innerText = "Player 2 Wins (3-0)";
    resetGame();
  }
  if (roundsToWin === 7 && player1points === 4 && player2points === 0) {
    bestofText.innerText = "Player 1 Wins (4-0)";
    resetGame();
  }
  if (roundsToWin === 7 && player1points === 0 && player2points === 4) {
    bestofText.innerText = "Player 2 Wins (3-0)";
    resetGame();
  }
  if (roundCount === roundsToWin) {
    if (player1points > player2points) {
      multiplayerRoundTracker.innerText = "Player 1 Wins";
      resetGame();
    } else if (player1points < player2points) {
      multiplayerRoundTracker.innerText = "Player 2 Wins";
      resetGame();
    } else if (roundCount === roundsToWin) {
      multiplayerRoundTracker.innerText = "Draw!";
      resetGame();
    }
  }
}

function resetGame() {
  multiplayerRoundTracker.innerText = "";
  player1points = 0;
  player2points = 0;
  roundCount = 0;
  updateScores();
  RoundText();
}

function RoundText() {
  if (localStorageValue === "Best out of 1") {
    roundsToWin = 1;
    bestofText.innerText = "Best of 1";
  } else if (localStorageValue === "Best Out of 5") {
    roundsToWin = 5;
    bestofText.innerText = "Best of 5";
  } else if (localStorageValue === "Best out of 7") {
    roundsToWin = 7;
    bestofText.innerText = "Best of 7";
  }

  multiplayerRoundTracker.innerText = `Round: ${roundCount + 1}`;
}
function resetRound() {
  player1Choice = null;
  player2Choice = null;

  allButtons.forEach((button) => button.classList.remove("selectedButton"));

  multiplayerRoundTracker.innerText = `Round: ${roundCount + 1}`;
}

allButtons.forEach((button) => {
  button.addEventListener("click", () => {
    allButtons.forEach((btn) => btn.classList.remove("selectedButton"));

    button.classList.add("selectedButton");

    if (button.id.includes("player1")) {
      player1Choice = button.id.replace("player1", "").toLowerCase();
    } else if (button.id.includes("player2")) {
      player2Choice = button.id.replace("player2", "").toLowerCase();
    }

    if (player1Choice && player2Choice) {
      compareChoices(player1Choice, player2Choice);
      updateScores();

      resetRound();
    }
  });
});
replayButton.addEventListener("click", () => {
  resetGame();
  resetRound();
});
