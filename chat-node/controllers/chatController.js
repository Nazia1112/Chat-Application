const Chat = require('../models/chat');
const User = require('../models/user');

module.exports.getChatMessgaes = (req, res, next) => {
    //console.log(req.user.id);
    Chat.findOne({ chatRoom: req.params.chatRoom })
        .then((chat) => {
            console.log("chat messages: " + chat.messages);
            res.status(200);
            res.json({
                success: true,
                message: 'Fetched all messages ',
                data: { messages: chat.messages }
            });
        })
        .catch((err) => {
            res.status(500);
            res.json({
                success: false,
                message: err.message,
            });
        });
}
//Upload Images and send 
module.exports.uploadImages = (req, res, next) => {
    console.log("uploading images");
    console.log(req.body);

}

//Socket Controller Functions
module.exports.sendMessage = (data, io, socket) => {
    Chat.findOneAndUpdate({ chatRoom: data.room }, { $push: { messages: data } }, { new: true })
        .then(chat => {

            User.findById(data.userIdTo).then(user => {
                if (user.online == true) {
                    console.log("user is online");
                    User.findById(data.userIdTo).then(user => {
                        if (user.online == true) {
                            console.log("user is online");
                            Chat.findOneAndUpdate({ chatRoom: data.room },
                                { $set: { "messages.$[i].messageStatus": { status: 'delivered' } } },
                                { arrayFilters: [{ "i.messageStatus.status": 'sent' }], new: true })
                                .then(chat => {
                                    console.log("chat updated");
                                    io.in(data.room).emit('messageReceived', chat);
                                })
                        }
                    })
                }
                else {
                    console.log("user is ofline");
                    io.in(data.room).emit('messageReceived', chat);
                }
            })
        })
}

//Socket Controller for marking messages read
module.exports.markRead = (data, io, socket) => {
    User.findById(data.userIdTo).then(user => {
        if (user.online == true) {
            console.log("user is online");
            Chat.findOneAndUpdate({ chatRoom: data.room },
                { $set: { "messages.$[i].messageStatus": { status: 'read' } } },
                { arrayFilters: [{ "i.messageStatus.status": 'delivered' }], new: true },
            )
                .then(chat => {
                    console.log("chat updated");
                    io.in(data.room).emit('messageReceived', chat);
                })
        }
    })
}

//chat controller for sending file
module.exports.storeFile = (data, io, socket) => {
    console.log(data.data);
    //console.log(data.file.data);


    let msg
        = data.data;
    //console.log("msg: "+msg);
    msg.messageType = data.fileType;
    msg.image = data.file;
    console.log(msg.image);
    msg.messageStatus = { status: 'sent' }
    console.log("msg image:  " + typeof (msg.image));
    //  io.in(data.data.room).emit('messageReceived',data.file);
    Chat.findOneAndUpdate({ chatRoom: data.data.room }, { $push: { messages: msg } }, { new: true })
        .then(chat => {
            io.in(data.data.room).emit('messageReceived', chat)
        })

}