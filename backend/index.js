const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const usersRoute = require('./routes/usersRoute')
const messagesRoute = require('./routes/messagesRoute')
const {getUser,getUsers,createUser} = require('./controllers/usersController')
const socketio = require('socket.io')
const cors = require('cors')

app.use(express.json())
app.use(cors())

app.use('/users/',usersRoute)
app.use('/messages/',messagesRoute)

// const io = socketio(server,{
//   cors:{
//     origin:'http://localhost:3000'
//   }
// })

// io.on('connection', socket => {
//   console.log(socket.id)
// })

server.listen('4000')

