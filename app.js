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











//chat hehehe
const chatModel = require('./model/chatModel')

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

  socket.on("join", userId => {
    socket.join(userId);
    console.log('sudah join')
  })

  socket.on("chat", (userId, chat, adminId) => {
    console.log(userId, chat, adminId)
    chatModel.create({userId, isi:chat, adminId}, {returning: true}).then(respon =>{
    
      io.to(userId).emit('chatMasuk', respon);
   })
   .catch(err=>{
    
   })

  })

  socket.on("allchat",  (userId, admin) => {
   
    chatModel.findAll({
      where:{
          userId :userId
      }
  }).then(async respon =>{
    // console.log(respon, 'allChat')
    let update = {}
    if(admin){
      update = {adminRead:1}
    }else{
      update = {userRead:1}
    }
   await chatModel.update(update,{
      where :{
        userId:userId
      },
      returning: true,
      plain:true
  })
    io.to(userId).emit('semuachat', respon);
   })
   .catch(err=>{
    console.log(err)
   })

  })
})

httpServer.listen(port,() => {
    console.log(`telah tersambung pada port : ${port}`)
  })
// app.listen(port, () => {
//   console.log(`telah tersambung pada port : ${port}`)
// })