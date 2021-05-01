const express = require("express");
const router = express.Router();

// Importing chat model schema  
const chatModel = require("../Models/chat");

router.get('/', (req,res)=>{
    res.render("chat");
});
