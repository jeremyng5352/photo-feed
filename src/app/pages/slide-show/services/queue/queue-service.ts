import { Item } from '../../item';
import { Observable } from 'rxjs';

export abstract class QueueService {
    abstract setupSlideShow();
    abstract getItemList(): Observable<Array<Item>>;
    abstract getQueueList(): Observable<Array<Item>>;
    abstract showItemNext(item: Item);
    abstract addItemToQueue(item: Item);
}
