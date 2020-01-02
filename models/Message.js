const mongoose = require("mongoose")

const Message = new mongoose.Schema({

    fullname:{type:String, default:"", required:true},
    email:{type:String, default:"", required:true},
    number:{type:Number, default:"", required:true},
    message:{type:String, default:"", required:true},


})

module.exports = mongoose.model("Message", Message)