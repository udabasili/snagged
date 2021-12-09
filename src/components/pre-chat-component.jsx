import React from 'react'
import {
    faTimes
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CustomButton from './custom-button.component';
import { faThumbsUp } from '@fortawesome/free-regular-svg-icons'


export default function PreChat({
    loadUserChatWindow,
    usersAreCompatible =true, 
    closeHandler}) {
    const questions = [
        'What Are Your Life Goals? What Motivates You to Get Up in the Morning?',
        'Who’s Your Biggest Role Model in Life?',
        'What’s Your Most Bizarre Talent?',
        'What’s Your Most Bizarre Talent?',
        'What’s Your Most Bizarre Talent?',
        'What’s Your Most Bizarre Talent?'
    ]
    

    return (
        <div className='pre-chat matched'>
            {
                usersAreCompatible ?
                <div className='pre-chat-modal matched'>
                    <div className='close-button' onClick={closeHandler}>
                        <FontAwesomeIcon icon={faTimes}  />
                    </div>
                    <h3 className='pre-chat-modal__header'>You Matched 😊</h3>
                    <div className='pre-chat-modal__content u-margin-top-small'>
                        <h3 className='header-tertiary'> Here are great questions your match would love you to ask</h3>
                        <ul className='questions'>
                            {
                                questions.map((q, index) =>(
                                    <li className='question' key={index}>
                                        {q}
                                    </li>
                                ))
                            }
                        </ul>

                    </div>
                    <CustomButton
                        text='ok'
                        color='green'
                        onClick={loadUserChatWindow}
                        icon={faThumbsUp} />

                </div> :
                <div className='pre-chat-modal not-matched'>
                    <div className='close-button'>
                            <FontAwesomeIcon icon={faTimes}  onClick={closeHandler}/>
                        </div>
                        <h3 className='pre-chat-modal__header'>Opps!</h3>
                        <div className='pre-chat-modal__content u-center-text u-margin-top-medium'>
                             <p className='paragraph '>
                                 <span>
                                     Sorry, You don 't meet this user's requirement.
                                </span>
                                 <span>
                                     Please try another user 😊
                                </span>
                                
                            </p>
                        </div>
                       
                </div>

            }
        </div>
    )
}
