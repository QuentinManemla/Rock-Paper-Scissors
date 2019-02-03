const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
var io = require('socket.io').listen(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});


var clients = 0;
var users = [];
io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    var user = socket;
    user.available = true;
    user.selection = '';
    user.opponent = '';
    users.push(socket);
    clients++;

    socket.on('findOpponent', function () {
        if (users.length) {
            for (const user of users) {
                if (user.id != socket.id && user.available && user.username) {
                    socket.emit('foundOpponent', user.username);
                    for (const user2 of users) {
                        if (user2.id == socket.id) {
                            user2.opponent = user.username;
                            user.opponent = user2.username;
                            io.to(user.id).emit('foundOpponent', user2.username);
                        }
                    }
                }
            }
        }
    })

    socket.on('makeSelection', function(data) {
        for (const user of users) {
            if (user.id == socket.id) {
                user.selection = data.selection;
                for (const opponent of users) {
                    if (opponent.username == user.opponent && opponent.selection) {
                        socket.emit('display', {player: user.selection, opponent: opponent.selection})
                        io.to(opponent.id).emit('display', {player: opponent.selection, opponent: user.selection});
                    }
                }
            }
        }
    });

    socket.on('setUsername', function (data) {
        console.log('New User:' + data);
        for (const user of users) {
            if (user.id == socket.id && user.username != data) {
                user.username = data;
                socket.emit('startGame');
            }
        }
    })

    socket.on('disconnect', function () {
        for (const user of users) {
            if (user.id == socket.id)
                users.splice(users.indexOf(user), 1);
        }
        clients--;
        // if (users.length) {
        //     for (const user of users)
        //         io.to(user.id).emit('clientAction', {
        //             clientCount: users.length
        //         });
        // }
        console.log('A user disconnected');
    });
});

http.listen(process.env.PORT || 3000);