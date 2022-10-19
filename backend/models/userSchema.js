const mongoose = require('../config/db_connection')

const {Schema,model} = mongoose

const userSchema = new Schema({
    firstName : {
        type:String,
        required:true
    },
    lastName : {
        type:String,
        required:true
    },
    image : {
        type:String,
        required:false
    },
    email : {
        type:String,
        required:true
    },
    password : {
        type:String,
        required:true
    }
})

const User = model("User",userSchema);

module.exports = {User}
