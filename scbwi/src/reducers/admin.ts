import {
    SET_NOTIFICATION,
    DISMISS_NOTIFICATION,
    FETCH_NOTIFICATIONS,
    FETCH_NOTIFICATIONS_FULFILLED,
    UPDATE_NOTIFICATIONS,
    UPDATE_NOTIFICATIONS_FULFILLED
} from 'constants/admin';

import { Notification } from 'types/admin';
import { IAdminStore } from 'types/redux';

const AdminInitial: IAdminStore = {
    notifications: []
}

export const admin = (state = AdminInitial, action) => {
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
                    action.notification
                ]
            };
        default:
            return state;
    }
}