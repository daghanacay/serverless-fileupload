import { Component, OnInit } from '@angular/core';
import {ElementRef, ViewChild} from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { SecureHttpClientService } from '../services/secure-http-client.service';
import { AppConstants, FileGetModel } from '../model/constants'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  ngOnInit() {
  }

  acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  @ViewChild('fileInput') fileInput: ElementRef;
  fileDataUri = '';
  serverResponse:FileGetModel = {'data':''};

  constructor(private httpsecure: SecureHttpClientService) {}

  previewFile() {
    const file = this.fileInput.nativeElement.files[0];
    if (file && this.validateFile(file)) {
      const reader = new FileReader();
      reader.readAsDataURL(this.fileInput.nativeElement.files[0]);
      reader.onload = () => {
        this.fileDataUri = reader.result;
      }
    } else {
      throw new Error('File must be jpg, png, or gif and cannot be exceed 500 KB in size');
    }
  }

  uploadFile(event: Event) {
    event.preventDefault();

    // get only the base64 file and post it
    if (this.fileDataUri.length > 0) {
      const base64File = this.fileDataUri.split(',')[1];
      const data = {'image': base64File};

      
  
      this.httpsecure.postWithApikey(AppConstants.FILE_URL, data)
        .subscribe(
          res => {
            // handle success
            // reset file input
            this.fileInput.nativeElement.value = '';
            this.fileDataUri = '';
          },
          err => {
            throw new Error('Could not upload image.');
          }
        );
    }

  }

  callGetMethod(){
    this.httpsecure.getWithJWT(AppConstants.FILE_URL)
    .subscribe(
      data => {
        console.log(data);
        // Clone data
        this.serverResponse = {...data};
        console.log(this.serverResponse);
      },
      err => {
        throw err;
      }
    )
  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 500000;
  }

}
