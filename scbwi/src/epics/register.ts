import { get, genEpic, genInner, post } from './utils';

import {
    getTokenFulfilled,
    submitCouponFulfilled,
    registerFulfilled
} from 'actions/register';

import {
    GET_TOKEN,
    SUBMIT_REGISTRATION,
    SUBMIT_COUPON
} from 'constants/register';

export const fetchTokenEpic = (action$, state) =>
    genEpic<string>(action$, state, GET_TOKEN, '/api/gettoken', getTokenFulfilled, 'Token download failed');

export const submitCouponEpic = (action$, state) =>
    action$.ofType(SUBMIT_COUPON)
        .mergeMap(action =>
            post<any>('/api/calctotal', action.registration)
                .map(response => submitCouponFulfilled(response.success, response.message, response.subtotal, response.total)));

export const submitRegistrationEpic = (action$, state) =>
    action$.ofType(SUBMIT_REGISTRATION)
        .mergeMap(action =>
            post<any>('/api/register', action.registration)
                .map(response => registerFulfilled(response.success)));

/*export const submitSurveyEpic = action$ =>
    action$.ofType(SUBMIT_SURVEY)
        .mergeMap(action =>
            ajax.post('/api/submit', action.submission, { 'Content-Type': 'application/json' })
                .map(response => {
                    const result = JSON.parse(response.responseText);

                    submitSurveyFulfilled({ success: result.success, message: result.message });
                }));*/