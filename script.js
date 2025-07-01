const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;
let highScore = 0;
let delay = 600;

document.addEventListener("keydown", () => {
  if (!started) {
    nextSequence();
    started = true;
  }
});

document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.textContent = document.body.classList.contains("dark") ? "☀️ Light" : "🌙 Dark";
});

document.getElementById("difficulty").addEventListener("change", (e) => {
  const value = e.target.value;
  delay = value === "easy" ? 800 : value === "medium" ? 600 : 400;
});

document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const userColor = btn.id;
    userPattern.push(userColor);
    playSound(userColor);
    animatePress(userColor);
    checkAnswer(userPattern.length - 1);
  });
});

function nextSequence() {
  userPattern = [];
  level++;
  document.getElementById("level-title").textContent = `Level ${level}`;
  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  setTimeout(() => {
    playSound(randomColor);
    animatePress(randomColor);
  }, delay);
}

function checkAnswer(index) {
  if (userPattern[index] === gamePattern[index]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 200);
    document.getElementById("level-title").textContent = "Game Over! Press A Key to Restart";

    if (level > highScore) {
      highScore = level - 1;
      document.getElementById("high-score").textContent = highScore;
    }

    resetGame();
  }
}

function playSound(name) {
  let audio;
  if (name === "wrong") {
    audio = new Audio("https://www.soundjay.com/button/sounds/beep-10.mp3");
  } else {
    audio = new Audio(`https://s3.amazonaws.com/freecodecamp/simonSound${buttonColors.indexOf(name) + 1}.mp3`);
  }
  audio.play();
}

function animatePress(color) {
  const activeButton = document.getElementById(color);
  activeButton.classList.add("pressed");
  setTimeout(() => activeButton.classList.remove("pressed"), 200);
}

function resetGame() {
  level = 0;
  gamePattern = [];
  started = false;
}
