export class Item {
    private id: string;
    private caption: string;
    private url: string;

    constructor(
        id: string,
        caption: string,
        url: string
    ) {
        this.checkId(id);
        this.checkCaption(caption);
        this.checkUrl(url);
        this.id = id;
        this.caption = caption;
        this.url = url;
    }

    private checkId(id: string) {
        if (id == null || id === undefined) {
            throw new Error('id of item must not be null or undefined');
        }
    }

    private checkCaption(caption: string) {
        if (caption == null || caption === undefined) {
            throw new Error('caption of item must not be null or undefined');
        }
    }

    private checkUrl(url: string) {
        if (url == null || url === undefined) {
            throw new Error('url of item must not be null or undefined');
        }
    }

    getId(): string {
        return this.id;
    }

    getCaption(): string {
        return this.caption;
    }

    getUrl(): string {
        return this.url;
    }

    setUrl(value: string) {
        this.url = value;
    }
}
