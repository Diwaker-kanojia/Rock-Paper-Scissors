let container = document.querySelector(".container");
let weaponBox = document.querySelector(".weapon-box");
let playerChoicesBox = container.querySelector(".player-choices");
let weapons = weaponBox.querySelectorAll(".weapons div");
let player = playerChoicesBox.querySelector(".player-choice img");
let computer = playerChoicesBox.querySelector(".computer-choice img");
let resultBox = container.querySelector(".result-box");
let resultText = resultBox.querySelector("h3");
let playAgainBtn = resultBox.querySelector("button");
let computerChoices = ["Rock", "Paper", "Scissors"];
let wonValueText = document.querySelector(".score-box .won h3 span");
let lostValueText = document.querySelector(".score-box .lost h3 span");
let drawValueText = document.querySelector(".score-box .draw h3 span");

let won = localStorage.getItem("won")
  ? parseInt(localStorage.getItem("won"))
  : 0;
let lost = localStorage.getItem("lost")
  ? parseInt(localStorage.getItem("lost"))
  : 0;
let draw = localStorage.getItem("draw")
  ? parseInt(localStorage.getItem("draw"))
  : 0;

// Update UI with saved values
wonValueText.innerHTML = won;
lostValueText.innerHTML = lost;
drawValueText.innerHTML = draw;

let outcomes = {
  RockRock: "Draw",
  RockPaper: "Computer",
  RockScissors: "You",
  PaperPaper: "Draw",
  PaperRock: "You",
  PaperScissors: "Computer",
  ScissorsScissors: "Draw",
  ScissorsRock: "Computer",
  ScissorsPaper: "You",
};

for (let i = 0; i < weapons.length; i++) {
  weapons[i].addEventListener("click", (e) => {
    player.src = "assets/Rock.png";
    computer.src = "assets/Rock.png";
    weaponBox.style.display = "none";
    playerChoicesBox.style.display = "block";

    setTimeout(() => {
      playerChoicesBox.classList.add("active");
    }, 1000);

    setTimeout(() => {
      let playerChoice = playerChoicesBox.querySelectorAll("div");
      for (let i = 0; i < playerChoice.length; i++) {
        playerChoice[i].style.animationPlayState = "paused";
      }

      player.src = e.target.src;

      let randomChoice =
        computerChoices[Math.floor(Math.random() * computerChoices.length)];
      computer.src = `assets/${randomChoice}.png`;

      let userChoice = e.target.parentElement.className;
      let outcomeValue = outcomes[userChoice + randomChoice];

      showResult(outcomeValue);
    }, 3000);
  });
}

let showResult = (result) => {
  container.style.height = "415px";
  resultBox.style.display = "block";

  if (result === "You") {
    resultText.innerHTML = "Congrats, You Won! &#x1F389;";
    won++;
    wonValueText.innerHTML = won;
    localStorage.setItem("won", won);
  } else if (result === "Computer") {
    resultText.innerHTML = "You Lost!";
    lost++;
    lostValueText.innerHTML = lost;
    localStorage.setItem("lost", lost);
  } else {
    resultText.innerHTML = "Match Draw!";
    draw++;
    drawValueText.innerHTML = draw;
    localStorage.setItem("draw", draw);
  }
};

playAgainBtn.addEventListener("click", () => {
  playerChoicesBox.classList.remove("active");
  container.style.height = "380px";
  resultBox.style.display = "none";
  weaponBox.style.display = "block";
  playerChoicesBox.style.display = "none";

  let playerChoice = playerChoicesBox.querySelectorAll("div");
  for (let i = 0; i < playerChoice.length; i++) {
    playerChoice[i].style.animationPlayState = "running";
  }
});
