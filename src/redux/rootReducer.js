import userReducer from "./user/user.reducers";
import {combineReducers} from 'redux';
import usersReducers from "./users/users.reducers";
import {persistReducer} from 'redux-persist';
import sessionStorage from "redux-persist/lib/storage/session";

const persistConfig = {
    key: 'root',
    storage: sessionStorage
}
const rootReducer = combineReducers({
    user: userReducer,
    users: usersReducers
})

export default persistReducer(persistConfig, rootReducer) 