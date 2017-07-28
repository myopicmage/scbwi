import { Bootcamp } from 'types/common';
import { get, genEpic, genInner } from './utils';

import {
    BOOTCAMPS_FETCH
} from 'constants/admin';

import {
    fetchBootcampsFulfilled
} from 'actions/admin';

export const fetchBootcampsEpic = (action$, state) =>
    genEpic<Bootcamp[]>(action$, state, BOOTCAMPS_FETCH, '/admin/bootcamps', fetchBootcampsFulfilled, 'Bootcamps download failed');