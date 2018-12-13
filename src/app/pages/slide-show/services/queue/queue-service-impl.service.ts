import { Injectable } from '@angular/core';
import { Item } from '../../item';
import { Subject, Observable } from 'rxjs';
import { QueueService } from './queue-service';
import { API, graphqlOperation } from 'aws-amplify';
import { listItems } from '../../../../../graphql/queries';
import { onCreateItem } from '../../../../../graphql/subscriptions';
import { AmplifyService } from 'aws-amplify-angular';
@Injectable({
  providedIn: 'root'
})
export class QueueServiceServiceImpl implements QueueService {
  itemListObservable: Subject<Array<Item>> = new Subject();
  queueListObservable: Subject<Array<Item>> = new Subject();
  queueList: Array<Item> = [];
  itemList: Array<Item> = [];

  constructor(
    public amplifyService: AmplifyService
  ) { }

  setupSlideShow() {
    this.retrieveItemsFromServer();
    this.setupItemSubscription();
  }

  private async retrieveItemsFromServer() {
    const response: any = await API.graphql(graphqlOperation(listItems));
    const rawItems = response.data.listItems.items;
    const convertedItems: Array<Item> = [];
    for (const rawItem of rawItems) {
      const convertedItem = this.parseRawItem(rawItem);
      await this.setupItemUrl(convertedItem);
      convertedItems.push(convertedItem);
    }
    // convertedItems.reverse();
    this.setupQueueList(convertedItems);
  }

  private async setupItemUrl(item: Item) {
    const url = await this.amplifyService.storage().get(item.getId());
    item.setUrl(url.toString());
  }

  private parseRawItem(raw: any): Item {
    const id = raw['id'];
    const caption = raw['caption'];
    return new Item(id, caption, '');
  }

  // graphlQL subscription
  // when the mutation is called, this method will be called as well
  private async setupItemSubscription() {
    (<any>API.graphql(graphqlOperation(onCreateItem))).subscribe((response) => {
      this.retrieveItemsFromServer();
    });
  }

  private setupQueueList(convertedItems: Array<Item>) {
    if (this.queueList.length === 0) {
      for (const item of convertedItems) {
        this.queueList.push(item);
        this.itemList.push(item);
      }
    } else {
      const newItems = this.getNonDuplicatedItems(convertedItems);
      for (const item of newItems) {
        this.queueList.push(item);
        this.itemList.push(item);
      }
    }
    
    // Do the updates for the queues here
    this.queueListObservable.next(this.queueList);
    this.itemListObservable.next(this.itemList);
  }

  private getNonDuplicatedItems(itemList: Array<Item>): Array<Item> {
    const queueListIds = this.itemList.map(queueItem => queueItem.getId());
    const nonDuplicatedItems: Array<Item> = itemList.filter((item) => {
      return queueListIds.indexOf(item.getId()) < 0;
    });
    return nonDuplicatedItems;
  }

  getItemList(): Observable<Array<Item>> {
    return this.itemListObservable;
  }

  getQueueList(): Observable<Array<Item>> {
    return this.queueListObservable;
  }

  showNextItem() {
    this.queueList.shift();
    this.queueListObservable.next(this.queueList);
  }

  addItemNext(item: Item) {
    this.queueList.splice(1, 0, item);
    this.queueListObservable.next(this.queueList);
  }

  addItemToQueue(item: Item) {
    this.queueList.push(item);
    this.queueListObservable.next(this.queueList);
  }

}
