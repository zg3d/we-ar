const mongoose = require('mongoose');



const userSchema = mongoose.Schema({

    email:{
        type: String,
        required:true
    },
    psw:{
        type:String,
        required:true
    }
    date:  {
        type: Date,
        default: Date.now;
    }






});