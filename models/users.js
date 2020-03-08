const mongoose = require('mongoose');



const UserSchema = mongoose.Schema({
    Nickname:{
        type: String,
        required:true
    },
    Email:{
        type: String,
        required:true
    },
    Psw:{
        type:String,
        required:true
    },
    Date:  {
        type: Date,
        default: Date.now
    },
    BodyT:{
        type :String,
        default: "average"
    },
    Style:{
        type:String,
        required:true

    }


});

module.exports = mongoose.model('Users',UserSchema);