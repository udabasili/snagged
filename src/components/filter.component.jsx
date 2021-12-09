import React, { useState } from 'react'
import CustomButton from './custom-button.component'
import { faPlusSquare } from '@fortawesome/free-regular-svg-icons'
import FilterModal from './filter-modal.component'

const filterUsers = (users, isAuthenticated, filter=null) =>{
    
    if (isAuthenticated){
        users = users.filter(user =>(
            user
        ))
    }

    return users

}
export default function Filter({user}) {
    const [showModal, setShowModal] = useState(false)
    let isAuthenticated = user.isAuthenticated
    if(isAuthenticated){
        
    }
    return (
        <div className='filter'>
            {(showModal) &&
                <FilterModal 
                    currentUser={user.currentUser}
                    setShowModal={setShowModal}
                    />
            }
            <CustomButton
                text='filter'
                onClick={() => setShowModal(true)}
                color='green'
                icon={faPlusSquare} />
        </div>
    )
}
