import { combineEpics } from 'redux-observable';

import {
    fetchBootcampsEpic
} from './admin';

import {
    fetchTokenEpic,
    submitCouponEpic,
    submitRegistrationEpic
} from './register';

export const rootEpic = combineEpics(
    fetchBootcampsEpic,
    fetchTokenEpic,
    submitCouponEpic,
    submitRegistrationEpic
);