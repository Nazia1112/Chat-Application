import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { FormBuilder, Validators } from "@angular/forms";

import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from 'ng2-image-compress';


// Socket
import { SocketService } from '../services/socket.service';
import { FileService } from '../services/file.service';

import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  formGroup: any;
  files: any = [];
  error: any;
  processedImages: any = [];
  showTitle: boolean = false;

  acceptedTypes: any = ["image/jpg", "image/jpeg", "image/png"];


  constructor(public dialogRef: MatDialogRef<UploadComponent>,private fb: FormBuilder, private cd: ChangeDetectorRef, private fileService: FileService, private socketService: SocketService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.formGroup = this.fb.group({
      file: [null, Validators.required]
    });
  }


  onFileChange(event) {

    if (event.target.files && event.target.files.length) {
      let length = event.target.files.length;

      if (length > 10) {
        this.error = "can't upload more than 10 files at a time";
        return;
      }

      for (let i = 0; i < length; i++) {

        let file = event.target.files[i];
        if (this.acceptedTypes.indexOf(file.type) < 0) {
          this.error = "Only jpg/png files are supported"
          this.files = [];
          return;
        }
        if (file.size > 10000000) {
          this.error = "File Size can't exceed up to 1 MB"
          this.files = [];
          return;
        }

        this.cd.markForCheck();
      };
    }

    // let fileList: FileList;

    let images: Array<IImage> = [];



    let files : any =  Array.from(event.target.files);
 
    ImageCompressService.filesArrayToCompressedImageSource(files).then(observableImages => {
      observableImages.subscribe((image) => {
        this.files.push(image.imageDataUrl)
        images.push(image);
      }, (error) => {
        console.log("Error while converting");
      }, () => {
                this.processedImages = images;      
                this.showTitle = true;          
      });
    });
    console.log(this.files);
  }



  onSubmit() {
    console.log(this.data);

    for (let i = 0; i < this.files.length; i++) {
      this.socketService.sendFile({ data: this.data, file: this.files[i], fileType: 'image' });
    }
    this.dialogRef.close();
    //this.fileService.uploadImages(this.files);
  }

  remove(index) {
    this.files.splice(index, 1);
  }




}