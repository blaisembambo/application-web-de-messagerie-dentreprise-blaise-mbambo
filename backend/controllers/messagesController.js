const {Message} = require('../models/messageSchema')

const getMessage = (req,res) => {
    Message.findById(req.params.id)
        .then(message => res.json(message))
        .catch(err => res.json(err))
}

const getMessages = (req,res) => {
    Message.find(req.body)
        .then(messages => res.json(messages))
        .catch(err => res.json(err))
}

const createMessage = (req,res) => {
    Message.create({
        senderId : req.body.senderId,
        receiverId : req.body.receiverId,
        content : req.body.content,
        sentDateAndTime : new Date()
    }).then(message => res.json(message))
    .catch(err  => res.json(err))
}

module.exports = {getMessage,getMessages,createMessage}