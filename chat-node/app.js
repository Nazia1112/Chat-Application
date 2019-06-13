var express = require('express');
//const cors = require('cors');
const bodyParser = require('body-parser');
const socket = require('socket.io');

const userRouter = require('./routes/user');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');

const chatRouter = require('./routes/chat');


const config = require('./config/config');
const mongoose = require('mongoose');
const cors = require('cors');

//routes
const User = require('./models/user');
const Chat = require('./models/chat');
const http = require('http');


//Database Connection 
const url = config.mongoUrl
const connect = mongoose.connect(url, {
   useNewUrlParser: true
  });


connect.then((db) => {
    console.log("Connected correctly to server");
}, (err) => { console.log("db connection error "+err); });


const app = express();

app.use(bodyParser.json());


app.use(cors());
app.use('/users',userRouter);
app.use('/chats',chatRouter);

var server = http.Server(app);
let socketIO = require('socket.io');
let io = socketIO(server);


//Socket Configuration
io.on('connection', (socket) => {
    
    console.log("new user connected");    

    socket.on('join', function( data) {

    socket.join(data.room,()=>{
        Chat.findOneAndUpdate({chatRoom : data.room},{})
        .then( room => {
            if(room==null)
                Chat.create({chatRoom : data.room})
                .then( room=>{
                    console.log("chat room created succesfuly");
                } )
        } )
    });

    })

    socket.on('goOnline', function(id){
        userController.goOnline(id,socket.id);
        socket.broadcast.emit("changeUserStatus",{id:id,status:true});
    });


    socket.on('goOffline', function(id){ 
        userController.goOffline(socket.id);
       // socket.broadcast('userOfline',id);
       socket.broadcast.emit("changeUserStatus",{id:id,status:false});
    });


    socket.on('disconnect', function(){    
        console.log("disconnect");    
       //socket.broadcast('userOfline',socket.id);
       // userController.goOffline(socket.id);        
    });




    socket.on('message', (data) => {
        chatController.sendMessage(data,io,socket);
    });

    socket.on('typing', (data) => {
        socket.broadcast.in(data.room).emit('typing', {data: data, isTyping: true});
    });


    socket.on('markRead',(data) =>{
        chatController.markRead(data,io,socket);
    } );

    socket.on('file',data => {
        chatController.storeFile(data,io,socket);
    });


});


server.listen(3000, () => {
    console.log('server is running on port', server.address().port);
   });
