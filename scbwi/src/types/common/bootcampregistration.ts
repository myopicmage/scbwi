import { Base } from './base';
import { User } from './user';

export class BootcampRegistration extends Base {
    user?: User;
    bootcampid?: number;
    subtotal: number;
    total: number;
    paid?: Date;
    cleared?: Date;
    nonce?: string;
}