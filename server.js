const express = require('express');
const app = express();
// Port
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) =>{
    res.send("This is index page!!");
});

app.listen(PORT);