var selected = false;
var items = ["#rock", "#paper", "#scissors"];

var socket = io();

socket.on('userExists', function () {
    $('#socket-error').empty();
    $('#socket-error').append('That Username is Taken');
});

socket.on('foundOpponent', function (data) {
    $('#opponent-status').empty();
    $('#opponent-status').append('You are up against ' + data);
});

socket.on('startGame', function () {
    $('#submit-btn').addClass("hide");
    $('#username').addClass("hide");
    $('#items-container').removeClass("hide");
    $('#opponent-status').removeClass("hide");
    $('#item-title').empty();
    $('#item-title').append('Pick your Weapon');
    socket.emit('findOpponent');
});

$("#submit-btn").click(function () {
    $('#socket-error').empty();
    socket.emit('setUsername', document.getElementById('username').value);
});

socket.on('display', function(data) {
    display(data.player, data.opponent);
})

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function fight() {
    var i = getRandomInt(3);
    return items[i];
}

function display(player, winner) {
    console.log('Player: ' + player + ' Opponent: ' + winner);
    winner_img = winner.substr(0, winner.length) + ".svg";
    $("#winner").attr("src", winner_img);
    $("#item-winner").removeClass("hide").addClass("col-6 col-md-6");
    $("#item-title").empty();

    winner = winner.substr(0, winner.length);
    if (player == winner)
        $("#item-title").text("Draw");
    else if (player == "rock" && winner == "paper") {
        $("#item-title").text("You Lose");
    } else if (player == "rock" && winner == "scissors") {
        $("#item-title").text("You Win");
    } else if (winner == "rock" && player == "scissors") {
        $("#item-title").text("You Lose");
    } else if (winner == "scissors" && player == "rock") {
        $("#item-title").text("You Lose");
    } else if (player == "paper" && winner == "rock") {
        $("#item-title").text("You Win");
    } else if (player == "scissors" && winner == "paper") {
        $("#item-title").text("You Win");
    } else if (winner == "scissors" && player == "paper") {
        $("#item-title").text("You Lose");
    }
}

/**
 * Click Events
 */
$("#rock").click(function () {
    $("#item-rock").removeClass("col-4 col-md-4").addClass("col-6 col-md-6");
    $("#item-paper").addClass("hide");
    $("#item-scissors").addClass("hide");
    socket.emit('makeSelection', {selection: 'rock'});
});

$("#paper").click(function () {
    $("#item-paper").removeClass("col-4 col-md-4").addClass("col-6 col-md-6");
    $("#item-rock").addClass("hide");
    $("#item-scissors").addClass("hide");
    socket.emit('makeSelection', {selection: 'paper'});
});

$("#scissors").click(function () {
    $("#item-scissors").removeClass("col-4 col-md-4").addClass("col-6 col-md-6");
    $("#item-paper").addClass("hide");
    $("#item-rock").addClass("hide");
    socket.emit('makeSelection', {selection: 'scissors'});
});