const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    }
})

const postModel = mongoose.model('post',postSchema);

module.exports = postModel;
