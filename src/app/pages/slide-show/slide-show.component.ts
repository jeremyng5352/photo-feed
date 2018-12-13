import { Component, OnInit } from '@angular/core';
import { QueueService } from './services/queue/queue-service';
import { Item } from './item';
import { Timer } from 'src/app/classes/timer';

const INTERVAL = 5000;

@Component({
  selector: 'app-slide-show',
  templateUrl: './slide-show.component.html',
  styleUrls: ['./slide-show.component.scss']
})
export class SlideShowComponent implements OnInit {
  private timer: Timer;

  isTimerRunning = false;
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
    this.timer = new Timer(INTERVAL);
    this.timer.timeUp.subscribe(() => {
        this.handleTimerUp();
    });
    this.getAllLists();
  }

  private handleTimerUp() {
    console.log('timer is up!');
    if (this.queueList.length > 1) {
      this.showNextItem();
    } else {
      this.timer.stop();
    }
  }

  getAllLists() {
    this.queueService.getItemList().subscribe((itemList: Array<Item>) => {
      this.itemList = [];
      for (const item of itemList) {
        this.itemList.push(item);
      }
    });
    this.queueService.getQueueList().subscribe((queueList: Array<Item>) => {
      this.queueList = queueList;
      this.setupItemDisplay();
    });
  }

  setupItemDisplay() {
    if (!this.timer.isActive()) {
      console.log('starting timer')
      this.timer.start();
    }
    this.currentItem = this.queueList[0];
    this.queueItem1 = this.queueList[1];
    this.queueItem2 = this.queueList[2];
    this.queueItem3 = this.queueList[3];
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
