const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var User = new Schema({
        name: {
            type: String,
        },
        password: {
            type:String,
            required : true
        },
        online : Boolean,
        Socket_id : String
    
},{
    timestamps: true
})

User.pre('save', function(next){

    let user = this;
    if(!user.isModified('password')) {
        return next();
    }

    bcrypt.hash(this.password, 10, (err, hash) => {
    if(err) {
        console.log(err);
    }
    else {
            user.password = hash;
            next();
    }
    })

});
    

module.exports = mongoose.model('nbChatusers',User);