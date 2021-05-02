const sendBtn = document.getElementById('send');
const socket = io();

// Getting username 
const username = Qs.parse(location.search, {ignoreQueryPrefix: true});
console.log(username, room);


// Join username
socket.emit('joinRoom', username);

socket.on('Message', (Message)=>{
    postMessage(Message);
})


function sendMessage(){
    const Message = document.querySelector('#message').value;

    socket.emit('textmessage', Message);

    document.querySelector('#message').value = "";

    console.log(Message);
}

function postMessage(message){
    const messageBody  = document.createElement("div");
    messageBody.className = "msg_cotainer";
    const name = document.createTextNode("YOU: ");
    messageBody.appendChild(name);
    const messageNow = document.createTextNode(message);
    messageBody.appendChild(messageNow);
    var screen = document.getElementById('messageScreen');
    screen.appendChild(messageBody);
}