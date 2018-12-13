import { Component, OnInit, ViewChild } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { createItem } from '../../../graphql/mutations';
import awsmobile from '../../../aws-exports';
import { UUID } from 'angular2-uuid';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AmplifyService } from 'aws-amplify-angular';

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

  constructor(private formBuilder: FormBuilder,
    public amplifyService: AmplifyService) { }

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
        this.previewUrl = (<any>image.target).result;
        this.imageFile = this.hiddenInput.nativeElement.files[0];
      };
    }
  }

  async uploadItemToDynamo() {
    if (this.imageFile) {
      this.currentState = UPLOAD_STATE.UPLOADING;
      const file = this.getImageFile();
      const caption = this.imageForm.get('caption').value;

      // put the file data into dynamodb first to get the id
      const response = await API.graphql(graphqlOperation(createItem, {
        input: {
          file: file,
          caption: caption
        }
      }));
      const imageId = (<any>response).data.createItem.id;
      this.uploadItemToS3(imageId);
      this.handleUploadResponse(response);
    }
  }

  uploadItemToS3(imageId: string) {
    // then use the id to push the image to S3
    this.amplifyService.storage().put(imageId, this.imageFile).then(result => {
      console.log('s3 bucket submitted', result);
    }).catch(err => console.log(err));
    // this is how you get the url in s3
  }

  handleUploadResponse(response) {
    const hasError = response.hasOwnProperty('error');
    if (hasError) {
      this.currentState = UPLOAD_STATE.FAILED;
    } else {
      this.currentState = UPLOAD_STATE.SUCCESS;
    }
  }

  resetForm() {
    this.imageFile = null;
    this.previewUrl = '';
    this.imageForm.reset();
    this.currentState = UPLOAD_STATE.NOT_STARTED;
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
