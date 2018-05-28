import {Component, ElementRef, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  acceptedMimeTypes = [
    'image/gif',
    'image/jpeg',
    'image/png'
  ];

  @ViewChild('fileInput') fileInput: ElementRef;
  fileDataUri = '';
  errorMsg = '';

  constructor(private http: HttpClient) {}

  previewFile() {
    const file = this.fileInput.nativeElement.files[0];
    if (file && this.validateFile(file)) {
      this.errorMsg = '';
      const reader = new FileReader();
      reader.readAsDataURL(this.fileInput.nativeElement.files[0]);
      reader.onload = () => {
        this.fileDataUri = reader.result;
      }
    } else {
      this.errorMsg = 'File must be jpg, png, or gif and cannot be exceed 500 KB in size'
    }
  }

  uploadFile(event: Event) {
    event.preventDefault();

    // get only the base64 file
    if (this.fileDataUri.length > 0) {
      const base64File = this.fileDataUri.split(',')[1];
      const data = {'image': base64File};
      this.http.post(`${environment.apiUrl}/file`, data)
        .subscribe(
          res => {
            // handle success
            // reset file input
            this.fileInput.nativeElement.value = '';
            this.fileDataUri = '';
          },
          err => {
            this.errorMsg = 'Could not upload image.';
          }
        );
    }

  }

  validateFile(file) {
    return this.acceptedMimeTypes.includes(file.type) && file.size < 500000;
  }

}