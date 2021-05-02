// Team: Avengers
// Project Name: Upease
// Event: Equinox Hach-a-thon
// Server programming/Scripting by:  Syed Vilayat Ali Rizvi (Tech-Man)

// Importing express module
const express = require('express');
const mongoose = require("mongoose");
const http = require('http');
const app = express();
const socket = require('socket.io');

const username = require('./routes/Account.js');
const messageUser = username.username;

// Setting up Port
const PORT = process.env.PORT || 8080;

// Creating server connection
const server = http.createServer(app);
const io = socket(server);

// Connecting to the Database
mongoose.connect('mongodb://localhost:27017/UserInfo', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
.once('open', ()=>{
    console.log("Connected to the database!!");
}).on('err', (err)=>{
    console.log("error occured in db connection");
});



// Checking for socket connection
io.on('connection', (socket)=>{

    console.log("user online!");

// For getting and receiving the data
    socket.on('textmessage', (mesg)=>{
        io.emit('Message', mesg);
        console.log(mesg);
    })
});


// Requiring routes and neccessary modules
app.use(express.static("static"));


// Handling post requests in the web application
app.use(express.urlencoded({extended: false}));


// Importing routes 
const account = require("./routes/Account.js");
const chat = require("./routes/chat.js");

// Setting up view engine for templating
app.set('view engine', 'views');
app.set('view engine', 'ejs');





// GET request to the home route
app.use('/', account);
app.use('/chat', chat);


// PORT Listening
server.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}/`);
});