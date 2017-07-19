import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createEpicMiddleware } from 'redux-observable';
import { rootReducer } from '../reducers';
import * as epics from '../epics';

const epicMiddleware = createEpicMiddleware(epics.rootEpic);

if (module.hot) {
    module.hot.accept('../epics', () => {
        const newRoot = require<typeof epics>('../epics').rootEpic;
        epicMiddleware.replaceEpic(newRoot);
    });
}

export const store = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(epicMiddleware)
    )
);