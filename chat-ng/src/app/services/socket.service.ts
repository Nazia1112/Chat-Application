import { Injectable } from '@angular/core';
import { UserService } from './user.service';

import * as io from 'socket.io-client';
import { baseURL } from '../shared/baserurl';

import { Observable, of, from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket;
  constructor() {
    this.socket = io(baseURL);
  }


  goOnline() {
    this.socket.emit('goOnline', localStorage.getItem('id'));
  }

  goOfline() {
    this.socket.emit('goOffline', localStorage.getItem('id'));
  }


  joinRoom(data) {
    this.socket.emit('join', data);
  }

  // On new Message to chat room
  newMessageReceived() {
    const observable = new Observable<any>(observer => {
      this.socket.on('messageReceived', (data) => {
        console.log("new message received");
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<any>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }


  changeUserStatus() {
    const observable = new Observable<any>(observer => {
      this.socket.on('changeUserStatus', (data) => {
        console.log("user offline: " + data.id + data.status);
        observer.next(data);
      })
    })
    return observable;
  }



  sendMessage(data) {
    this.socket.emit('message', data);
  }

  markRead(data) {
    this.socket.emit('markRead', data);
  }

  sendFile(file) {
    this.socket.emit('file', file);
  }

}
