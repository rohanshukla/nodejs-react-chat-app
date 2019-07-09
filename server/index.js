var express = require('express');
const cors = require('cors');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
const { MESSAGE_SENT, MESSAGE_RECEIVED, USER_CONNECTED, USER_DISCONNECTED } = require('../src/Events');

var users = [];
var connections = [];

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log("Chat Server Started...");
});

app.use(cors());

app.get('/', function (require, res) {
    res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
    connections.push(socket);
    console.log("Connections : %s sockets Connected", connections.length);

    socket.on('disconnect', function (data) {
        //if (!socket.username) return;
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
        console.log("Disconnected : %s sockets Connected", connections.length);
    });


    //send Message...
    socket.on(MESSAGE_SENT, function (message) {
        io.sockets.emit(MESSAGE_RECEIVED, { message: message, user: socket.user });
    });


    //new user...
    socket.on(USER_CONNECTED, function (data) {
        socket.user = data;
        users.push(socket.user);
        updateUsernames();
    });


    function updateUsernames() {
        // io.sockets.emit('get users', users);
        console.log(users);
    }
});