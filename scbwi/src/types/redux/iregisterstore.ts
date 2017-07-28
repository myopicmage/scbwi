import { Bootcamp, BootcampRegistration, User } from 'types/common';

export interface IRegisterStore {
    user: User;
    registration: BootcampRegistration;
    bootcamps: Bootcamp[];
    bootcampsloading: boolean;
    coupon: string;
    couponloading: boolean;
    couponsuccess?: boolean;
    couponmessage: string;
    paypaltoken: string;
}