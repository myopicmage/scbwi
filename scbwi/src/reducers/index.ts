import { combineReducers } from 'redux';

import { admin } from './admin';
import { register } from './register';

export const rootReducer = combineReducers({
    admin,
    register
});