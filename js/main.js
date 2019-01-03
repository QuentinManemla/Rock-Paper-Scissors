var selected = false;
var items = ["#rock", "#paper", "#scissors"];

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function fight() {
    var i = getRandomInt(3);
    return items[i];
}

function display(player, winner) {
    winner_img = winner.substr(1, winner.length) + ".svg";
    $("#winner").attr("src",winner_img);
    $( "#item-winner" ).removeClass("hide").addClass("col-6 col-md-6");

    winner = winner.substr(1, winner.length);
    if (player == winner)
        $("#item-title").text("Draw");
    else if (player == "rock" && winner == "paper") {
        $("#item-title").text("You Lose");
        lose();
        }
    else if (player == "rock" && winner == "scissors"){
        $("#item-title").text("You Win");
        win();
        }
    else if (winner == "rock" && player == "scissors"){
        $("#item-title").text("You Lose");
        lose();
        }
    else if (winner == "scissors" && player == "rock"){
        $("#item-title").text("You Lose");
        lose();
        }
    else if (player == "paper" && winner == "rock"){
        $("#item-title").text("You Win");
        win();
        }
    else if (player == "scissors" && winner == "paper"){
        $("#item-title").text("You Win");
        win();
        }
    else if (winner == "scissors" && player == "paper"){
        $("#item-title").text("You Lose");
        lose();
        }
}
/**
 * Hover Triggers
 */
$( "#rock" ).mouseover(function() {
    var audio = document.getElementById("rock-audio");
    audio.play();
    if (!selected){
        $("#item-title").text("Rock");
    }
});
$( "#paper" ).mouseover(function() {
    var audio = document.getElementById("paper-audio");
    audio.play();
    if (!selected){
    $("#item-title").text("Paper");
    }
});
$( "#scissors" ).mouseover(function() {
    var audio = document.getElementById("scissors-audio");
    audio.play();
    if (!selected){
    $("#item-title").text("Scissors");
    }
});

/**
 * Click Events
 */
$( "#rock" ).click(function() {
    $( "#item-rock" ).removeClass("col-4 col-md-4").addClass("col-6 col-md-6");
    $( "#item-paper" ).addClass("hide");
    $( "#item-scissors" ).addClass("hide");
    selected = true;
    var winner = fight();
    for (var i = 0; i < items.length;  i++) {
        if (items[i] != "#rock") {
            $(items[i]).hide();
        }
    }
    display("rock",winner);
});

$( "#paper" ).click(function() {
    $( "#item-paper" ).removeClass("col-4 col-md-4").addClass("col-6 col-md-6");
    $( "#item-rock" ).addClass("hide");
    $( "#item-scissors" ).addClass("hide");
    selected = true;
    var winner = fight();
    for (var i = 0; i < items.length;  i++) {
        if (items[i] != "#paper") {
            $(items[i]).hide();
        }
    }
    display("paper", winner);
});

$( "#scissors" ).click(function() {
    $( "#item-scissors" ).removeClass("col-4 col-md-4").addClass("col-6 col-md-6");
    $( "#item-paper" ).addClass("hide");
    $( "#item-rock" ).addClass("hide");
    selected = true;
    var winner = fight();
    for (var i = 0; i < items.length;  i++) {
        if (items[i] != "#scissors") {
            $(items[i]).hide();
        }
    }
    display("scissors", winner);
});