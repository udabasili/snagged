import {createSelector} from 'reselect'
import { filterSearch } from './users.utils'


const users = state => state.users


export const filteredUsers = createSelector(
    users,
    u => {
        const users = u.users
        if(u.searchFilterValues){
            return filterSearch(users, u.searchFilterValues )
        }

        return users
    }
)