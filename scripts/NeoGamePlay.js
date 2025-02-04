const CPUReturnText = document.getElementById("CPUChoice"),
  roundTrackerbox1 = document.getElementById("roundTracker1"),
  roundTrackerbox2 = document.getElementById("roundTracker2"),
  roundTitleBox = document.getElementById("RoundTitleBox"),
  backgroundImage = document.getElementById("backgroundImage"),
  bestofText = document.getElementById("bestOf"),
  rock = document.getElementById("buttonschoiceRock"),
  lizard = document.getElementById("buttonschoiceLizard"),
  spock = document.getElementById("buttonschoiceSpock"),
  paper = document.getElementById("buttonschoicePaper"),
  scissors = document.getElementById("buttonschoiceScissors"),
  tryAgainButton = document.getElementById("tryagainButton");

const choices = ["rock", "paper", "scissors", "lizard", "spock"];
const allButtons = [rock, lizard, spock, paper, scissors];
//Gather My locaal Storage so i can make adjustments to the round based off the value of localstorage key
const localStorageValue = localStorage.getItem("gameModeComputer");
//Created variables to keep track of the points of the CPU and Player.
let player1points = 0;
let CpuPoints = 0;
let rounds = 0;
let roundsToWin;
//create a function that display the round to win on load
document.addEventListener("DOMContentLoaded", () => {
  OnloadRoundToWin();
});

function OnloadRoundToWin() {
  bestofText.innerText = localStorageValue;
}

//Created my winning Conditions
const winConditions = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"],
};

async function GetCPU() {
  const response = await fetch(
    "https://rockpaperscissorslizard-hjf7chacademcjaj.westus-01.azurewebsites.net/RockPaperScissorLizardSpock/RockPapper"
  );
  const data = await response.text();
  return data;
}

function updateScores() {
  if (roundsToWin === 1) {
    roundTitleBox.innerText 
  } else {
    roundTitleBox.innerText = `Round: ${rounds}`;
  }
  roundTrackerbox1.innerText = `You: ${player1points}`;
  roundTrackerbox2.innerText = `Neo: ${CpuPoints}`;
}
function compareChoices(playerChoice, cpuChoice) {
  if (winConditions[playerChoice].includes(cpuChoice)) {
    player1points++;
  } else if (winConditions[cpuChoice].includes(playerChoice)) {
    CpuPoints++;
  } else {
    CPUReturnText.innerText = `Draw!`;
  }
  rounds++;
  updateScores();
  checkGameEnd();
}

function checkGameEnd() {
  if (localStorageValue === "Best out of 1") {
    roundsToWin = 1;
    bestofText.innerText = "Best of 1";
  } else if (localStorageValue === "Best out of 5") {
    roundsToWin = 5;
    bestofText.innerText = "Best of 5";
  } else if (localStorageValue === "Best out of 7") {
    roundsToWin = 7;
    bestofText.innerText = "Best of 7";
  }
  if (roundsToWin === 5 && player1points === 3 && CpuPoints === 0) {
    CPUReturnText.innerText = `player 1 won (3-0)`;
    resetGame();
  }
  if (roundsToWin === 5 && player1points === 0 && CpuPoints === 3) {
    CPUReturnText.innerText = `Neo (3-0)`;
    resetGame();
  }
  if (roundsToWin === 7 && player1points === 4 && CpuPoints === 0) {
    CPUReturnText.innerText = `player 1 won (4-0)`;
    resetGame();
  }
  if (roundsToWin === 7 && player1points === 0 && CpuPoints === 4) {
    CPUReturnText.innerText = `Neo won (4-0)`;
    resetGame();
  }
  if (rounds === roundsToWin) {
    if (player1points > CpuPoints) {
      CPUReturnText.innerText = "Player 1 Wins";
      disableButtons();
      updateScores();
    } else if (player1points < CpuPoints) {
      CPUReturnText.innerText = "Neo Wins";
      disableButtons();
      updateScores();
    } else {
      CPUReturnText.innerText = "Game Draw!";
      disableButtons();
     updateScores();
    }
  }
}
function disableButtons() {
  allButtons.forEach((button) => {
    button.disabled = true;
  });
}
function enableButtons() {
  allButtons.forEach((button) => {
    button.disabled = false;
  });
}
function resetGame() {
  player1points = 0;
  CpuPoints = 0;
  rounds = 0;
  updateScores();
}
allButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const playerChoice = button.id.replace("buttonschoice", "").toLowerCase();
    const cpuChoice = await GetCPU();
    CPUReturnText.innerText = `${cpuChoice}`;
    compareChoices(playerChoice, cpuChoice);
    console.log(roundsToWin);
    updateScores();
  });
});

tryAgainButton.addEventListener("click", () => {
  CPUReturnText.innerText = "";
  enableButtons();
  resetGame();
});
