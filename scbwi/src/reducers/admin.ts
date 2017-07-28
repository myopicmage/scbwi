import {
    SET_NOTIFICATION,
    DISMISS_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    FETCH_NOTIFICATIONS_FULFILLED,
    UPDATE_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS_FULFILLED,
    AUTHENTICATE,
    LOGOUT,
    LOGOUT_WITH_NOTE,
    BOOTCAMPS_FETCH,
    BOOTCAMPS_FETCH_FULFILLED
} from 'constants/admin';

import { Notification } from 'types/admin';
import { IAdminStore } from 'types/redux';

const storedExpiration = window.localStorage.getItem('expiration');

const AdminInitial: IAdminStore = {
    notifications: [],
    bearer: window.localStorage.getItem('bearer') || '',
    expiration: storedExpiration ? new Date(storedExpiration) : new Date(2000, 1, 1),
    bootcamps: [],
    bootcampsloading: false
};

export const admin = (state = AdminInitial, action): IAdminStore => {
    switch (action.type) {
        case SET_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    action.notification
                ]
            };
        case DISMISS_NOTIFICATION:
            return {
                ...state,
                notifications: [
                    ...state.notifications.filter((item: Notification) => item.id !== action.notification.id),
                ]
            };
        case LOGOUT:
            return {
                ...state,
                bearer: '',
                expiration: new Date(2000, 1, 1)
            };
        case LOGOUT_WITH_NOTE:
            return {
                ...state,
                bearer: '',
                expiration: new Date(2000, 1, 1),
                notifications: [
                    ...state.notifications,
                    action.notification
                ]
            };
        case BOOTCAMPS_FETCH:
            return {
                ...state,
                bootcampsloading: true
            };
        case BOOTCAMPS_FETCH_FULFILLED:
            return {
                ...state,
                bootcampsloading: false,
                bootcamps: action.bootcamps
            };
        default:
            return state;
    }
}