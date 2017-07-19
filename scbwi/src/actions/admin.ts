import {
    SET_NOTIFICATION,
    DISMISS_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    FETCH_NOTIFICATIONS_FULFILLED,
    UPDATE_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS_FULFILLED
} from 'constants/admin';

import { Notification } from 'types/admin';

export const setNotification = (notification: Notification) => ({ type: SET_NOTIFICATION, notification });
export const dismissNotification = (notification: Notification) => ({ type: DISMISS_NOTIFICATION, notification });