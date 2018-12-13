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
    convertedItems.reverse();
    this.itemListObservable.next(convertedItems);
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

  private setupQueueList(itemList: Array<Item>) {
    if (this.queueList.length === 0) {
      this.queueList = itemList;
      this.queueListObservable.next(this.queueList);
    } else {
      const items = this.getNonDuplicatedItems(itemList);
      for (const item of items) {
        this.queueList.push(item);
      }
      this.queueListObservable.next(this.queueList);
    }
  }

  private getNonDuplicatedItems(itemList: Array<Item>): Array<Item> {
    const queueListIds = this.queueList.map(queueItem => queueItem.getId());
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
