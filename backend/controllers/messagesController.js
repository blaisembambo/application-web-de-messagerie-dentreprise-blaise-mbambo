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

const getUserAllMessages = (req,res) => {
    Message.find({ $or: [ { senderId: req.body.userId}, { receiverId: req.body.userId } ] } )
        .then(messages => res.json(messages))
        .catch(err => res.json(err))
}

const getConversion = (req,res) => {
    Message.find({
        $or: [
            { $and: [ { senderId: req.body.receiverId }, { receiverId: req.body.senderId } ] },
            { $and: [ { senderId: req.body.senderId }, { receiverId: req.body.receiverId } ] }
        ]
    })
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

module.exports = {getMessage,getMessages,createMessage,getConversion,getUserAllMessages}