import React,{Component} from 'react'
import { NavLink } from 'react-router-dom'
import Register from './register.component';
import Login from './login.component';

/**
 *
 * The first registration form and the Login form
 * @export AuthForm
 * @param {Object} {...props}
 * @return {JSX} 
 */


export default class AuthForm extends Component {
    constructor(props){
        super(props);
        this.state={
            authType: props.authType,
            isLoading: true
            
        }
    }
    
    render() {
        return (
            <div className='register-form'>
                <nav className='register-form__navigation'>
                    <ul className='register-form__navigation__list'>
                        <li className='register-form__navigation__item'>
                            <NavLink to='/auth/register'
                                className='register-form__navigation__link'
                                activeClassName='active' >
                                Register
                        </NavLink>
                        </li>
                        <li className='register-form__navigation__item'>
                            <NavLink to='/auth/login'
                                className='register-form__navigation__link'
                                activeClassName='active' >
                                Login
                        </NavLink>
                        </li>

                    </ul>
                </nav>
                <React.Fragment>
                    {this.props.authType === 'register' ?
                        <Register {...this.props} /> :
                        <Login  {...this.props}/>
                    }
                </React.Fragment>
            </div>
        )
    }
}


