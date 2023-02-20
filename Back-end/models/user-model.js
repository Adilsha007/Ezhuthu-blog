const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    fullname: {
        type : String,
        default: 'Add your name'
    },
    phoneno: {
        type : Number,
        default: 0123456789,
        unique: true
    },
    email : {
        type : String,
        unique : true,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role : {
        type: String,
        enum: ['user','admin'],
        default: 'user',
    },
    gender: {
        type: String,
        default: 'your gender'
    },
    posts: [
        {
            title:{
                type:String,
                unique: true
            },
            subtitle: {
                type: String,
                unique: true,
            },
            description: String
        }
    ]
})

const userModel = mongoose.model('user',userSchema);

module.exports = userModel;
