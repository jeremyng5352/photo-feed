import { Component } from '@angular/core';
import Amplify from '@aws-amplify/core';
import awsmobile from './../aws-exports';
import { AmplifyService } from 'aws-amplify-angular';
Amplify.configure(awsmobile);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public amplifyService: AmplifyService) {

    /** now you can access category APIs:
     *
     * this.amplifyService.auth();          // AWS Amplify Auth
     * this.amplifyService.analytics();     // AWS Amplify Analytics
     * this.amplifyService.api();           // AWS Amplify API
     * this.amplifyService.cache();         // AWS Amplify Cache
     * this.amplifyService.pubsub();        // AWS Amplify PubSub
     * this.amplifyService.interactions();  // AWS Amplify Interactions
     *     
    **/
  }
}
