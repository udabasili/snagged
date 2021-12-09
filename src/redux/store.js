import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './rootReducer';
import thunk from 'redux-thunk';
import { persistStore } from "redux-persist";

export const middleware = [thunk]
let store
if (process.env.NODE_ENV === 'development') {
    const composeEnhancers = process.env.NODE_ENV === 'production' ?
        compose :
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

    store = createStore(rootReducer, composeEnhancers(
        applyMiddleware(...middleware)
    ))
}
else {
    store = createStore(rootReducer, applyMiddleware(thunk));
}

const persistor = persistStore(store)
export {
    store,
    persistor
};
