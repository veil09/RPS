const maxWins = 10;

const rock = document.getElementById("rock");
const paper = document.getElementById("paper");
const scissor = document.getElementById("scissor");
const won = document.getElementById("won");
const cwon = document.getElementById("cwon");
const uwon = document.getElementById("uwon");
const tie = document.getElementById("tie");

let cwins = 0;
let uwins = 0;
let ties = 0;

const ai = () => {
  const choices = ["rock", "paper", "scissor"];
  const randomChoice = choices[Math.floor(Math.random() * choices.length)];

  // Set the computer's choice emoji based on the random choice
  let computerEmoji = "";
  switch (randomChoice) {
    case "rock":
      computerEmoji = "🤛";
      break;
    case "paper":
      computerEmoji = "✋";
      break;
    case "scissor":
      computerEmoji = "✌️";
      break;
  }

  // Display the computer's choice emoji
  document.getElementById("computer").innerHTML = computerEmoji;

  return randomChoice;
};

const win = (userChoice, computerChoice) => {
  const outcomes = {
    rock: { beats: "scissor", message: "Rock smashes Scissors" },
    paper: { beats: "rock", message: "Paper covers Rock" },
    scissor: { beats: "paper", message: "Scissors cut Paper" },
  };

  if (userChoice === computerChoice) {
    won.innerHTML = "Tie 😐";
    ties++;
  } else if (outcomes[userChoice].beats === computerChoice) {
    won.innerHTML = `You 🫵 Won - ${outcomes[userChoice].message}`;
    uwins++;
    window.navigator.vibrate(150);
  } else {
    won.innerHTML = `Computer Won 😔 - ${outcomes[computerChoice].message}`;
    cwins++;
  }

  cwon.textContent = `Computer Wins - ${cwins}`;
  tie.textContent = `Ties - ${ties}`;
  uwon.textContent = `Your Wins - ${uwins}`;

  if (cwins === maxWins || uwins === maxWins) {
    endGame();
  }
};

const isGameOver = () => {
  return cwins === maxWins || uwins === maxWins;
};

const endGame = () => {
  let message = "";
  if (cwins === maxWins) {
    message = "Computer wins the game!";
  } else if (uwins === maxWins) {
    message = "You win the game!";
  } else {
    message = "It's a tie game!";
  }

  alert(`Game Over! ${message}`);
};

const restartButton = document.getElementById("restartButton");
restartButton.addEventListener("click", () => {
  restartGame();
});

const restartGame = () => {
  cwins = 0;
  uwins = 0;
  ties = 0;
  cwon.textContent = `Computer Wins - ${cwins}`;
  tie.textContent = `Ties - ${ties}`;
  uwon.textContent = `Your Wins - ${uwins}`;
  won.innerHTML = "Result(0)";
  you.innerHTML = "";
  computer.innerHTML = "";

  rock.disabled = false;
  paper.disabled = false;
  scissor.disabled = false;
};

rock.addEventListener("click", () => {
  if (isGameOver()) return;
  you.innerHTML = "🤛";
  you.style.cssText = "transform: rotate(0deg)";

  const computerChoice = ai();
  win("rock", computerChoice);
});

paper.addEventListener("click", () => {
  if (isGameOver()) return;
  you.innerHTML = "✋";
  you.style.cssText = "transform: rotate(0deg)";

  const computerChoice = ai();
  win("paper", computerChoice);
});

scissor.addEventListener("click", () => {
  if (isGameOver()) return;
  you.innerHTML = "✌️";
  you.style.cssText = "transform: rotate(0deg)";

  const computerChoice = ai();
  win("scissor", computerChoice);
});
