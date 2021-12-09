import React, { Component } from 'react'
import Modal from '../../components/modal.component'
import PhoneInput from 'react-phone-input-2'
import {  auth, f, firestore } from '../../services/firebase';
import { toast } from 'react-toastify';
import Loading from '../../components/loading.component';
import { connect } from 'react-redux';

/**
 *This is for the phone number verification
 *
 * @class PhoneNumberVerificationPage
 * @extends {Component}
 * @returns {JSX.Element}
 */

class PhoneNumberVerificationPage extends Component {
    constructor(props){
        super(props);
        this.state={
            userId: props.match.params ? props.match.params.userId : null,
            verificationCodeSent: false,
            disablePhoneInput: false,
            phoneCode: null,
            isLoading: false,
            phone:'',
            confirmationResult:null,
            numberisValid: false,

            
        }
    }

    /**
     *
     *Handles change for phone number input
     * @param {Number} phone
     * @memberof PhoneNumberVerificationPage
     */
    onChangeHandler = (phone) =>{
        this.setState({
            phone
        })
    }

    /**
     *
     * Handles change for OTP input after it is sent to  the phone number
     * @param {Object} e
     * @memberof PhoneNumberVerificationPage
     */
    onChangeHandlerOtp = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) =>({
            ...prevState,
            [name]: value
        }))
    }

   
    /**
     *
     * The submission of the otp for verification
     * @memberof PhoneNumberVerificationPage
     */
    OnSubmit = async () =>{
        const {confirmationResult, userId, phoneCode} = this.state;
        this.setState((prevState) => ({
            ...prevState,
            isLoading: true,
        }))
        try {
            if (!confirmationResult){
                this.setState((prevState) => ({
                    ...prevState,
                    verificationCodeSent: false,
                    isLoading: false,
                    disablePhoneInput: false,
                    phoneCode: null,
                    confirmationResult: null,
                }))

                throw new Error("Something went wrong try again ")
            }


            await confirmationResult.confirm(phoneCode)
            
            toast.success('Phone number verified')
            await firestore.doc(`users/${userId}`).update({
                nextRoute: `/auth/user-info/${userId}/add`
            })
            this.setState((prevState) => ({
                ...prevState,
                verificationCodeSent: false,
                isLoading: false,
            }))
            this.props.history.push(`/auth/user-info/${userId}/add`)
        } catch (error) {
            if (error.code === "auth/invalid-verification-code"){
                error.message = 'Code is invalid'
            }
            this.setState((prevState) => ({
                ...prevState,
                verificationCodeSent: false,
                isLoading: false,
                disablePhoneInput: false,
                phoneCode: null,
                confirmationResult: null,
            }))
            toast.error(error.message)
        } 
          
    }

    /**
     *
     * Sends the verification code to phone
     * @memberof PhoneNumberVerificationPage
     * @returns {null}
     */
    sendVerificationCode = async () => {
        
        const {phone} = this.state;
        let phoneNumber = "+" + phone.toString();
        if (this.applicationVerifier && this.recaptchaWrapperRef) {
            this.applicationVerifier.clear()
            this.recaptchaWrapperRef.innerHTML = `<div id="button-small"/>`
        }

        // Initialize new reCaptcha verifier

        this.applicationVerifier = new f.auth.RecaptchaVerifier('button-small',{
            size: 'invisible',
        });
        if(!phone){
            toast.error("You must put in a phone number")
            return;
        }
      
        this.setState((prevState) => ({
            ...prevState,
            isLoading: true,
            disablePhoneInput: true,
            phoneCode: null,
            })
        )

        auth.currentUser.linkWithPhoneNumber(phoneNumber, this.applicationVerifier)
            .then(async (confirmationResult) => {
                this.setState((prevState) => ({
                    ...prevState,
                    verificationCodeSent: true,
                    isLoading: false,
                    confirmationResult
                }))

                return;
            })
            .catch((error) =>{
                this.setState((prevState) => ({
                    ...prevState,
                    verificationCodeSent: false,
                    isLoading: false,
                    disablePhoneInput: false,
                    phoneCode: null,
                    confirmationResult: null,
                }))
                this.setState((prevState) => ({
                    ...prevState,
                    isLoading: false,
                }))
                toast.error(error.message)
            })
           

       
        
       
      
    }

    /**
     *
     * Resets the phone number and hides the otp input
     * @memberof PhoneNumberVerificationPage
     */
    resendCode = () =>{
        this.setState((prevState) =>({
            ...prevState,
            verificationCodeSent: false,
            disablePhoneInput: false,
            phoneCode: null,
        }))
    }

    render() {
        const {isLoading, verificationCodeSent, disablePhoneInput, phoneCode} = this.state
        return (
            <div className='phone-number-verification-page'>
                {isLoading && <Loading/>}
                <Modal title='Verify Phone Number' hideCloseButton hideOkButton >
                    <PhoneInput
                        country={'us'}
                        value={this.state.phone}
                        disabled={disablePhoneInput}
                        onChange={this.onChangeHandler}
                    />
                    <div ref={ref => this.recaptchaWrapperRef = ref}>
                        <div id="button-small"/>
                    </div>
                    { verificationCodeSent &&
                        <div className='otp'>
                            <input className='otp__input' 
                                value={phoneCode} 
                                type='text' 
                                name='phoneCode'
                                maxLength={6} 
                                onChange={this.onChangeHandlerOtp}
                                placeholder='Enter Code Here' />
                            <div className='otp__message'>
                                <span className='question'> Didn't receive the Code?</span>
                                <span className='resend' onClick={this.resendCode}>Resend</span>
                            </div>
                        </div>
                    }
                    
                    {
                        verificationCodeSent ?
                            <button 
                                onClick={this.OnSubmit} 
                                id='button-small'
                                className='button--submit  '>Submit</button> :
                            <button
                                onClick={this.sendVerificationCode}
                                id='button-small'
                                className='button--submit u-margin-medium'>Send Code</button>
                    }
                    
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    user:  state.user
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(PhoneNumberVerificationPage)
