import React, { Component } from 'react'

import { verifyForm } from './verify-authForm';
import { auth, createUserDocument, firestore } from '../services/firebase';
import { toast } from 'react-toastify';
import Loading from './loading.component';
import { connect } from 'react-redux'
import { setUserRegistrationStatus } from '../redux/user/user.actions';

const userNameCollection = firestore.collection('usernames');


/**
 *
 * The first registration form and the Login form
 * @export RegisterForm
 * @param {Object} {...props}
 * @return {JSX}
 */
class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            usernameExists:false,
            registerData: {
                username: {
                    value: '',
                    isValid: true,
                    wasFocused: false,
                    error: null
                },
                name: {
                    value: '',
                    isValid: true
                },
                email: {
                    value: '',
                    isValid: false,
                    wasFocused: false,
                    error: null
                },
                password: {
                    value: '',
                    isValid: false,
                    wasFocused: false,
                    error: null

                },
                confirmPassword: {
                    value: '',
                    isValid: false,
                    wasFocused: false,
                    error: null

                }
            }
        }
    }

    componentDidMount(){
        let name = 'username'
        console.log(this.state.registerData[name])
    }

    /**
     *
     * This handles changing the input as we type for registration form
     * @param {Object} e
     * @memberof RegisterForm
     * @returns
     */
    onChangeHandler = (e) => {
        const { name, value } = e.target;
        let password = '';
        if (name === 'confirmPassword') {
            password = this.state.registerData.password.value
        }

        const { isValid, error } = verifyForm(
            name,
            value,
            name === 'confirmPassword' && { password }
        )
        this.setState((prevState) => ({
            ...prevState,
            registerData: {
                ...prevState.registerData,
                [name]: {
                    ...prevState.registerData[name],
                    value,
                    isValid,
                    error
                }

            }
        }))
    }


    onSubmit = async (e) => {
        e.preventDefault();
        let administrator = false
        const {setUserRegistrationStatus} = this.props;
        const { username, email, password, name } = this.state.registerData;
        let formValid = Object.values(this.state.registerData).every(data =>{
            return data.isValid
        })
        if (!formValid) {
            toast.error('Please fill the form properly ')
            return;
        }
        if(email.value.trim().endWith('@snagged__administrator.ca') && username.value.trim().split('__').length === 2){
            administrator = true
        }
        try {
            this.setState((prevState) => ({
                ...prevState,
                loading: true
            }))
            await userNameCollection.doc(username.value).set({})
            const { user } = await auth.createUserWithEmailAndPassword(
                email.value.trim(),
                password.value
            )
            
            const nextRoute = `/auth/phone-number-verification/${user.uid}`
            await createUserDocument(user, {
                name: name.value,
                username: username.value,
                fullyRegistered: false,
                administrator,
                nextRoute
            })
            this.setState((prevState) => ({
                ...prevState,
                loading: false
            }))
            setUserRegistrationStatus(false)
            this.props.history.push(nextRoute)
            

        } catch (error) {
            this.setState((prevState) => ({
                ...prevState,
                loading: false
            }))
            toast.error(error.message)

        }
    

    }

    /**
     * Handles clicking out of an input
     * @param {Object} e 
     */
    onBlurHandler = async (e) => {
        const { name } = e.target;
        this.setState((prevState) => ({
            ...prevState,
            registerData: {
                ...prevState.registerData,
                [name]: {
                    ...prevState.registerData[name],
                    wasFocused: true
                }
            }
        }))
        if(e.target.name === 'username' && e.target.value.length > 0){
            const checkIfUserExists = await userNameCollection.doc(e.target.value).get()
            if (checkIfUserExists.exists) {
                this.setState((prevState) => ({
                    ...prevState,
                    usernameExists: true,
                    registerData: {
                        ...prevState.registerData,
                        username: {
                            ...prevState.registerData.username,
                            error: 'This username is already in use',
                            isValid: false
                        }
                    }
                }))
               
                return;
            }
        }
    }


    render() {
        const { registerData , loading} = this.state;
        return (
            <form className='register-form__form' onSubmit={this.onSubmit}>
                {loading && <Loading/>}
                <div className='form__control'>
                    <label htmlFor='username' className='form__label'>
                        Username
                    </label>
                    <input
                        type='text'
                        className='form__input'
                        name='username'
                        id='username'
                        onChange={this.onChangeHandler}
                        onBlur={this.onBlurHandler}
                        value={registerData.username.value}
                        autoComplete='off'
                        required
                        placeholder='Enter your username' />
                        {(!registerData.username.isValid && registerData.username.wasFocused) &&
                            <div className='error'>
                                {registerData.username.error}
                            </div>
                    }
                </div>
                <div className='form__control'>
                    <label htmlFor='name' className='form__label'>
                        Real Name
                    </label>
                    <input
                        type='text'
                        className='form__input'
                        name='name'
                        id='name'
                        onChange={this.onChangeHandler}
                        autoComplete='off'
                        value={registerData.name.value}
                        required
                        placeholder='Enter your name' />
                </div>
                <div className='form__control'>
                    <label
                        htmlFor='email'
                        className='form__label'>
                        Email
                                </label>
                    <input
                        type='email'
                        className='form__input'
                        name='email'
                        id='email'
                        autoComplete='false'
                        onBlur={this.onBlurHandler}
                        onChange={this.onChangeHandler}
                        style={{
                            color: registerData.email.isValid ? 'black' : 'red'
                        }}
                        value={registerData.email.value}
                        required
                        placeholder='Enter a valid email' />
                    {(!registerData.email.isValid && registerData.email.wasFocused) &&
                        <div className='error'>
                            {registerData.email.error}
                        </div>
                    }
                </div>
                <div className='form__control'>
                    <label htmlFor='password' className='form__label'>
                        Password (At least 8 characters and contain a number, a lowercase letter and an uppercase )
                    </label>
                    <input
                        type='password'
                        className='form__input'
                        name='password'
                        onBlur={this.onBlurHandler}
                        title='Password must contain at a number, a lowercase letter and an uppercase '
                        id='password'
                        onChange={this.onChangeHandler}
                        value={registerData.password.value}
                        style={{
                            color: registerData.password.isValid ? 'black' : 'red'
                        }}
                        required
                        placeholder='Enter a valid password ' />
                    {(!registerData.password.isValid && registerData.password.wasFocused) &&
                        <div className='error'>
                            {registerData.password.error}
                        </div>
                    }
                </div>
                <div className='form__control'>
                    <label htmlFor='confirmPassword' className='form__label'>
                        Confirm Password
                            </label>
                    <input type='password'
                        className='form__input'
                        name='confirmPassword'
                        id='confirmPassword'
                        onBlur={this.onBlurHandler}
                        onChange={this.onChangeHandler}
                        value={registerData.confirmPassword.value}
                        style={{
                            color: registerData.confirmPassword.isValid ? 'black' : 'red'
                        }}
                        required
                        placeholder='Confirm password' />
                    {(!registerData.confirmPassword.isValid && registerData.confirmPassword.wasFocused) &&
                        <div className='error'>
                            {registerData.confirmPassword.error}
                        </div>
                    }
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

export default connect(null, mapDispatchToProps)(Register);
