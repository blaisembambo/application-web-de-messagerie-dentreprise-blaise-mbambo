const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const socketio = require('socket.io')

const io = socketio(server,{
  cors:{
    origin:'http://localhost:3000'
  }
})

io.on('connection', socket => {
  console.log(socket.id)
})

server.listen('4000')

