import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import {
    faCheck,
    faCheckCircle,
    faTimes
} from '@fortawesome/free-solid-svg-icons';

export default function Modal({
    title,
    children,
    hideCloseButton=false,
    hideOkButton=false,
    isLoading=false,
    subHeader=null,
    closeHandler=f=>f,
    submitHandler=f=>f
}) {
    return (
        <div className="modal">
            <div className='modal__content'>
                <div className='modal__header'>
                    <h2 className='header-secondary'>
                        {title}
                    </h2>
                    {subHeader&&
                        subHeader
                    }
                    {!hideCloseButton &&
                        <div className='close-button' onClick={closeHandler}>
                            <FontAwesomeIcon icon={faTimes}  />
                        </div>
                    }
                    {!hideOkButton &&
                        <div className='ok-button' onClick={submitHandler}>
                            <FontAwesomeIcon icon={faCheck} />
                        </div>
                    }
                    
                </div>
                    <div className='modal__body'>
                        {isLoading ? 
                        <div className='modal__body--loading' /> :
                            children
                        }
                    </div>          
            </div>
        </div>
    )
}
