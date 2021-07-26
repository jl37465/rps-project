const rockInput = document.querySelector("#rockButton");
const paperInput = document.querySelector("#paperButton");
const scissorsInput = document.querySelector("#scissorsButton");
const scoreDiv = document.querySelector("#score-div");
const resultsDiv = document.querySelector("#results-div");
const resetButtons = function() {

}

let originalScore = 0;
let computerScore = 0;

rockInput.addEventListener("click", () => singleRound("rock"));
paperInput.addEventListener("click", () => singleRound("paper"));
scissorsInput.addEventListener("click", () => singleRound("scissors"));

function appendPlayerScore() {
    let oldScoreH1 = document.querySelector("h1");
    originalScore++;
    oldScoreH1.textContent = `Score: ${originalScore} - ${computerScore}`;
}

function appendComputerScore() {
    let oldScoreH1 = document.querySelector("h1");
    computerScore++;
    oldScoreH1.textContent = `Score: ${originalScore} - ${computerScore}`;
}

function resetScore() {
    let scoreScreen = document.querySelector("h1");
    const allButtons = document.querySelectorAll("button");
    const resultsScreen = document.querySelector("h2");

    for(let i = 0; i<allButtons.length; i++) {
        allButtons[i].removeEventListener("click", resetScore)
    }

    originalScore = 0;
    computerScore = 0;
    scoreScreen.textContent = "Score: 0 - 0";
    resultsScreen.style.color = "white";
    

}

function checkWin() {
    const resultsScreen = document.querySelector("h2");
    const allButtons = document.querySelectorAll("button");

    if (originalScore === 5) {
        resultsScreen.textContent = "You win, congrats!\nPress any button to play again.";
        for(let i = 0; i<allButtons.length; i++) {
            allButtons[i].addEventListener("click", resetScore);
        }
    } else if (computerScore === 5) {
        resultsScreen.textContent = "You lost!!\nPress any button to play again.";
        for(let i = 0; i<allButtons.length; i++) {
            allButtons[i].addEventListener("click", resetScore);
        }
    }
}

function winningMessage(playerInput) {
    let resultsScreen = document.querySelector("h2");

    resultsScreen.style.color = "black";

    if (playerInput === "rock") {
        resultsScreen.textContent = "Rock beats Scissors, you win!";
    } else if (playerInput === "scissors") {
        resultsScreen.textContent = "Scissors beats Paper, you win!";
    } else {
        resultsScreen.textContent = "Paper beats Rock, you win!";
    }

    appendPlayerScore();
    checkWin();
}

function losingMessage(playerInput) {
    let resultsScreen = document.querySelector("h2");

    resultsScreen.style.color = "black";

    if (playerInput === "rock") {
        resultsScreen.textContent = "Paper beats Rock, you lose!";
        
    } else if (playerInput === "scissors") {
        resultsScreen.textContent = "Rock beats Scissors, you lose!";
    } else {
        resultsScreen.textContent = "Scissors beats Paper, you lose!";
    }
    
    appendComputerScore();
    checkWin();
}

function drawMessage() {
    let resultsScreen = document.querySelector("h2");

    resultsScreen.style.color = "black";
    resultsScreen.textContent = "It's a tie!"
}

function randomNumber() {
    // Takes random number (0-1), *100 then truncates.
    let randomStart = Math.random()*100;
    let randomSelector = Math.trunc(randomStart);
    return randomSelector;
}

function computerPlay() {
    // Computer randomly generates either rock, paper or scissors
    let randomSelector = randomNumber();
    // If between 0-33, Rock. If 34-66, Paper. If 67-100, Scissors.
    if (randomSelector  <= 33) {
        return "rock";
    } else if (randomSelector <= 66) {
        return "paper";
    } else {
        return "scissors";
    }
}
    

function singleRound(playerInput) {
// Player inputs rock, paper, or scissors
// Input is assigned to player variable
// Player input is changed to all lower case for case-insensitivity.
    let finalPlayerInput = playerInput.toLowerCase();
    // Computer function value is assigned to computer variable
    let computerInput = computerPlay();
    // Both values are compared via if statements. If rock, loses to paper and wins to scissors. Also, return error if input is not any of the three.
    // Return winning/losing/draw message.
    if (finalPlayerInput === "rock") {
        console.log("You chose " + finalPlayerInput + "!");
        if (computerInput === "rock") {
            console.log("tie");
            drawMessage();
        } else if (computerInput === "paper") {
            console.log("lose");
            losingMessage("rock");
        }
        else if (computerInput === "scissors") {
            console.log("win");
            winningMessage("rock");
        }
    } else if (finalPlayerInput === "paper") {
        console.log("You chose " + finalPlayerInput + "!");

        if (computerInput === "rock") {
            winningMessage("paper");
        } else if (computerInput === "paper") {
            drawMessage();
        }
        else if (computerInput === "scissors") {
            losingMessage("paper");
        }
    } else if (finalPlayerInput === "scissors") {
        console.log("You chose " + finalPlayerInput + "!");

        if (computerInput === "rock") {
            losingMessage("scissors");
        } else if (computerInput === "paper") {
            winningMessage("scissors");
        }
        else if (computerInput === "scissors") {
            drawMessage();
        }
    } else {
        console.log("You chose ???");
        return "You can't even type rock, paper, or scissors properly? That's an automatic fail!"
    }

}