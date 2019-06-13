import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket.service';

import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users : any;
  onlineUsers: any;

  constructor(private userService : UserService, private router : Router,private socketService : SocketService ) { }
  
  ngOnInit() {
      this.getAllUsers();
      this.socketService.goOnline(); 

      this.socketService.changeUserStatus().subscribe(data => {
          this.changeUserStatus(data.id,data.status);
     })
  }


  changeUserStatus(id,status:boolean){
    console.log(id);
    if(this.users){
        for(var i=0;i<this.users.length;i++){
          if(this.users[i]._id==id){
              console.log("user updated: ");
              this.users[i].online=status;
          }
        }
    }
  }
  
  getAllUsers(){
      this.userService.getUsers()
      .subscribe( (res) => {
          if(res.success){
            this.users = res.data.users;
            console.log(this.users);
          }
      })
  }

  goToChatRoom(user){
    console.log(user);
    this.router.navigate(['user/chatroom'], { queryParams: { name: user.name, id: user._id} });
  }


}
