import React, { useState , useEffect} from 'react'
import { BsChatFill, BsSearch } from "react-icons/bs";
import { connect } from 'react-redux'
import { chatWindowHandler } from '../redux/user/user.actions';
import { AiFillCloseCircle } from "react-icons/ai";
import { f, database, auth } from '../services/firebase';
import ChatMessaging from './chat-messaging.component';
import defaultImage from '../assets/images/default.png'

let mapStateToProps = (state) => ({
    showChatWindow: state.user.showChatWindow,
    currentUser: state.user.currentUser,
})

const mapDispatchToProps = (dispatch) => ({

    chatWindowHandler: () => dispatch(chatWindowHandler()),

})

const ChatButton = ({ chatWindowHandler, showChatWindow}) => {
    return(
 
        showChatWindow ?
            <div className="chat__icon" onClick={ () =>chatWindowHandler()}>
                <AiFillCloseCircle />
            </div> :
            <div className="chat__icon" onClick={chatWindowHandler}>
                <BsChatFill />
            </div>
    )
}



export const ChatButtonWithRedux =  connect(mapStateToProps, mapDispatchToProps)(ChatButton)


const ChatWindow = ({ user=null , showChatWindow, isOnline, onlineStatus, users}) => {
    const [search, setSearch] = useState('')
    const [filteredUsers, setFilteredUsers ] = useState(users)
    const [selectedUser, setSelectedUser ] = useState(user)
    useEffect(() => {
        setSelectedUser(user)
    }, [user])

    
    useEffect(() => {
        let u = users.filter((user) =>{
            if(!search){
                return user
            }
            return user.username.toLowerCase().includes(search.toLowerCase())
        })

        setFilteredUsers(u)
    }, [search, users])



    return (
        showChatWindow &&
            <div className='chat-window'>
                {selectedUser &&
                    <ChatMessaging user={selectedUser} />
                }
                
                <div className='chat-history'>
                    <div className='users__search'>
                        <input type='type' placeholder='Search' value={search} onChange={(e) => setSearch(e.target.value)} />
                        <BsSearch />
                    </div>
                    <ul className='users__list'>
                        {(filteredUsers && filteredUsers.length > 0) && (
                            filteredUsers.map((user) =>{
                                if(user.userId !== auth.currentUser.uid){
                                    return ( <li key={user.userId} className='user__item' onClick={() => setSelectedUser({
                                        userId: user.userId,
                                        photoImage: user.userImage ? user.userImage[0] : defaultImage,
                                        username: user.username
                                    })}>
                                        <div className='user__image'>
                                            <div className='user__avatar'>
                                                <img src={user.userImage ? user.userImage[0] : defaultImage} alt={user.username} />
                                            </div>
                                            <span 
                                                className={`status-icon ${isOnline.includes(user.userId) ? 'online' : 'offline'}`}>
                                            </span>
                                        </div>

                                        <p className='user__detail'>
                                            <span className='username'>{user.username}</span>
                                            <span className='status'>
                                                {isOnline.includes(user.userId) ? 'online' : 'offline'}
                                            </span>
                                        </p>

                                    </li>
                                    )}
                                
                            })
                            
                        )}
                        
                    </ul> 
                </div>
                
            </div>
        
    )
}




export const ChatWindowWithRedux = connect(mapStateToProps, null)(ChatWindow)