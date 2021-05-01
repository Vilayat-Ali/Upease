const express = require("express");
const route = express.Router();

// Setting up route for address => '/Account/Doc'

route.get('/', function (req, res){
    res.render("profile");
});

// Exporting route 
module.exports = route