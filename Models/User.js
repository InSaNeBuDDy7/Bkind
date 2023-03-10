const mongoose = require('mongoose');
const User = new mongoose.Schema({
    FullName : {
        type : String,
        required : true,
        maxlength : 20
    },
    UserName : {
        type : String,
        required : true,
        maxlen : 20
    },
    Email : {
        type : String,
        required : true,
    },
    Password : {
        type : String,
        required : true
    }
})
module.exports = mongoose.model('UserModel',User)