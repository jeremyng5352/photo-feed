import { Component, OnInit } from '@angular/core';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../../../graphql/queries';
@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async getAllItems() {
    const data = await API.graphql(graphqlOperation(listItems
    ));
    console.log('item list', data);
  }

}
