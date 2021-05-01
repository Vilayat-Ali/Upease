const mongoose = require('mongoose');

const chatSchema = mongoose.Schema({
    dateSent:{
        type: Date,
        default: Date.now
    },
    message: {
        type: String
    },
    img: {
        type: String
    },
});

module.exports = mongoose.model('chat', chatSchema);