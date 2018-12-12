import { Component, OnInit } from '@angular/core';
import { QueueService } from './services/queue/queue-service';
import { Item } from './item';
@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {
  itemList: Array<Item>;
  queueList: Array<Item>;
  constructor(private queueService: QueueService) { }

  ngOnInit() {
    this.queueService.setupSlideShow();
    this.getAllLists();
  }

  getAllLists() {
    this.queueService.getItemList().subscribe((list: Array<Item>) => {
      this.itemList = list;
    });
    this.queueService.getQueueList().subscribe((list: Array<Item>) => {
      this.queueList = list;
      console.log(this.queueList);
    });
  }

}
