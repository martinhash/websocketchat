module.exports = function(io){
    io.on('connection', socket=>{

        socket.on('send message', function(data){
            io.sockets.emit('new message', data)
        })

    })
}