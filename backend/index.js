require('dotenv').config()
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const usersRoute = require('./routes/usersRoute')
const messagesRoute = require('./routes/messagesRoute')
const {getUser,getUsers,createUser} = require('./controllers/usersController')
const socketio = require('socket.io')
const cors = require('cors')
const {Message} = require('./models/messageSchema')
const passport = require("passport");
const session = require("express-session");
const local = require("./strategies/local")
const localStrategy = require("./strategies/local")


const io = socketio(server,{
  cors:{
    origin:process.env.FRONTEND_URL
  }
})

app.use(express.json())
app.use(cors())

localStrategy(passport);

app.use(session({
  secret: "secret",
  resave: true,
  saveUninitialized: true,
}));

//passport midleware
app.use(passport.initialize())
app.use(passport.session())

app.use('/users/',usersRoute)
app.use('/messages/', messagesRoute)

io.on('connection', socket => {
  //"sent_message",senderId,receiverId,message
 
  console.log(socket.id)

   socket.on("sendMessage", async data => {
    
  await Message.create({
        senderId : data.senderId,
        receiverId : data.receiverId,
        content : data.content,
        sentDateAndTime : new Date()
  }).then(message => message)
    .catch(err => err)
    // console.log("message sent")
    
    await Message.find({
      $or: [
          { $and: [ { senderId: data.receiverId }, { receiverId: data.senderId } ] },
          { $and: [ { senderId: data.senderId }, { receiverId: data.receiverId } ] }
      ]
     })
      .then(messages => io.to(data.room).emit("getMessages", messages))
      .catch(err => err)
 
  })
  
  socket.on("join-room", room => {
    // if (room === "-") {
    //    console.log("room joined 2")
    // }
    socket.join(room);
    console.log("room2");
  })

})



const port = process.env.PORT || 4000;
server.listen(port)

