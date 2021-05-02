const express = require("express");
const router = express.Router();
const account = require("./Account.js");
const username = account.username;

// Importing chat model schema  
const chatModel = require("../Models/chat");

router.get('/', (req,res)=>{
    const username = account.username;
    res.render("chat", {username: username});
    console.log(username);
});

module.exports = router;