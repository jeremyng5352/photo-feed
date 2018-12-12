export class Item {
    private id: string;
    private caption: string;

    constructor(
        id: string,
        caption: string
    ) {
        this.checkId(id);
        this.checkCaption(caption);
        this.id = id;
        this.caption = caption;
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

    getId(): string {
        return this.id;
    }

    getCaption(): string {
        return this.caption;
    }
}
