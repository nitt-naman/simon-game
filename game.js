
var level = 0;

var userClickedPattern = new Array;

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = new Array;

var numberOfClick = 0;

function nextSequence() {
    let randomNumber = Math.floor((Math.random() * 4));
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    level += 1;
    $("#level-title").text("Level" + level);
}




$("div[type|='button']").click(handler);

function handler() {
    var userChosenColour = this.id;
    if (level >= 1) {
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        numberOfClick += 1;
        let response = checkUserResponse();
        if (numberOfClick === level && response) {
            numberOfClick = 0;
            setTimeout(nextSequence, 500);
        }
        else if (numberOfClick > level || !response) startOver();
    }
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass('pressed');
    setTimeout(function () {
        $("#" + currentColour).removeClass('pressed');
    }, 100)
}

$(document).keypress(function () {
    if (level === 0) {
        nextSequence();
    }
})

function checkUserResponse() {
    var length1 = userClickedPattern.length;
    var length2 = gamePattern.length;
    let j = 0;
    let pos = (((level-1)*level)/2);
    for (let i = pos; i < length1; i++) {

        if (userClickedPattern[i] !== gamePattern[j++]) return false;
    }
    return true;
}

function startOver() {
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
        $("body").removeClass('game-over');
    }, 200)
    $('#level-title').text("Game Over, Press Any Key to Restart")
    level = 0;
    userClickedPattern = [];
    gamePattern = [];
    numberOfClick = 0;
}
