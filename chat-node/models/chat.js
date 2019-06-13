const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const MsgSchema = new Schema({
    userNameto : String,
    userIdTo : Schema.Types.ObjectId,
    userNameFrom : String,
    messageType : String,
    message : {
        type : String,
        required : true
    },
    image :{
        type: String 
    },
    messageStatus :{
            status : String,
            time : { type : Date, default: Date.now }
    } 
},{
    timestamps : true
})

var Chat = new Schema({
    chatRoom : String,
    members : {
       type: [Schema.Types.ObjectId ],
       ref : 'User'
    },
    messages : [MsgSchema]
})

module.exports = mongoose.model('nbChat',Chat);
