let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern = [];

let level = 0;
let gameStart = false;

$(document).on("keypress", function (event) {
  if (!gameStart) {
    $("#level-title").text("Level " + level);
    nextSequence();
    gameStart = true;

    /*
        My instructor angela code
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    */
  }
});

$(".btn").on("click", function () {
  let userButtonClicked = $(this);
  let userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userButtonClicked);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  let gameTitle = $("h1");
  $(gameTitle).text("Level " + level);
  let randomNumber = Math.floor(Math.random() * 4);
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

function playSound(name) {
  switch (name) {
    case "green":
      const green = new Audio("sounds" + "/" + name + ".mp3");
      green.play();
      break;
    case "red":
      const red = new Audio("sounds" + "/" + name + ".mp3");
      red.play();
      break;
    case "yellow":
      const yellow = new Audio("sounds" + "/" + name + ".mp3");
      yellow.play();
      break;
    case "blue":
      const blue = new Audio("sounds" + "/" + name + ".mp3");
      blue.play();
      break;
    default:
      console.log(name);
      break;
  }
}

function animatePress(currentButton) {
  $(currentButton).addClass("pressed");

  setTimeout(function () {
    $(currentButton).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    const wrong = new Audio("sounds/wrong.mp3");
    wrong.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  gameStart = false;
}
