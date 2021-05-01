const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    pass:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
    callName:{
        type: String
    }
}, {collection: 'users'});

module.exports = mongoose.model('userInfo', userSchema);