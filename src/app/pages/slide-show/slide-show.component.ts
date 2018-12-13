import { Component, OnInit } from '@angular/core';
import { QueueService } from './services/queue/queue-service';
import { Item } from './item';
@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {
  isControllerShown = false;
  itemList: Array<Item>;
  queueList: Array<Item>;
  currentItem: Item;
  queueItem1: Item;
  queueItem2: Item;
  queueItem3: Item;
  selectedItem: Item;
  selectedItemIndex: number;
  constructor(private queueService: QueueService) { }

  ngOnInit() {
    this.queueService.setupSlideShow();
    this.getAllLists();
  }

  getAllLists() {
    this.queueService.getItemList().subscribe((list: Array<Item>) => {
      this.itemList = list;
      console.log('item', this.itemList);
    });
    this.queueService.getQueueList().subscribe((list: Array<Item>) => {
      this.queueList = list;
      console.log('queue', this.queueList);
      this.setupItemDisplay();
    });
  }

  setupItemDisplay() {
    this.currentItem = this.queueList[0];
    this.queueItem1 = this.queueList[1];
    this.queueItem2 = this.queueList[2];
    this.queueItem3 = this.queueList[3];
  }

  nextItem() {
    this.queueService.showNextItem();
  }

  setClickedItem(item: Item, index: number) {
    this.selectedItem = item;
    this.selectedItemIndex = index;
  }

  showNextItem() {
    this.queueService.showNextItem();
  }

  addItemNext() {
    this.queueService.addItemNext(this.selectedItem);
    this.selectedItem = undefined;
    this.selectedItemIndex = -1;
  }

  addItemToQueue() {
    this.queueService.addItemToQueue(this.selectedItem);
    this.selectedItem = undefined;
    this.selectedItemIndex = -1;
  }

}
