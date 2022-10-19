const mongoose = require('../config/db_connection')

const {Schema,model} = mongoose

const messageSchema = new Schema({
    senderId : {
        type:String,
        required:true
    },
    receiverId : {
        type:String,
        required:true
    },
    content : {
        type : String,
        required:true
    },
    sentDateAndTime : {
        type:Date,
        required:true
    }
})

const Message = model('Message',messageSchema)

module.exports = {Message}