const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

io.on('connection', socket=>{
    console.log("New user connected");
})


//STATIC FILES
app.use(express.static('public'));

//START SERVER
server.listen(3000, ()=>{
    console.log("Server on port: 3000");
})

