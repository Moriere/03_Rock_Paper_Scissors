function computerPlay() {    
    const randomNumber = Math.floor(Math.random()*3)+1;
    if (randomNumber === 1) {
        return "rock";
    } else if (randomNumber === 2) {
        return "paper";
    } else {
        return "scissors";
    }
}

function clicked(e) {
    e.target.classList.add('clicked');
    addEventListener('transitionend', () => e.target.classList.remove('clicked'));
}

function endResult(computerScore, userScore) {
    const resultText = document.querySelector('.resultText');

    if (userScore < computerScore) {
        resultText.textContent = "You lose! Hahahaha.";
    } else if (userScore > computerScore) {
        resultText.textContent = "You win! Yay.";
    } else {
        resultText.textContent = "It's a tie.";
    }
}

function scoreUpdaterScreen(computerScore, userScore) {
    const computerScoreScreen = document.querySelector('#computerScore');
    computerScoreScreen.textContent = `${computerScore}`;

    const userScoreScreen = document.querySelector('#userScore');
    userScoreScreen.textContent = `${userScore}`;
}

function compareSelection(computerSelection, userSelection) {
    const resultText = document.querySelector('#resultText');
    
    if (userSelection === computerSelection) {
        resultText.textContent = "Tie."
        return;
    }

    if ((userSelection === "rock" && computerSelection === "paper") || 
    (userSelection === "scissors" && computerSelection === "rock") || 
    (userSelection === "paper" && computerSelection === "scissors")) {
        computerScore++;
        scoreUpdaterScreen(computerScore, userScore);
        if (computerSelection === "paper" || computerSelection === "rock") {
            resultText.textContent = `You lose! ${computerSelection} beats ${userSelection}.`
        }
        if (computerSelection === "scissors") {
            resultText.textContent = `You win! ${userSelection} beat ${computerSelection}.`
        }
        return;
    }

    if ((userSelection === "rock" && computerSelection === "scissors") ||
    (userSelection === "paper" && computerSelection === "rock") ||
    (userSelection === "scissors" && computerSelection === "paper")) {
        userScore++;
        scoreUpdaterScreen(computerScore, userScore);
        if (userSelection === "paper" || userSelection === "rock") {
            resultText.textContent = `You win! ${userSelection} beats ${computerSelection}.`
        }
        if (userSelection === "scissors") {
            resultText.textContent = `You win! ${userSelection} beat ${computerSelection}.`
        }
        return;
    }
}

function checkScores() {
    if (computerScore < 5 && userScore < 5) {
        return true;
    } else eraseScreen();
}

function eraseScreen() {
    const elem = document.querySelector('body');
    elem.textContent = "";
}

function playRound(e) {
    clicked(e);
    const computerSelection = computerPlay();
    let userSelection = "";
    const computerSelectionIcon = document.querySelector('#selections #computer');
    const userSelectionIcon = document.querySelector('#selections #user');

    switch(computerSelection) {
        case("rock"):
            computerSelectionIcon.textContent = "✊";
            break;
        case("paper"):
            computerSelectionIcon.textContent = "✋";
            break;
        case("scissors"):
            computerSelectionIcon.textContent = "✌";
            break;
    }
    
    switch (e.target.classList[0]) {
        case("rock"): 
            userSelection = "rock";
            userSelectionIcon.textContent = "✊";
            break;
        case("paper"): 
            userSelection = "paper";
            userSelectionIcon.textContent = "✋";
            break;
        case("scissors"): 
            userSelection = "scissors";
            userSelectionIcon.textContent = "✌";
            break;
    }

    if (checkScores()) compareSelection(computerSelection, userSelection);
    else return;
}

let computerScore = 0;
let userScore = 0;
    
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click', playRound));