module.exports = function(io){


    let nickNames = [];

    io.on('connection', socket=>{


        socket.on('new user', function(data, cb){
            console.log(data);
            
            if(nickNames.indexOf(data) != -1){
                cb(false);
            }else{
                cb(true);
                socket.nickName = data;
                nickNames.push(socket.nickName);
                updateNickNames();
            }
        });

        socket.on('send message', function(data){
            io.sockets.emit('new message', data)
        });

        socket.on('disconnect', data => {
            if(!socket.nickName){
                return;
            }else{
                nickNames.splice(nickNames.indexOf(socket.nickName), 1);
                updateNickNames();
            }
        })

        function updateNickNames(){
            io.sockets.emit('usernames', nickNames);
        }

    })
}