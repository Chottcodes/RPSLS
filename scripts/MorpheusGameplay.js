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
  roundTitleBox.innerText = `Round: ${rounds}`;
  roundTrackerbox1.innerText = `You: ${player1points}`;
  roundTrackerbox2.innerText = `Mrpheus: ${CpuPoints}`;
}

function compareChoices(playerChoice, cpuChoice) {
  if (winConditions[playerChoice].includes(cpuChoice)) {
    player1points++;
  } else if (winConditions[cpuChoice].includes(playerChoice)) {
    CpuPoints++;
  } else {
    roundTitleBox.innerText = `Draw!`;
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
    bestofText.innerText = "Player 1 Wins";
    resetGame();
    
  }
  if (roundsToWin === 7 && player1points === 0 && CpuPoints === 4) {
    bestofText.innerText = "Player 1 Wins";
    resetGame();
  }
  if (rounds === roundsToWin) {
    if (player1points > CpuPoints) {
      roundTitleBox.innerText = "Player 1 wins";
      resetGame();
    } else if (player1points < CpuPoints) {
      roundTitleBox.innerText = "Morpheus wins!";
      resetGame();
    } else {
      roundTitleBox.innerText = "It's a draw!";
      resetGame();
    }
  }
}
function resetGame() {
  CPUReturnText.innerText = "";
  player1points = 0;
  CpuPoints = 0;
  rounds = 0;
  updateScores();
}

allButtons.forEach((button) => {
  button.addEventListener("click", async () => {
    const playerChoice = button.id.replace("buttonschoice", "").toLowerCase();
    const cpuChoice = await GetCPU();
    CPUReturnText.innerText = `Morpheus: ${cpuChoice}`;
    compareChoices(playerChoice, cpuChoice);
    updateScores();
  });
});

tryAgainButton.addEventListener("click", () => {
  resetGame();
});
