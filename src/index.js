const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

require('./sockets')(io);


//STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//START SERVER
server.listen(3000, ()=>{
    console.log("Server on port: 3000");
})

