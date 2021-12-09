import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { checkUserOnlineStatus } from '../redux/user/user.actions'
import { auth } from '../services/firebase'
import Help from './help.component'
import { RiNotification4Fill } from 'react-icons/ri';
import { IoMdLogOut } from 'react-icons/io';


/**
 *Navigation component
 *
 * @export 
 * @param {String} {isAuthenticated}
 * @return {JSX.Element} 
 */
export default function Navigation({ isAuthenticated, user, fullyRegistered, setCurrentUser, currentUser}) {

    const location = useLocation();
    function logout(){
        checkUserOnlineStatus()
        auth.signOut()
            .then(() =>{
                setCurrentUser({})
                toast.success('Signed out successfully')
            })
            .catch((error) =>{
                toast.error(error.message)
            })
        }
        
    return (
        <React.Fragment>
            <Help/>
             <div className='navigation'>
            <div className='navigation__logo'>
                <span className='app'>snagged</span>
            </div>
            <input type='checkbox' id='navigation' className='navigation__checkbox'/>
            <label htmlFor='navigation' className='navigation__button'>
                <span className='navigation__icon'>&nbsp;</span>
            </label>
            <nav className='navigation__nav'>
                <ul className='navigation__list'> 
                    {(isAuthenticated && fullyRegistered) &&   
                        <React.Fragment>
                             
                            <li className='navigation__item'>
                                <NavLink to='/' exact className='navigation__link' activeClassName='active-nav'>
                                    Search
                                </NavLink>
                            </li>
                            <li className='navigation__item'>
                                <NavLink to='/admin' exact                        
                                isActive={() => location.pathname.includes('admin')}
                                className='navigation__link' activeClassName='active-nav'>
                                    Admin
                                </NavLink>
                            </li>
                                <li className='navigation__item'>
                                    <NavLink to='/messages' className='navigation__link' activeClassName='active-nav'>
                                        Message
                                </NavLink>
                                </li>

                                
            
                            <li className='navigation__item'>
                                <NavLink to='/subscription' className='navigation__link' activeClassName='active-nav'>
                                    Subscription
                                </NavLink>
                            </li>
                            
                    </React.Fragment>
                    }
                    {!isAuthenticated &&
                        <React.Fragment>
                            <li className='navigation__item'>
                                <NavLink to='/auth/register' className='navigation__link' activeClassName='active-nav'>
                                    Register
                                </NavLink>
                            </li>
                            <li className='navigation__item'>
                                <NavLink to='/auth/login' className='navigation__link' activeClassName='active-nav'>
                                    Login
                                </NavLink>
                            </li>
                        </React.Fragment>
                        
                    }
                    
                </ul>
               
            </nav>
            {
                (isAuthenticated && fullyRegistered) &&  (
                     <div className='user-nav'>
                        <div className='user-nav__avatar' title='profile'>
                            <NavLink to={`/profile/${user.currentUser.userId}`} 
                                activeClassName='active-nav'>
                                <img alt={currentUser.username} src={currentUser.userImage[0]}/>
                            </NavLink>
                        </div>
                        <div className='user-nav__icon' >
                            <NavLink to={`/profile/${user.currentUser.userId}`} 
                                activeClassName='active-nav'>
                                <RiNotification4Fill/>
                            </NavLink>
                        </div>
                        <div className='user-nav__icon' onClick={logout} title='logout'>
                            <IoMdLogOut/>
                        </div> 
                    </div>
                )
            }
            
            
        </div>
        </React.Fragment>
       
    )
}
