import React  from 'react'
import { Route, Switch, withRouter } from 'react-router-dom';
import './assets/sass/main.scss'
import Navigation from './components/navigation.component';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/footer.component';
import { analytics, auth , createUserDocument} from './services/firebase';
import { connect } from 'react-redux'
import { setCurrentUser , checkUserOnlineStatus, setUserRegistrationStatus } from './redux/user/user.actions';
import RegistrationRoutes from './pages/registration/registration.routes';
import {ProtectedRoute, AdminRoute} from './components/protected-route.component';
import StartUp from './components/start-up.component';
import MessagePage from './pages/message.page';
import SubscriptionPage from './pages/subscription.page';
import ProfilePage from './pages/profile.page';
import SearchPage from './pages/search.page';
import { setAllUsers } from './redux/users/users.action';
import { ChatButtonWithRedux } from './components/chat.component';
import PropTypes from 'prop-types';
import HelpPage from './pages/help.page';
import Admin from './pages/admin/admin';


export class MainRoute extends React.PureComponent {
    
    constructor(props){
        super(props);
        this.state={
            appLoaded: false,
            drop: false
        }

    }

    componentDidMount() {
        analytics.setCurrentScreen(window.location.pathname)
        analytics.logEvent('screen_view')
        const { history, setCurrentUser,  setUserRegistrationStatus} = this.props
        window.addEventListener("focus", this.onFocus)
        this.unsubscribe = auth.onAuthStateChanged(async user => {
            try {
                if (user) {
                    const userData = await createUserDocument(user)
                    if (!userData.fullyRegistered) {
                        setUserRegistrationStatus(false)
                        setCurrentUser({})

                        this.setState((prevState) => ({
                            ...prevState,
                            appLoaded: true
                        }))
                        history.push(userData.nextRoute)
                        return;
                    }else{
                        setCurrentUser(userData)
                        setUserRegistrationStatus(true)
                        history.push('/')
                    }
                } else {
                    setCurrentUser({})
                }
                this.setState((prevState) =>({
                    ...prevState,
                    appLoaded: true
                }))

            } catch (error) {
                this.setState((prevState) => ({
                    ...prevState,
                    appLoaded: true
                }))
                console.log(error)
            }

        })
    }

    componentWillUnmount() {
        this.unsubscribe()
        window.removeEventListener("focus", this.onFocus)
        checkUserOnlineStatus()
    }

    onFocus = () =>{
        console.log('changed focus')
    }

    

    render() {
        const {  user, fullyRegistered, setCurrentUser } = this.props
        
        const {appLoaded} = this.state
        return (
            !this.state.appLoaded ?
                <StartUp /> :
                <main>
                    <ToastContainer
                        position="top-center"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    <Navigation 
                        isAuthenticated={user.isAuthenticated} 
                        user={user}
                        setCurrentUser={setCurrentUser}
                        currentUser={user.currentUser} 
                        fullyRegistered={user.fullyRegistered} />
                    <Switch>

                        <Route path='/auth'
                            render={(props) => <RegistrationRoutes {...props} isAuthenticated={user.isAuthenticated} />}
                        />
                        <Route path='/help' component={HelpPage}/>
                        <ProtectedRoute
                            exact
                            path='/messages'
                            fullyRegistered={fullyRegistered}
                            currentUser={user.currentUser}
                            isAuthenticated={user.isAuthenticated} component={MessagePage} />
                        <ProtectedRoute
                            exact
                            path='/profile/:userId'
                            currentUser={user.currentUser}
                            fullyRegistered={fullyRegistered}
                            isAuthenticated={user.isAuthenticated}
                            component={ProfilePage} />
                        <ProtectedRoute
                            exact
                            path='/'
                            fullyRegistered={fullyRegistered}
                            currentUser={user.currentUser}
                            isAuthenticated={user.isAuthenticated}
                            component={SearchPage} />
                        <ProtectedRoute
                            currentUser={user.currentUser}
                            fullyRegistered={fullyRegistered}
                            isAuthenticated={user.isAuthenticated}
                            path='/subscription'
                            component={SubscriptionPage} />
                        <AdminRoute
                            currentUser={user.currentUser}
                            isAuthenticated={user.isAuthenticated}
                            path='/admin'
                            component={Admin} />
                    </Switch>
                    {user.isAuthenticated &&
                        <ChatButtonWithRedux />
                    }
                    <Footer />
                </main>
        )
    }
}

MainRoute.propTypes ={
    user: PropTypes.object,
    setCurrentUser: PropTypes.func,
    setAllUsers : PropTypes.func
}


const mapStateToProps = (state) => ({
    user: state.user,
    fullyRegistered: state.user.fullyRegistered

})

const mapDispatchToProps = {
    setCurrentUser,
    setAllUsers,
    setUserRegistrationStatus
    
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainRoute))

