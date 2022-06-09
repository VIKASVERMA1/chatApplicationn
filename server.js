const express = require("express");
const socket = require("socket.io");

// App setup
const PORT = 5000;
const app = express();
const server = app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
  console.log(`http://localhost:${PORT}`);
});

// Static files
app.use(express.static(__dirname + '/public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname +'/index.html')
})

// Socket setup

const io = socket(server);

io.on("connection", function (socket) {
  console.log("Made socket connection");
  socket.on('message',(msg)=>{
    socket.broadcast.emit('message',msg);
    socket.broadcast.emit('typing', {user: msg.user});
})
});