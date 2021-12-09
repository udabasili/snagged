import { faPhone } from '@fortawesome/free-solid-svg-icons';
import React, {useState} from 'react'
import { BiHelpCircle } from 'react-icons/bi';
import { FaWindowClose } from 'react-icons/fa';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { helpWindowHandler } from '../redux/user/user.actions';
import CustomButton from './custom-button.component';
import Chatbot from 'react-chatbot-kit'
import MessageParser from './chatbot/message-parser';
import ActionProvider from './chatbot/action-provider';
import config from './chatbot/config';


function Help({helpWindowHandler, showHelpWindow}) {

    const [chatInput, setChatInput] = useState('')

    const sendMessage = () =>{

    }

    return (
        <div className='help'>
            <NavLink to='/help' activeClassName={null}>
                <BiHelpCircle className='help__icon'/>
            </NavLink>
            <CustomButton text='helpline'
                onClick={() => helpWindowHandler(true)}
                color='green'
                icon={faPhone} />
            {
                showHelpWindow &&
                <div className='help__window'>
                    <FaWindowClose 
                        onClick={() => helpWindowHandler(false)}
                        className='close-button'/>
                    {/* <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />  */}
                    <form onSubmit={sendMessage} className='chat__send'>
                        <input 
                            className='chat__input' 
                            type='text'
                            value={chatInput} 
                            onChange={(e) => setChatInput(e.target.value)} />
                        <button className='chat__send-box' disabled={!chatInput}>Send</button>
                    </form>
                </div>

            }
            
        </div>
    )
}

const mapStateToProps = (state) => ({
	showHelpWindow : state.user.showHelpWindow
})

const mapDispatchToProps = {
	helpWindowHandler
}

export default connect(mapStateToProps, mapDispatchToProps)(Help);