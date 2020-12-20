const express = require('express')
const morgan = require('morgan')
const routing = require('./routing/index')
const cors = require('cors')
const app = express()
const passport = require('passport')

app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routing)

const port = 8805
const httpServer = require("http").createServer(app);

const io = require('socket.io')(httpServer);
io.on('connection', function(socket) {
  console.log('Client connected to the WebSocket');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  socket.on('chat message', function(msg) {
    console.log("Received a chat message");
    io.emit('chat message', msg);
  });
})

httpServer.listen(port,() => {
    console.log(`telah tersambung pada port : ${port}`)
  })
// app.listen(port, () => {
//   console.log(`telah tersambung pada port : ${port}`)
// })