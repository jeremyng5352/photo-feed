import { Subject } from 'rxjs';

export class Timer {
    private elapsedTime: number; // in milliseconds
    private interval: number;
    private active: boolean;
    private loop;
    timeUp: Subject<any>;

    /**
     * create a timer
     * @param interval how long till changing the image, in milliseconds
     */
    constructor(interval: number) {
        this.interval = interval;
        this.timeUp = new Subject();
        this.elapsedTime = 0;
    }

    resetElapsedTime() {
        this.elapsedTime = 0;
    }

    isActive() {
        return this.active;
    }

    start(): Promise<any> {
        this.active = true;
        this.loop = setInterval(() => {
            this.elapsedTime += 100;
            if (this.interval < this.elapsedTime) {
                this.timeUp.next(null);
                this.elapsedTime = 0;
            }
        }, 100);

        return Promise.resolve();
    }

    stop() {
        this.active = false;
        clearInterval(this.loop);
    }
}
