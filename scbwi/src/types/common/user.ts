import { Base } from './base';

export class User extends Base {
    first: string;
    last: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    email: string;
    phone: string;
    member: boolean;
}