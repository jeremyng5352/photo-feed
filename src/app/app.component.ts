import { Component } from '@angular/core';
import Amplify from '@aws-amplify/core';
import awsmobile from './../aws-exports';
Amplify.configure(awsmobile);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
