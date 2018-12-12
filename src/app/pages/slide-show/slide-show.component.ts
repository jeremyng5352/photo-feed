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
  currentItem: Item;
  queueItem1: Item;
  queueItem2: Item;
  queueItem3: Item;
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
      this.setupItemDisplay();
    });
  }

  setupItemDisplay()  {
    this.currentItem = this.queueList[0];
    this.queueItem1 = this.queueList[1];
    this.queueItem2 = this.queueList[2];
    this.queueItem3 = this.queueList[3];
  }

}
