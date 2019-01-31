const express = require('express');
const app = express();
const http = require('http').Server(app);
const path = require('path');
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendfile('index.html');
});

var clients = 0;
var users = [];
io.on('connection', function (socket) {
    console.log('A user connected: ' + socket.id);
    socket.available = true;
    users.push(socket);
    clients++;

    socket.on('findOpponent', function () {
        if (users.length) {
            for (const user of users) {
                if (user.id != socket.id && !user.available) {
                    console.log('FindOpponent');
                    user.available = false;
                    io.to('foundOpponent', user);
                }
            }
        }
    })
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

http.listen(3000, function () {
    console.log('listening on *:3000');
});