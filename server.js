// Team: Avengers
// Project Name: Upease
// Event: Equinox Hach-a-thon
// Server programming/Scripting by:  Syed Vilayat Ali Rizvi (Tech-Man)

// Importing express module
const express = require('express');
const mongoose = require("mongoose");
const app = express();

// Setting up Port
const PORT = process.env.PORT || 8080;


// Connecting to the Database
mongoose.connect('mongodb://localhost:27017/UserInfo', {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
.once('open', ()=>{
    console.log("Connected to the database!!");
}).on('err', (err)=>{
    console.log("error occured in db connection");
});





// Requiring routes and neccessary modules
app.use(express.static("static"));


// Handling post requests in the web application
app.use(express.urlencoded({extended: false}));


// Importing routes 
const account = require("./routes/Account.js");

// Setting up view engine for templating
app.set('view engine', 'views');
app.set('view engine', 'ejs');





// GET request to the home route
app.use('/', account);


// PORT Listening
app.listen(PORT, ()=>{
    console.log(`Server running at http://localhost:${PORT}/`);
});