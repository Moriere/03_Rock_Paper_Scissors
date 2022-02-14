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
            if (!checkScores()) endScreen();
        }
        if (computerSelection === "scissors") {
            resultText.textContent = `You lose! ${computerSelection} beat ${userSelection}.`
            if (!checkScores()) endScreen();
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
            if (!checkScores()) endScreen();
        }
        if (userSelection === "scissors") {
            resultText.textContent = `You win! ${userSelection} beat ${computerSelection}.`
            if (!checkScores()) endScreen();
        }
        return;
    }
}

function checkScores() {
    if (computerScore < 5 && userScore < 5) {
        return true;
    } else false;
}

function endScreen() {
    const body = document.querySelector('body');
    const endScreen = document.createElement('div');
    body.classList.add('center');
    endScreen.setAttribute('id', 'endScreen');
    body.appendChild(endScreen);

    const score = document.createElement('div');
    score.setAttribute('id', 'score');
    score.textContent = "Final score";
    endScreen.appendChild(score);

    const divScoreNumbers = document.createElement('div');
    divScoreNumbers.setAttribute('id', 'scoreNumbers');
    score.appendChild(divScoreNumbers);

    const computerScoreScreen = document.createElement('div');
    const userScoreScreen = document.createElement('div');
    const dash = document.createElement('div');
    computerScoreScreen.textContent = `${computerScore}`;
    computerScoreScreen.setAttribute('id', 'computerScore');
    userScoreScreen.setAttribute('id', 'userScore')
    userScoreScreen.textContent = `${userScore}`;
    dash.textContent = ' - ';

    divScoreNumbers.appendChild(userScoreScreen);
    divScoreNumbers.appendChild(dash);
    divScoreNumbers.appendChild(computerScoreScreen);

    const resultText = document.createElement('div');
    resultText.setAttribute('id', 'winLose');
    if (computerScore >= 5) resultText.textContent = 'You have been defeated!';
    if (userScore >= 5) resultText.textContent = 'You are victorious!';
    endScreen.insertBefore(resultText, score);

    const buttonDiv = document.createElement('div');
    buttonDiv.setAttribute('id', 'buttons');
    endScreen.appendChild(buttonDiv);

    const replayButton = document.createElement('button');
    replayButton.setAttribute('class', 'replayButton');
    replayButton.textContent = 'Replay';

    buttonDiv.appendChild(replayButton);

    replayButton.addEventListener('click', replay);
}

function replay(e) {
    clicked(e);
    computerScore = 0;
    userScore = 0;

    const resultText = document.querySelector('#resultText');
    resultText.textContent = " - ";

    scoreUpdaterScreen(computerScore, userScore);

    const computerSelectionIcon = document.querySelector('#selections #computer');
    const userSelectionIcon = document.querySelector('#selections #user');
    computerSelectionIcon.textContent = "";
    userSelectionIcon.textContent = "";

    const body = document.querySelector('body');
    body.classList.remove('center');

    endScreenDiv = document.querySelector('#endScreen');
    body.removeChild(endScreenDiv);
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
    else endScreen();
}

let computerScore = 0;
let userScore = 0;
    
const buttons = document.querySelectorAll('button');
buttons.forEach(btn => btn.addEventListener('click', playRound));