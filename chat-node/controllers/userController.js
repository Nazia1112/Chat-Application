var express = require('express');
const auth = require('../auth/authenticate');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/config')
const User = require('../models/user');
const mongoose =require('mongoose');


module.exports.register = (req,res,next) => {
    console.log(req.body);
    User.findOne({ name : req.body.name })
    .then( (user) => {
            console.log("got user: "+user);
            if(user!=null) {
                    console.log("user already exists: " +user)
                    //res.status(422);
                    res.json({ 
                        success : false,
                        message : 'User already exists',
                        data:null
                    });
            }
            else {
                
                    console.log("creating user")
                    newUser = User(req.body);   
                    return( 
                        newUser.save()
                        .then((user) => {
                            res.status(200);                    
                            console.log("user created " +user);
                            res.json({ 
                                success : true, 
                                message : 'User created!',
                                data :{user : user }
                             })
                        })
                    
                    )
            }
                        
    })
    .catch((err) => {
        //res.status(500);
        res.json({
            success : false,
            message : err.message,
            data: null
        }); 
    });
}

module.exports.login = (req, res, next) => {
    //console.log(req.body);
    User.findOne({ name:req.body.name } )
    .then((user) => {
            //console.log(JSON.stringify(user));
            if(user!=null){
                if(bcrypt.compareSync(req.body.password,user.password)){                    
                                    let token = jwt.sign({id: user._id,handle: user.handle},config.secret,{ expiresIn: '24h' });
                                    user.password = '';
                                    res.status(200);
                                    res.json({
                                        success: true,
                                        message: 'Authentication successful!',
                                        data : { token: token ,user : user}
                                    });
                                } 
                                else{
                                    // res.status(401);
                                     res.json({
                                     success: false,
                                     message: 'Incorrect username or password'
                                     });
                                 }
                    
            }
            else {
           // res.status(401);
            res.json({
            success: false,
            message: 'No user found'
            });
        }

      
    })
    .catch((err) => {
        //res.status(500);        
        res.json({
            success : false,
            message : err.message,
        }); 
    });
}

module.exports.getUsers = (req, res, next ) => {
    //console.log(req.user.id);
    User.find({ _id : { $ne : req.user.id  } },{password : 0})
    .then((users) => {
            res.json({
                success: true,
                message: 'Fetched all users ',
                data : {users : users}
            });
    })
    .catch((err) => {
        //res.status(500);        
        res.json({
            success : false,
            message : err.message,
        }); 
    });
}

module.exports.checkUserOnline = (req,res,next) => {

    User.findById(req.params.id)
    .then(user => {
        
            res.json({
                success: true,
                message: 'Checked User',
                data : {"online":user.online }
            });
        
    } )

}



//Functions for socket
module.exports.goOnline = (user_id,socket_id) =>{
   // console.log("id : "+user_id)
    User.findByIdAndUpdate({ _id : user_id },{online:true,Socket_id:socket_id})
    .then((user) => {
        return true;
    })
    .catch((err) => {
        console.log(err);
        return false;
    });
}  

//Functions for socket
module.exports.goOffline = (socket_id) =>{
    User.findOneAndUpdate({Socket_id:socket_id},{online:false})
    .then((user) => {
        return true;
    })
    .catch((err) => {
        console.log(err);
        return false;
    });
}  

module.exports.checkUserOnlineSocket = (id) => {
      //  console.log("id "+id)
        User.findById(id)
        .then(user => {
        //        console.log(user);
                if(user.online==true){
                    console.log(true);
                    return true;                    
                }
                else 
                    return false;
        })
    
    }
