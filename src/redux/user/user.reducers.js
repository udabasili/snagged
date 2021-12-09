import { setUser } from "./user.utils";

const { SET_CURRENT_USER, 
    SET_USER_PREFERENCE_VALUES, 
    SHOW_CHAT_WINDOW, 
    SHOW_HELP_WINDOW,
    SET_USER_REGISTRATION_STATUS 
} = require("../actionTypes");

const INITIAL_STATE = {
    currentUser: null,
    isAuthenticated: false,
    userPreferences: null,
    isAdmin: false,
    showChatWindow: false,
    showHelpWindow: false,
    fullyRegistered: false
}

export default function userReducer(state=INITIAL_STATE, action){
    switch (action.type) {
        case SET_CURRENT_USER:
            return { 
                ...state,
                currentUser: setUser(action.payload),
                isAdmin: action.payload.administrator ? true : false, //user__admin__user
                isAuthenticated: !!Object.keys(action.payload).length > 0
            }
        case SET_USER_PREFERENCE_VALUES:
            return {
                ...state,
                userPreferences: action.payload
                
            }
        case SHOW_CHAT_WINDOW:
            return {
                ...state,
                showChatWindow:  action.payload ? action.payload :  !state.showChatWindow,
                showHelpWindow: false,
            }
        case SHOW_HELP_WINDOW:
            return {
                ...state,
                showHelpWindow:  action.payload,
                showChatWindow : false
            }
        
        case SET_USER_REGISTRATION_STATUS:
            return {
                ...state,
                fullyRegistered: action.payload

            }
        default:
            return state;
    }
}
