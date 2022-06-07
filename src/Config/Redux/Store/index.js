import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import {
    userReducers
} from '../Reducers';

const rootReducer = combineReducers({
    userReducers,
})

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;