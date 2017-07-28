import { Notification } from 'types/admin';
import { Bootcamp } from 'types/common';

export interface IAdminStore {
    notifications: Notification[];
    bearer: string;
    expiration: Date;
    bootcamps: Bootcamp[];
    bootcampsloading: boolean;
}