const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);
const { MESSAGE_SENT, MESSAGE_RECEIVED, USER_CONNECTED, USER_DISCONNECTED, ALL_USER, ALIVE } = require('./src/Events');

var users = [];
var connections = [];

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
    console.log("Chat Server Started...");
});

app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/build/index.html');
});

io.sockets.on('connection', function (socket) {
    connections.push(socket);

    socket.on('disconnect', function (data) {
        //if (!socket.username) return;
        users.splice(users.indexOf(socket.username), 1);
        updateUsernames();
        connections.splice(connections.indexOf(socket), 1);
    });

    socket.on(ALIVE, (data) => {
        
    });

    //new user...
    socket.on(USER_CONNECTED, function (data) {
        socket.username = data;
        users.push(socket.username);
        updateUsernames();
    });

    //send Message...
    socket.on(MESSAGE_SENT, function (message) {
        const messageData = { message: message, username: socket.username, socketId: socket.id, timeStamp: new Date() };
        io.sockets.emit(MESSAGE_RECEIVED, messageData);
    });


    function updateUsernames() {
        io.sockets.emit(ALL_USER, users);
    }
});