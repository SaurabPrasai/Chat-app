const express=require('express');
const app=express();
const http=require('http');
const socketIo=require('socket.io');
const server=http.createServer(app);
const io=socketIo(server);

//view engine
app.set('view engine','ejs')

app.get('/',(req,res)=>{
    res.render('index')
})


io.on('connection',(socket)=>{
    //receiving data from frontend
    socket.on('chat',(data)=>{
        //emit msg to all user
        io.emit('chat',data)
    })
    //for broadcasting
    socket.on('user',(data)=>{
        //emit usertype who is writing msg to frontend
        socket.broadcast.emit('user',data)
    })

})



server.listen(3000,()=>{
    console.log("Server has started at port 3000");
})