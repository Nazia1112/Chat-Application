import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../../shared/baserurl';
import { Router } from '@angular/router';
import { SocketService } from '../socket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  constructor(private http: HttpClient,private router: Router,private socketService: SocketService) { }
  
  //Check if any user is logged in or not
  loggedIn(){
    return !!localStorage.getItem('token')    
  }
  //verifyUser from backend
  isAuthenticatedUser(){
      if(this.loggedIn()){
        let token = localStorage.getItem('token');
          // check if token is set, then...
          if (token) {
              //.......check from backend
              return true;
          }
      
          return false;
    }
  }   
  //Register User
  registerUser(user){
    return this.http.post<any>(baseURL+'/users/register',user);
  }
  //Login User
  loginUser(user) {
    //this.socketService.();
    console.log("login user: "+JSON.stringify(user));
    return this.http.post<any>(baseURL+'/users/login',user);
  }
  //Log out User
  logOutUser() {
    this.socketService.goOfline();
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
  }  
}
