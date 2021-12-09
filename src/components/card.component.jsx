import { faFacebookMessenger } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faTimesCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react'
import { RiBaseStationLine } from "react-icons/ri";
import { MdFavorite, } from "react-icons/md";
import { addToFavorite, removeFromFavorite } from '../redux/user/user.actions';
import { NavLink } from 'react-router-dom';
import { auth } from '../services/firebase';
import defaultImage from '../assets/images/default.png'

const gridCard = ({
        loadChatWindow,
        favorites=[],
        userImage,
        username,
        userId,
        name,
        age,
        gender,
        removeFromFavoriteHandler,
        addToFavoriteHandler,
        sexuality,
        isOnline,
        occupation,
        user,
    }) =>{
        return (
            <div className='card card--grid'>
                <img className='card__image' alt={name} src={userImage ? userImage[0] : defaultImage}/>
                <h3 className='card__names'>
                    <span className='username'>{username}</span>
                    <span className='name'>{name}</span>
                </h3>
                {isOnline.includes(userId) ?
                    <div className='card__online-status online' title='online' >
                        <RiBaseStationLine/>
                    </div> :
                    <div className='card__online-status offline' title='offline' >
                        <RiBaseStationLine />
                    </div>
                }
                {favorites.includes(userId) &&
                    <div className='card__favorite'  >
                        <MdFavorite />
                    </div>
                }

                {
                    auth.currentUser.uid !== userId &&
                    <ul className='user-option__list'>
                        {favorites.includes(userId) ?
                            <li className='user-option__item'
                                title='Remove  from favorite'
                                onClick={() => removeFromFavoriteHandler(userId)} >
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </li> :
                            <li className='user-option__item' title='Favorite user' onClick={() => addToFavoriteHandler(userId)}>
                                <FontAwesomeIcon icon={faHeart} />
                            </li>
                        }

                        <li className='user-option__item' title='Message user' onClick={() => loadChatWindow({
                            userId: userId,
                            photoImage: userImage[0],
                            username: username
                        })}>
                            <FontAwesomeIcon icon={faFacebookMessenger} />
                        </li>
                    </ul>
                }
                
                
                <div className='card__info'>
                    {age} years
                </div>
                <div className='card__info'>
                    {gender} 
                </div>
                <div className='card__info'>
                    {sexuality}
                </div>
                <div className='card__info'>
                    {occupation}
                </div>
                <NavLink to={`profile/${userId}`}  className='button'>
                    View Profile
                </NavLink>
            </div>
        )

}

const flexCard = ({
        loadChatWindow,
        favorites=[],
        userImage,
        username,
        userId,
        name,
        age,
        gender,
        removeFromFavoriteHandler,
        addToFavoriteHandler,
        occupation,
        tribe,
        sexuality,
        city,
        isOnline,
        user,
    }) =>{

        return(
            <div className='card card--flex'>
                <div  className='card__image'>
                    <img className='image' src={ userImage[0]} alt={username}/>
                    {isOnline.includes(userId) ?
                    <div className='card__online-status online' title='online' >
                        <RiBaseStationLine/>
                    </div> :
                    <div className='card__online-status offline' title='offline' >
                        <RiBaseStationLine />
                    </div>
                }
                {favorites.includes(userId) &&
                    <div className='card__favorite'  >
                        <MdFavorite />
                    </div>
                }

                {
                    auth.currentUser.uid !== userId &&
                    <ul className='user-option__list'>
                        {favorites.includes(userId) ?
                            <li className='user-option__item'
                                title='Remove  from favorite'
                                onClick={() => removeFromFavoriteHandler(userId)} >
                                <FontAwesomeIcon icon={faTimesCircle} />
                            </li> :
                            <li className='user-option__item' title='Favorite user' onClick={() => addToFavoriteHandler(userId)}>
                                <FontAwesomeIcon icon={faHeart} />
                            </li>
                        }

                        <li className='user-option__item' title='Message user' onClick={() => loadChatWindow({
                            userId: userId,
                            photoImage: userImage[0],
                            username: username
                        })}>
                            <FontAwesomeIcon icon={faFacebookMessenger} />
                        </li>
                    </ul>
                }
                
                </div>
                <div className='card__detail'>
                    <h5 className='username'>{username}</h5>
                    <div className='card__info'>
                        {age} years
                    </div>
                    <div className='card__info'>
                        {gender} 
                    </div>
                    <div className='card__info'>
                        {city}
                    </div>
                    <div className='card__info'>
                        {sexuality}
                    </div>
                    <div className='card__info'>
                        {tribe}
                    </div>
                    <div className='card__info'>
                        {occupation}
                    </div>
                    <NavLink to={`profile/${userId}`}  className='button'>
                        View Profile
                    </NavLink>
                </div>
            </div>
        )
    
}
export default function Card({
        loadChatWindow,
        favorites=[],
        cardType='column',
        isOnline,
        user,
    }) {

        const addToFavoriteHandler = (userId) =>{
            addToFavorite(userId)
        }

         const removeFromFavoriteHandler = (userId) =>{
            removeFromFavorite(userId)
        }

     return (
         <React.Fragment>
             {
                 cardType === 'grid' ?
                 gridCard({...user, 
                        removeFromFavoriteHandler, 
                        addToFavoriteHandler, 
                        loadChatWindow,
                        isOnline,
                        favorites
                    })  :
                 flexCard({
                    ...user, 
                    removeFromFavoriteHandler, 
                    addToFavoriteHandler, 
                    loadChatWindow,
                    isOnline,
                    favorites
                })


             }
         </React.Fragment>
        
    )
}
