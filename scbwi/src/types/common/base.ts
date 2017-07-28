export class Base {
    id?: number;
    created?: Date;
    createdby?: string;
    modified?: Date;
    modifiedby?: string;

    constructor(data) {
        this.id = data.id;
        this.created = data.created;
        this.createdby = data.createdby;
        this.modified = data.modified;
        this.modifiedby = data.modifiedby;
    }
}