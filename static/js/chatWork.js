const sendBtn = document.getElementById('send');
const socket = io();

socket.on('Message', function(message){
    postMessage(message);
})


function sendMessage(){
    const Message = document.querySelector('#message').value;

    socket.emit('textmessage', Message);

    document.querySelector('#message').value = "";

    console.log(Message);
}

function postMessage(message, username){

    console.log(username);

    const screen = document.querySelector('#messageScreen');
    
    const messagez = document.createElement('div');
    messagez.className = "msg_container";
    
    var userCol = document.createTextNode('Message: ');
    messagez.appendChild(userCol);

    var messageSyn = document.createTextNode(message);
    messagez.appendChild(messageSyn);

    screen.append(messagez);
}