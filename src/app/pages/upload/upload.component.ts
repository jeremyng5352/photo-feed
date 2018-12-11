import { Component, OnInit, ViewChild } from '@angular/core';

enum UPLOAD_STATE {
  NOT_STARTED = 'NOT_STARTED',
  UPLOADING = 'UPLOADING',
  PROCESSING = 'PROCESSING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  previewUrl = '';
  imageFile: File;
  currentState = UPLOAD_STATE.FAILED;
  @ViewChild('hiddeninput') hiddenInput;

  constructor() { }

  ngOnInit() {
  }

  chooseFile() {
    this.hiddenInput.nativeElement.click();
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      reader.onload = (image) => { // called once readAsDataURL is completed
        this.previewUrl = image.target.result;
        this.imageFile = this.hiddenInput.nativeElement.files[0];
      };
    }
  }
}
