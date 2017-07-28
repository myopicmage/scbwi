import { get, genEpic, genInner } from './utils';
import { getTokenFulfilled } from 'actions/register';
import { GET_TOKEN } from 'constants/register';

export const fetchTokenEpic = (action$, state) =>
    genEpic<string>(action$, state, GET_TOKEN, '/api/gettoken', getTokenFulfilled, 'Token download failed');