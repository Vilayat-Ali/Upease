const express = require("express");
const router = express.Router();

const upload = require("express-fileupload");
let userNameRoom = undefined;

// Importing models
const user = require("../Models/user.js");

router.use(express.urlencoded({extended: false}));

// Setting up routes 
router.get('/', (req,res)=>{
    res.render("index", {error1: "", error2: ""});
});


router.post('/', async(req,res)=>{
    const role = req.body.role;
    if(role == "--- Select Your Role ---"){
        const error = "Please leave no form-entry blank.";
        res.render('index', {error1: "", error2: error});
    }
    else{

        if(role == "Doctor"){
            const callName = "Dr "+req.body.fname;
            const userDB = new user({
                name: req.body.fname,
                email: req.body.email,
                pass: req.body.password,
                role: req.body.role,
                callName: callName
            });
            await userDB.save();
        }
        
        else{
        const userDB = new user({
        name: req.body.fname,
        email: req.body.email,
        pass: req.body.password,
        role: req.body.role
    });
    await userDB.save();
        }
    res.render("profile", {username: req.body.fname, userrole: role, useremail: req.body.email});
    userNameRoom = req.body.fname;
}
});

router.post('/sign-in', (req,res)=>{
    var password = req.body.password;

    const detail = {
        username: req.body.username,
        password: password
    
    }

    // Validating
    user.find({}, (err, data)=>{
        if(err){throw err}
        else{
            var usernames = [];
            var passGen = [];
            var fcount = 0;
            var role = undefined;
            var email = undefined;

            for(el in data){
                usernames.push(data[el]["name"]);
                passGen.push(data[el]["pass"]);
            }
            for(el in data){
                if(usernames[el] === detail["username"] && passGen[el] === detail["password"]){
                    role = data[el]["role"];
                    email = data[el]["email"];
                }
            }
            for(ele in usernames){
                if(usernames[el] === detail["username"] && passGen[el] === detail["password"]){
                    res.render("profile", {username: detail["username"],
                userrole: role, 
                useremail: email
                });
                }
                else{
                    fcount+=1;
                }
            }

            if(fcount==usernames.length){
                const error = "Invalid username or password.";
                res.render('index', {error1: error, error2: ""});
            }
           }
    })
       
});

router.get('/profile', (req,res)=>{
    res.render("profile", {username: req.body.fname, userrole: role, useremail: req.body.email});
    userNameRoom = req.body.fname;
});




 
module.exports.username = userNameRoom;
module.exports = router;