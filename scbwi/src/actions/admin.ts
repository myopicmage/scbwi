import {
    SET_NOTIFICATION,
    DISMISS_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    FETCH_NOTIFICATIONS_FULFILLED,
    UPDATE_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS_FULFILLED,
    BOOTCAMPS_FETCH,
    BOOTCAMPS_FETCH_FULFILLED,
    AUTHENTICATE,
    LOGOUT,
    LOGOUT_WITH_NOTE
} from 'constants/admin';

import { Notification } from 'types/admin';
import { Bootcamp } from 'types/common';

export const authenticate = (token: string, expiration: Date) => {
    window.localStorage.setItem('bearer', token);
    window.localStorage.setItem('expiration', expiration.toUTCString());

    return {
        type: AUTHENTICATE,
        token,
        expiration
    }
}

export const logout = () => {
    window.localStorage.setItem('bearer', '');
    window.localStorage.setItem('expiration', '');

    return {
        type: LOGOUT
    }
}

export const logoutWithNote = (notification: Notification) => {
    window.localStorage.setItem('bearer', '');
    window.localStorage.setItem('expiration', '');

    return {
        type: LOGOUT_WITH_NOTE,
        notification
    };
}

export const setNotification = (notification: Notification) => ({ type: SET_NOTIFICATION, notification });
export const dismissNotification = (notification: Notification) => ({ type: DISMISS_NOTIFICATION, notification });

export const fetchBootcamps = () => ({ type: BOOTCAMPS_FETCH });
export const fetchBootcampsFulfilled = (bootcamps: Bootcamp[]) => ({ type: BOOTCAMPS_FETCH_FULFILLED, bootcamps });