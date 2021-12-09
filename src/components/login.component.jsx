import React, { Component } from 'react';
import { auth } from '../services/firebase';
import { toast } from 'react-toastify';
import Loading from './loading.component';
import { setUserRegistrationStatus } from '../redux/user/user.actions';
import { connect } from 'react-redux';

class Login extends Component {
    constructor(props){
        super (props);
        this.state={
            isLoading: false,
            loginData:{
                email: '',
                password: ''
            }
        }
    }

    /**
     *
     * This handles changing the input as we type
     * @param {Object} e
     * @memberof RegisterForm
     * @returns 
     */
    onChangeHandler = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            ...prevState,
            loginData: {
                ...prevState.loginData,
                [name]: value
            }
        }))
    }

    onSubmit = (e) => {
        const { setUserRegistrationStatus } = this.props;
        e.preventDefault();
        this.setState((prevState) =>({
            ...prevState,
            isLoading: true
        }))
        const { email, password } = this.state.loginData;
        auth.signInWithEmailAndPassword(
                email.trim(),
                password
            ).then(async (response) => {
                setUserRegistrationStatus(true)
                this.setState((prevState) => ({
                    ...prevState,
                    isLoading: false
                }))
            })
            .catch((error) => {
                this.setState((prevState) => ({
                    ...prevState,
                    isLoading: false
                }))
                toast.error(error.message)
            })
    }

    render() {
        const {loginData, isLoading} = this.state;
        return (
            <form className='register-form__form' onSubmit={this.onSubmit}>
                {isLoading && <Loading/>}
                    <div className='form__control'>
                        <label htmlFor='email' className='form__label'>
                            Email
                        </label>
                        <input type='email' 
                            className='form__input' 
                            name='email' 
                            id='email' 
                            onChange={this.onChangeHandler}
                            value={loginData.email}
                            required
                            placeholder='Input your email' />
                    </div>
                    <div className='form__control'>
                        <label htmlFor='password' className='form__label'>
                            Password
                        </label>
                        <input type='password'
                            className='form__input '
                            name='password'
                            id='password' 
                            onChange={this.onChangeHandler}
                            value={loginData.password}
                            required
                            placeholder='Input your password' />
                    </div>
                    <input
                        type='submit'
                        className='button--submit u-margin-medium'
                        value='Submit' />
                </form>
        );
    }
}


const mapDispatchToProps = {
    setUserRegistrationStatus
}

export default connect(null, mapDispatchToProps)(Login);
