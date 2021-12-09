import React from 'react'
import { connect } from 'react-redux'
import Card from './card.component'

function CardList({ 
    users, 
    currentUser,
     isOnline , 
     loadChatWindow, 
    cardType,
     setAllUsersHandler}) {
        return (
            <div className={`card-list ${cardType}`}>
                {users && users.map((user) =>(
                    <Card 
                        key={user.userId} 
                        favorites={currentUser.favorites} 
                        isOnline={isOnline}
                        setAllUsersHandler={setAllUsersHandler}
                        loadChatWindow={loadChatWindow}
                        cardType={cardType}
                        user={user}
                        />
                ))}
            </div>
        )
}

const mapStateToProps = (state) => ({
    usersCount: state.users.usersCount,


})



export default connect(mapStateToProps, null)(CardList)