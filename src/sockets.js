module.exports = function(io){


    let users = {};

    io.on('connection', socket=>{


        socket.on('new user', function(data, cb){
            console.log(data);
            
            if(data in users){
                cb(false);
            }else{
                cb(true);
                socket.nickName = data;
                users[socket.nickName] = socket;
                updateNickNames();
            }
        });

        socket.on('send message', data => {

            const message = data.trim();

            if(message.substr(0, 3) === '/p '){
                message = message.substr(3);
                const index = message.indexOf(' ');
                if(index === -1){
                    var name = message.substr(0, index);
                    var message = message.substr(index + 1);

                }
            }


            io.sockets.emit('new message', {
                msg: data,
                nick: socket.nickName
            });
        });

        socket.on('disconnect', data => {
            if(!socket.nickName){
                return;
            }else{
                delete users[socket.nickName];
                updateNickNames();
            }
        })

        function updateNickNames(){
            io.sockets.emit('usernames', nickNames);
        }

    })
}