const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Schema = mongoose.Schema;
// creating a new Schema
const connect = mongoose.createConnection(process.env.URI);
autoIncrement.initialize(connect);

const UserSchema = new Schema({
    _id:{
        type: Number,
        required: true
    },
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

UserSchema.plugin(autoIncrement.plugin, 'Users')
// exporting the module
module.exports = connect.model('Users',UserSchema);