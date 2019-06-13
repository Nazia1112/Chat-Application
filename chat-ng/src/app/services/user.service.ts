import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baserurl';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

getUsers() {
    return this.http.get<any>(baseURL+'/users/getUsers');    
}


getLoggedInUser(){
  return localStorage.getItem('user');
}

getLoggedInUserId(){
  return localStorage.getItem('id');
}

createChatRoom(user){
  return this.http.post<any>(baseURL+'/chat/createRoom/',user.id)
}

checkOnline(id){
  return this.http.get<any>(baseURL+'/users/isOnline/'+id)
}


getChatMessages(chatRoom){
  //router.get('/getChatMessages/:chatRoom',chatController.getChatMessgaes);
   return this.http.get<any>(baseURL+'/chats/getChatMessages/'+chatRoom);    

}

}
