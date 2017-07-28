import 'whatwg-fetch';
import { Base } from 'types/common';
import { logoutWithNote, setNotification } from 'actions/admin';
import { Notification } from 'types/admin';
import * as Rx from 'rxjs/Rx';

const makeHeader = (token?: string) => {
    return token ? {
        'Authorization': `bearer ${token}`
    } : {};
}

export const get = <T>(endpoint: string, authToken?: string): Rx.Observable<T> =>
    Rx.Observable.from(
        fetch(endpoint, {
            method: 'GET',
            headers: {
                ...makeHeader(authToken),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then<T>(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error(response.status.toString());
            } else {
                throw new Error(response.statusText);
            }
        })
    );

export const post = <T>(endpoint: string, body?: {}, authToken?: string): Rx.Observable<T> =>
    Rx.Observable.from(
        fetch(endpoint, {
            method: 'POST',
            headers: {
                ...makeHeader(authToken),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }).then<T>(response => {
            if (response.ok) {
                return response.json();
            } else if (response.status === 401) {
                throw new Error(response.status.toString());
            } else {
                throw new Error(response.statusText);
            }
        })
    );

export const genInner = <T>(action, state, endpoint: string, callback, errortext: string) =>
    get<T>(endpoint, state.getState().admin.bearer)
        .map(response => callback(response))
        .catch(error => {
            if (error.message === '401') {
                return Rx.Observable.of(logoutWithNote(Notification.info('Session expired. Please log in again.', 'epics', 'epics')));
            } else {
                return Rx.Observable.of(setNotification(Notification.error(errortext, 'epics', 'epics')))
            }
        });

export const genEpic = <T>(action$, state, type: string, endpoint: string, callback, errortext: string) =>
    action$.ofType(type).mergeMap(action => genInner(action, state, endpoint, callback, errortext));