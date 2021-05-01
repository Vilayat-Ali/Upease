const express = require("express");
const router = express.Router();

// Importing models
const user = require("../Models/user.js");

router.use(express.urlencoded({extended: false}));

// Setting up routes 
router.get('/', (req,res)=>{
    res.render("index", {error1: "", error2: ""});
});

// Sing-up
router.post('/sign-up', async (req,res)=>{
    if(req.body.role == "--- Select Your Role ---"){
        const error = "Please leave no form-entry blank.";
        res.render('index', {error1: "", error2: error});
    }
    else{

        if(req.body.role == "Doctor"){
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
    res.render("profile", {username: req.body.fname});

}
});

//Sign-Up
router.post('/sign-in', (req,res)=>{
    var password = req.body.password;
    password = password.toString();

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
            for(el in data){
                usernames.push(data[el]["name"]);
                passGen.push(data[el]["pass"]);
            }
            for(el in data){
                console.log(el);
            }
            for(ele in usernames){
                if(usernames[el] === detail["username"] && passGen[el] === detail["password"]){
                    res.render("profile", {username: detail["username"]});
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




module.exports = router;