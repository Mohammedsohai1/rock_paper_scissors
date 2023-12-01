const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");
const header = document.querySelector(".header");
const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");
const resultnext = document.querySelector(".nextbtn");
const playAgainBtn = document.querySelector(".play-again");
const scoreNumber = document.querySelector(".score__number_yours");
const scoreNumberComputers = document.querySelector(".score__number_computers");

let yourScore = parseInt(localStorage.getItem("yourScore")) || 0;
let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

scoreNumber.innerText = yourScore;
scoreNumberComputers.innerText = computerScore;

function createRestartButton() {
  const centerContainer = document.createElement("div");
  centerContainer.style.display = "flex";
  centerContainer.style.flexDirection = "column";
  centerContainer.style.alignItems = "center";
  centerContainer.style.justifyContent = "center";
  centerContainer.style.height = "90vh";
  document.body.appendChild(centerContainer);



  const restartImage = document.createElement("img");
  restartImage.src = "images/group5new.png";
  restartImage.alt = "Restart Image";
  restartImage.style.width = "400px";
  restartImage.style.marginBottom = "0px";
  centerContainer.appendChild(restartImage);

  const heading = document.createElement("h1");
  heading.innerText = "HURRAY!!";
  heading.style.fontFamily = "inherit";
  heading.style.fontSize = "5rem";
  heading.style.color = "white";
  centerContainer.appendChild(heading);
  const heading2 = document.createElement("h1");
  heading2.innerText = "you won the game";
  heading2.style.fontFamily = "inherit";
  heading2.style.fontSize = "2rem";
  heading2.style.color = "white";
  centerContainer.appendChild(heading2);


  const restartButton = document.createElement("button");
  restartButton.classList.add("restart-btn");
  restartButton.innerText = "Restart";
  restartButton.style.background = "#fff";
  restartButton.style.outline = "none";
  restartButton.style.border = "2px solid transparent";
  restartButton.style.borderRadius = "0.6rem";
  restartButton.style.color = "#252525";
  restartButton.style.padding = "0.6rem 3.5rem";
  restartButton.style.fontFamily = "inherit";
  restartButton.style.textTransform = "inherit";
  restartButton.style.fontSize = "1.3rem";
  restartButton.style.letterSpacing = "0.1em";
  restartButton.style.cursor = "pointer";
  centerContainer.appendChild(restartButton);

  restartButton.addEventListener("click", () => {
    location.reload();
  });
}


choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aiChoice = aiChoose();
  displayResults([choice, aiChoice]);
  displayWinner([choice, aiChoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    setTimeout(() => {
      resultDiv.innerHTML = `
        <div class="choice ${results[idx].name}">
          <img src="images/icon-${results[idx].name}.png" alt="${results[idx].name}" />
        </div>
      `;
    }, idx * 1000);
  });

  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");
}

resultnext.classList.toggle("hidden");

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());

    if (userWins) {
      resultText.innerText = "You win";
      resultDivs[0].classList.toggle("winner");
      resultnext.classList.toggle("hidden");
      keepScore(1, 0);
    } else if (aiWins) {
      resultText.innerText = "You lose";
      resultDivs[1].classList.toggle("winner");
      keepScore(0, 1);
    } else {
      resultText.innerText = "Draw";
    }

    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(yourPoint, computerPoint) {
  yourScore += yourPoint;
  computerScore += computerPoint;

  localStorage.setItem("yourScore", yourScore);
  localStorage.setItem("computerScore", computerScore);

  scoreNumber.innerText = yourScore;
  scoreNumberComputers.innerText = computerScore;
}

playAgainBtn.addEventListener("click", () => {
  gameDiv.classList.toggle("hidden");
  resultsDiv.classList.toggle("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.toggle("hidden");
  resultsDiv.classList.toggle("show-winner");
  resultnext.classList.add("hidden");
});


btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

resultnext.addEventListener("click", () => {

  gameDiv.classList.add("hidden");
  resultsDiv.classList.add("hidden");
  resultnext.classList.add("hidden");
  header.classList.toggle("hidden");


  playAgainBtn.classList.remove("hidden");
  createRestartButton();
});


