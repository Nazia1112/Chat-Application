import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { SocketService } from '../services/socket.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.css']
})
export class ChatRoomComponent implements OnInit {

  //Current User Details
  userName : string;
  userId : string;

  //Message Reciever Details
  userNameTo: string;
  userIdTo: string;
  userStatus: boolean;
  
  //fetch the chat room for two users
  chatRoom : string

  //Message Details
  message: string;
  messageArray: any = [];

  isTyping = false;
  timeOut : any;


  messageStatus : string;

  constructor(private route : ActivatedRoute, private socketService : SocketService, 
              private userService : UserService, private router : Router,private dialog: MatDialog) {

      //Observable for receiving new message
      this.socketService.newMessageReceived().subscribe(data => {
        //this.messageArray.push(data);
        console.log(JSON.stringify(data))
        this.messageArray = data.messages;
        console.log("message receieved" + JSON.stringify(this.messageArray));
        this.isTyping = false;
      });

      //Observable for when user is typing
      this.socketService.receivedTyping().subscribe(bool => {
        this.isTyping = bool.isTyping;
        clearTimeout(this.timeOut);
        this.timeOut = setTimeout( ()=> {
          this.isTyping = false;   
        } , 250);
      });


      //mark message read

      
      
 }

  ngOnInit() {

    //fetch user id and name from query param
    this.userIdTo = this.route.snapshot.queryParamMap.get('id');
    this.userNameTo = this.route.snapshot.queryParamMap.get('name');
    this.userName = this.userService.getLoggedInUser();

    //Get the chat room by concatening User id of both users
    this.userId = this.userService.getLoggedInUserId();
      if ( this.userId < this.userIdTo) {
          this.chatRoom = this.userId.concat(this.userIdTo);
      } else {
        this.chatRoom =  this.userIdTo.concat(this.userId);        
      }
      
     //Join chat room for 
     this.socketService.joinRoom({user: this.userService.getLoggedInUser(), room: this.chatRoom});
     
     //fetch previous chat messages of  users
     this.getChatMessages();

     //Observable for checking user status i.e, online or offline 
     this.socketService.changeUserStatus().subscribe(data => {
          if(data.id==this.userIdTo){
            this.userStatus = data.status;
            console.log(data.status);
            //window.alert("user online :"+data.status);
          }
     })

     this.socketService.goOnline();

     this.userService.checkOnline(this.userIdTo).subscribe(res => {
         this.userStatus = res.data.online;
         console.log(this.userStatus);
     })

     //Markread on messages
     this.markRead();
  }

  getChatMessages(){
    this.userService.getChatMessages(this.chatRoom)
    .subscribe( res => {
      this.messageArray = res.data.messages;
     // console.log("chat message res "+JSON.stringify(this.messageArray))
    } )
  }

  sendMessage(messageType:string) {
    if(this.message!=''){
      let data = { userNameTo:this.userNameTo, userIdTo:this.userIdTo, room: this.chatRoom, userNameFrom: this.userName,
         message: this.message,messageType:messageType,messageStatus :{status:'sent'} }
      console.log(data);
      this.socketService.sendMessage(data);
      this.message = '';
    }
  }

  typing() {
    this.socketService.typing({room: this.chatRoom, user: this.userService.getLoggedInUser()});
  }

  markRead(){
    let data = { userNameTo:this.userNameTo, userIdTo:this.userIdTo, room: this.chatRoom, userNameFrom: this.userName} 
    this.socketService.markRead(data);
  }


  //Multimedia upload Dialog
  uploadMedia(  ){

    let data = { userNameTo:this.userNameTo, userIdTo:this.userIdTo, room: this.chatRoom, userNameFrom: this.userName} 
    const dialogRef = this.dialog.open(UploadComponent, {
      width: '75vw',
      height:'100vw',
      data: data,
     disableClose: true 
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.getChatMessages(); 
    });
  }
  
}