import { combineEpics } from 'redux-observable';

import {
    fetchBootcampsEpic
} from './admin';

import {
    fetchTokenEpic
} from './register';

export const rootEpic = combineEpics(
    fetchBootcampsEpic,
    fetchTokenEpic
);