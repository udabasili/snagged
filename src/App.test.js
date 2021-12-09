import {mount, shallow} from 'enzyme'
import { Provider } from 'react-redux'
import {MemoryRouter, Route} from 'react-router-dom'
import {App} from './App'
import {MainRoute} from './MainRoute'
import { setCurrentUser } from './redux/user/user.actions'
import { findByAttribute, storeFactory } from './test/testUtils'
import SearchPage from './pages/search.page';
import AuthPage from './pages/registration/auth.page'

let store;

const setup = (user = {},  path=null) => {

    let props = {
        user: {
            currentUser: user,
            isAuthenticated: Object.keys(user).length > 0,
            userPreferences: null,
            isAdmin: false,
            showChatWindow: false,
            showHelpWindow: false,
        },
        setCurrentUser:  f => f,
        setAllUsers: f => f,
        setUserRegistrationStatus: f => f,
        fullyRegistered: false,
       }
       const initialState = {
        user: {},
        users: {}
    }

    store = storeFactory(initialState)
    let wrapper = mount(
        <MemoryRouter initialentries={path}>
            <Provider store={store}>
                <MainRoute {...props}/>
            </Provider>
        </MemoryRouter>
        );
    wrapper = wrapper.find(MainRoute)
    wrapper.setState({
        appLoaded: true
    })
    wrapper = wrapper.update()
    return wrapper
}


describe('MainRoute', () => {
    
    
    it('should load search page if current user is set', () => {
        const user= {
            username: "john",
        }
        let wrapper = setup(user,"{['/']}")
        store.dispatch(setCurrentUser(user))
        let searchPage = wrapper.find('.search-page')
        let authPage = wrapper.find('.auth-page')
        expect(searchPage.length).toBe(1);
        expect(authPage.length).toBe(0);

    })

      it('should load auth page if no current user is set', () => {
        const user= {
        }
        let wrapper = setup(user,"{['/']}")
        store.dispatch(setCurrentUser(user))
        let searchPage = wrapper.find('.search-page')
        let authPage = wrapper.find('.auth-page')
        expect(searchPage.length).toBe(0);
        expect(authPage.length).toBe(1);
    })


})



