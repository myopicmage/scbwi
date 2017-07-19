import { Base } from '../common/base';

type actionType = {
    type: string;
    location: string;
    text: string;
}

export class Notification extends Base {
    level: string;
    text: string;
    seen: boolean;
    action?: actionType;

    constructor(json) {
        super(json);

        this.level = json.level;
        this.text = json.text;
        this.seen = json.seen;

        if (json.action) {
            this.action = {
                type: json.action.type,
                location: json.action.location,
                text: json.action.text
            };
        }
    }

    static make = (level: 'error' | 'warning' | 'success' | 'info', text: string, createdby: string, modifiedby: string, action?: actionType): Notification =>
        new Notification({
            level,
            text,
            action,
            created: new Date(),
            modified: new Date(),
            createdby,
            modifiedby
        });

    static error = (text: string, createdby: string, modifiedby: string, action?: actionType): Notification => Notification.make('error', text, createdby, modifiedby, action);
    static warning = (text: string, createdby: string, modifiedby: string, action?: actionType): Notification => Notification.make('warning', text, createdby, modifiedby, action);
    static info = (text: string, createdby: string, modifiedby: string, action?: actionType): Notification => Notification.make('info', text, createdby, modifiedby, action);
    static success = (text: string, createdby: string, modifiedby: string, action?: actionType): Notification => Notification.make('success', text, createdby, modifiedby, action);
}