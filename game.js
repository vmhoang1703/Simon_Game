var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function() {
    if ( !started ){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    makeSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
 });

 function checkAnswer(currentLevel) {
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userClickedPattern.length === gamePattern.length) {
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
            nextSequence();
          }, 1000);
        }
    } else {
        makeSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
        setTimeout(function() {
            $("body").removeClass("game-over");
        },100);
        startOver();
    }
}

function nextSequence() {
    //6. Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    makeSound(randomChosenColour);
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}

function makeSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
  
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 200);
  }

