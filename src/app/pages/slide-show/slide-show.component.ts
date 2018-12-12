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
    this.getAllItems();
  }

  async getAllItems() {
    const allItems: any = await API.graphql(graphqlOperation(listItems
    ));
    console.log(allItems.data.listItems.items);
  }

}
