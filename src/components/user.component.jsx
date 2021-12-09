import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'


export default function User({userData, hobbies, onlineStatus}) {
    const [ buttonText , setButtonText] = useState('Show More')
    useEffect(() => {
        const button = document.querySelector(".show")
        button.addEventListener('click', tableToggle)

        return () =>{
            button.removeEventListener('click', tableToggle)
        }
    }, [])

    function tableToggle(){
        const tableBody = document.querySelector('tbody')
        console.log(tableBody.style.display)
        if(tableBody.style.display === 'contents'){
            tableBody.style.display = 'none'
            setButtonText('Show More')
        }else{
            tableBody.style.display = 'contents'
            setButtonText('Show Less')
        }
    }
    return (
        <React.Fragment>
            <div className='user__summary'>
                <div className='content'>
                    <h3 className='header-tertiary u-margin-small'>
                        Bio
                    </h3>
                    <p className='paragraph'>
                        {userData.bioContent}
                    </p>

                </div>
                <div className='content'>
                    <h3 className='header-tertiary u-margin-small'>
                        Hobbies
                    </h3>
                
                    {hobbies &&
                        <span className="select-pure__select " >
                        {hobbies.map((hobby, index) => (
                            <span className='select-pure__label' key={index} id={hobby}>
                                <span className='select-pure__selected-label'>
                                    {hobby}
                                </span>
                            </span>
                        ))}
                        </span>
                    }
                </div>
                <div className='content'>
                    <h3 className='header-tertiary u-margin-small'>
                        Status
                    </h3>
                    <ul className='user__status--list'>
                        <li className='user__status--item'>
                            <span className='label'>Joined :</span>
                            <span className='value'>{userData.timeAgo}</span>
                        </li>
                        {
                            onlineStatus && 
                                <React.Fragment>
                                    {
                                        onlineStatus.state === 'offline' &&
                                        <li className='user__status--item'>
                                            <span className='label'>Last Online :</span>
                                            <span className='value'>{onlineStatus.lastLogin}</span>
                                        </li>
                                    }
                                    
                                    <li className='user__status--item'>
                                        <span className='label'>Status :</span>
                                        <span className='value'>{onlineStatus.state}</span>
                                    </li>
                                </React.Fragment>
                        }
                        
                    </ul>
                </div>
            </div>
            <div className='user__info' >
                <div className='show' >
                    <span className='show__text'>{buttonText}</span>
                    <span className='show__icon'>
                        <FontAwesomeIcon icon={buttonText === 'Show More' ? faPlusCircle : faMinusCircle} />  
                    </span>
                </div> 
                <table >
                    <thead>
                        <tr>
                            <th colSpan='2'>
                                About {userData.username}
                            </th>
                           

                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td>
                                Name
                            </td>
                            <td>
                                {userData.name}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Username
                            </td>
                            <td>
                                {userData.username}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Age
                            </td>
                            <td>
                                {userData.age}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Gender
                            </td>
                            <td>
                                {userData.gender}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Tribe
                            </td>
                            <td>
                                {userData.tribe}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Sexuality
                            </td>
                            <td>
                                {userData.sexuality}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Religion
                            </td>
                            <td>
                                {userData.religion}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Occupation
                            </td>
                            <td>
                                {userData.occupation}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Education
                            </td>
                            <td>
                                {userData.education}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                City
                            </td>
                            <td>
                                {userData.city}
                            </td>
                        </tr> 
                        <tr >
                            <td>
                                Province/State
                            </td>
                            <td>
                                {userData.province}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Marital Status
                            </td>
                            <td>
                                {userData.marital}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Country
                            </td>
                            <td>
                                {userData.country}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Do you drink?
                            </td>
                            <td>
                                {userData.drinker}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Do you have children?
                            </td>
                            <td>
                                {userData.children}
                            </td>
                        </tr>
                        <tr >
                            <td>
                                Do you smoke?
                            </td>
                            <td>
                                {userData.smoker}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}
