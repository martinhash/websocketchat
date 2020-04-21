$(function (){

    const socket = io();


    //OBTAIN DOM CONTENT
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat  = $('#chat');

    //EVENTS
    $messageForm.submit( (e)=>{
        e.preventDefault();
        socket.emit('send message', $messageBox.val())
        $messageBox.val('');
    })

    socket.on('new message', function(data) {
        $chat.append(data + '<br/>')
    })


})