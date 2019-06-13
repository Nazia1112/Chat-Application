
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { baseURL } from '../shared/baserurl';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }


  uploadImages(images) {
      this.http.post<any>(baseURL+'chats/sendImage',images);
  }

}