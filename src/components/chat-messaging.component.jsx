import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { auth, database, f } from '../services/firebase';
import { AiFillCloseCircle } from 'react-icons/ai';
import { chatWindowHandler } from '../redux/user/user.actions';


const ChatMessage = (props) =>{
    const 
        { 
            text,
            user
        } = props;
    const typeOfMessage = props.user.userId === auth.currentUser.uid ? 'sent' : 'received';

    return(
        <div className={`message ${typeOfMessage}`}>
            { typeOfMessage === 'received' &&
                <div className='message__avatar'>
                    <img src={user.userImage} alt={user.username} />
                </div>
            }
            
            <p className='message__text'>{text}</p>

        </div>
    )
}

class ChatMessaging extends Component {
    dummy = createRef()
    constructor(props) {
        super(props);
        this.state = {
            chatInput: '',
            messages: []
        }
        this.messagesRef = createRef(null)
    }


    componentDidMount() {
       this.getMessages()
        
    }

    componentDidUpdate(prevProps, prevState){
        if(this.props.user !== prevProps.user){
            this.getMessages()
        }
    }

    getMessages = () =>{
        if(this.messagesRef.current){
            this.messagesRef.current.off()
        }
        const currentUserId = auth.currentUser.uid;
        const sentUserId = this.props.user.userId;
        const key = this.chatId(sentUserId, currentUserId)
        this.messagesRef.current = database.ref('messages').child(key)
        

        const query = this.messagesRef.current.orderByChild('createdAt').limitToLast(25)
        query.on('value', snapshot =>{
            const exists = snapshot.val() !== null;
            let messages = []
            let messagesData = snapshot.val()
            if(exists){ 
                for(let k in messagesData){
                    let messageObject = messagesData[k]
                    let timestamp = messageObject.timestamp
                    let text = messageObject.text 
                    let user = messageObject.user
                    let id = k
                    const message = {
                        id,
                        createdAt: timestamp,
                        text,
                        user
                    }
                    messages.push(message)
                }
            }

            this.setState((prevState) =>({
                ...prevState,
                messages: messages.reverse()
            }))
        })
    }


    chatId = (sentUserId, currentUserId) =>{
        const keyArray = []
        keyArray.push(sentUserId)
        keyArray.push(currentUserId)
        keyArray.sort()
        return keyArray.join('_')
    }
    setChatInput =(chatInput) =>{
        this.setState((prevState) =>({
            ...prevState,
            chatInput
        }))
    }

    
    componentWillUnmount(){
        this.messagesRef.current.off()
    }


    sendMessage = async (e) => {
        e.preventDefault();
        const {currentUser} =this.props
        const user ={
            userId: currentUser.userId,
            username: currentUser.username,
            userImage: currentUser.userImage[0]
        }
        console.log(user)
        const {chatInput} =this.state;
        await this.messagesRef.push({
            text: chatInput,
            timestamp: f.database.ServerValue.TIMESTAMP,
            user
        })
        this.dummy.current.scrollIntoView({ behavior: 'smooth' })
        this.setState((prevState) =>({
            ...prevState,
            chatInput: ''
        }))

    }

    render() {
        const {chatInput, messages} = this.state
        const {user, chatWindowHandler} = this.props;
        return (
            <div className='chat'>
                <div className='chat__header'>
                    <div className='chat__avatar'>
                        <img src={user.photoImage} alt={user.username} />
                    </div>
                    <div className='chat__username'>
                        <span className='username'>{user.username}</span>
                    </div>
                    <AiFillCloseCircle className='chat__close'  onClick={ () =>chatWindowHandler(false)}/>
                </div>
                <div className='chat__messages'>
                    {messages && (
                        messages.map((message) =>(
                            <ChatMessage key={message.id} {...message}/>
                        ))
                    )}
                    <span ref={this.dummy}></span>
                </div>
                <form onSubmit={this.sendMessage} className='chat__send'>
                    <input 
                        className='chat__input' 
                        type='text'
                        value={chatInput} 
                        onChange={(e) => this.setChatInput(e.target.value)} />
                    <button className='chat__send-box' disabled={!chatInput}>Send</button>
                </form>
                <div >

                </div>

            </div>
        )
    }
}

ChatMessaging.propTypes = {
    user: PropTypes.object
}

const mapStateToProps = (state) => ({
    currentUser: state.user.currentUser
})

const mapDispatchToProps = {
    chatWindowHandler

}

export default connect(mapStateToProps, mapDispatchToProps)(ChatMessaging)
