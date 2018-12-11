import { Component, OnInit, ViewChild } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { createItem } from '../../../graphql/mutations';
import awsmobile from '../../../aws-exports';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

enum UPLOAD_STATE {
  NOT_STARTED = 'NOT_STARTED',
  UPLOADING = 'UPLOADING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED'
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  @ViewChild('hiddeninput') hiddenInput;
  imageForm: FormGroup;
  previewUrl = '';
  imageFile: File;
  currentState = UPLOAD_STATE.NOT_STARTED;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.imageForm = this.formBuilder.group({
      caption: this.formBuilder.control(null, [Validators.required]),
    });
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

  async uploadItem() {
    const file = this.getImageFile();
    const caption = this.imageForm.get('caption').value;
    const data = await API.graphql(graphqlOperation(createItem, {
      input: {
        file: file,
        caption: caption
      }
    }));
  }

  getImageFile() {
    const { name, type: mimeType } = this.imageFile;
    const [, , , extension] = /([^.]+)(\.(\w+))?$/.exec(name);

    const bucket = awsmobile.aws_user_files_s3_bucket;
    const region = awsmobile.aws_user_files_s3_bucket_region;
    const key = [UUID.UUID(), extension].filter(x => !!x).join('.');

    const file = {
      bucket,
      key,
      region,
      localUri: this.imageFile,
      mimeType
    };
    return file;
  }
}
