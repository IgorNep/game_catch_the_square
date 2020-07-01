//define DOM vars
$startBtn = document.querySelector("#start");
$game = document.querySelector("#game");
$time = document.querySelector("#time");
$timeHeader = document.querySelector("#time-header");
$resultHeader = document.querySelector("#result-header");
$result = document.querySelector("#result");
$gameTime = document.querySelector("#game-time");

let score = 0;
let isGameStarted = false;

//add event listener on click start
$startBtn.addEventListener("click", startGame);
//event listener on input time
$gameTime.addEventListener("input", () => {
  show($timeHeader);
  hide($resultHeader);
  $time.textContent = parseFloat($gameTime.value).toFixed(1);
});

//start game
function startGame() {
  score = 0;
  hide($startBtn);
  show($timeHeader);
  hide($resultHeader);
  $game.style.backgroundColor = "#fff";
  $gameTime.setAttribute("disabled", true);
  let interval = setInterval(() => {
    let time = parseFloat($time.textContent);
    $time.textContent = (time - 0.1).toFixed(1);
    if (time <= 0) {
      //end game
      clearInterval(interval);
      endGame();
    } else {
    }
  }, 100);
  renderBox();
}
//show element
function show($el) {
  $el.classList.remove("hide");
}
//hide element
function hide($el) {
  $el.classList.add("hide");
}
//end game
function endGame() {
  $game.innerHTML = "";
  show($resultHeader);
  hide($timeHeader);
  $result.textContent = score;
  show($startBtn);
  $game.style.backgroundColor = "#ccc";
  $gameTime.removeAttribute("disabled");
  $time.textContent = $gameTime.value;
}

//rendering boxes
function renderBox() {
  $game.innerHTML = "";
  let box = document.createElement("div");
  let boxSize = getRandom(30, 100);
  let gameSize = $game.getBoundingClientRect();
  let maxTop = gameSize.height - boxSize;
  let maxLeft = gameSize.width - boxSize;
  box.style.width = box.style.height = boxSize + "px";
  box.style.backgroundColor = `rgb(
      ${getRandom(0, 255)},
      ${getRandom(0, 255)},
      ${getRandom(0, 255)}
  )`;
  box.style.cursor = "pointer";
  box.style.position = "absolute";
  box.style.left = getRandom(0, maxLeft) + "px";
  box.style.top = getRandom(0, maxTop) + "px";
  box.setAttribute("data-box", true);
  $game.insertAdjacentElement("afterbegin", box);
}
//set score
function increaseScore() {
  score++;
}
//game event listener for box
$game.addEventListener("click", (e) => {
  if (e.target.dataset.box) {
    increaseScore();
    renderBox();
  }
});

//get random numbers
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
