$(function (){

    const socket = io();


    //OBTAIN DOM CONTENT
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat  = $('#chat');

    const $nickForm = $('#nickForm');
    const $nickError = $('#nickError');
    const $nickName = $('#nickName');

    const $users = $('#userNames');
    

    $nickForm.submit(e=>{
        e.preventDefault();
        socket.emit('new user', $nickName.val(), data =>{
            if(data){
                $('#nickWrap').hide();
                $('#contentWrap').show();
            }else{
                $nickError.html(`
                    <div class="alert alert-danger">
                        That user already exists.
                    </div>
                `);
                $nickName.val('');
            }
        });
    })
    
    //EVENTS
    $messageForm.submit( (e)=>{
        e.preventDefault();
        socket.emit('send message', $messageBox.val())
        $messageBox.val('');
    })

    socket.on('new message', function(data) {
        $chat.append(data + '<br/>')
    })

    socket.on('usernames', data =>{
        let html = '';
        for(let i = 0; i < data.length; i++){
            html += `
                <p>
                <i class="fas fa-user"></i>
                ${data[i]}
                </p>
            `
        }
        $users.html(html);
    })

})