import { SET_ALL_USER , SET_SEARCH_FILTER} from "../actionTypes";
import { setUsers } from "./users.utils";
const INITIAL_STATE = {
    users: null,
    searchFilterValues: null,
    usersCount: 0,
    filteredUsersCount: 0,
}


export default  function usersReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_ALL_USER:
      return {
        ...state,
        users: setUsers(action.payload),
        usersCount: action.payload.length
        
      };
    case SET_SEARCH_FILTER:
      return {
        ...state,
        searchFilterValues: action.payload,

      };
     
    default:
      return state;
  }
}