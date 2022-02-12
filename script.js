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

function scoreUpdater(computerScore, userScore) {
    const computerScoreScreen = document.querySelector('#computerScore');
    computerScoreScreen.textContent = `Computer: ${computerScore}`;

    const userScoreScreen = document.querySelector('#userScore');
    userScoreScreen.textContent = `You: ${userScore}`;
}

function game() {

    let computerScore = 0;
    let userScore = 0;
    
    const buttons = document.querySelectorAll('#buttons');
    buttons.forEach(btn => btn.addEventListener('click', e => {
        const computerSelection = computerPlay();
        let userSelection = "";

        switch (e.target.className) {
            case("rock"): 
                userSelection = "rock";
                break;
            case("paper"): 
                userSelection = "paper";
                break;
            case("scissors"): 
                userSelection = "scissors";
                break;
        }

        if (userScore < 5 && computerScore < 5) {
            const resultText = document.querySelector('.resultText');
            
            if (userSelection === computerSelection)   {
                resultText.textContent = "Tie!";
            } else if (userSelection === "rock" && computerSelection === "paper") {
                ++computerScore;
                scoreUpdater(computerScore, userScore);

                if (computerScore < 5 && userScore < 5) {
                    resultText.textContent = "You lose! Paper beats rock.";
                }
                else {
                    endResult(computerScore, userScore);
                    return;
                }
            } else if (userSelection === "rock" && computerSelection === "scissors") {
                ++userScore;
                scoreUpdater(computerScore, userScore);

                if (computerScore < 5 && userScore < 5) {
                    resultText.textContent = "You win! rock beats scissors.";
                } else {
                    endResult(computerScore, userScore);
                    return;
                }
            } else if (userSelection === "paper" && computerSelection === "rock") {
                ++userScore;
                scoreUpdater(computerScore, userScore);

                if (computerScore < 5 && userScore < 5) {
                    resultText.textContent = "You win! Paper beats rock.";
                } else {
                    endResult(computerScore, userScore);
                    return;
                }
            } else if (userSelection === "paper" && computerSelection === "scissors") {
                ++computerScore;
                scoreUpdater(computerScore, userScore);

                if (computerScore < 5 && userScore < 5) {
                    resultText.textContent = "You lose! Scissors beat paper.";

                } else {
                    endResult(computerScore, userScore);
                    return;
                }
            } else if (userSelection === "scissors" && computerSelection === "rock") {
                ++computerScore;
                scoreUpdater(computerScore, userScore);

                if (computerScore < 5 && userScore < 5) {
                    resultText.textContent = "You lose! rock beats scissors.";
                } else {
                    endResult(computerScore, userScore);
                    return;
                }
            } else  {
                ++userScore;
                scoreUpdater(computerScore, userScore);

                if (computerScore < 5 && userScore < 5) {
                    resultText.textContent = "You win! Scissors beat paper.";
                } else {
                    endResult(computerScore, userScore);
                    return;
                }
            }
        }
    }));
}

game();