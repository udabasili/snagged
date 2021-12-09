import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

export default function CustomButton({icon=null, text, color, ...rest}) {
    return (
        <button className='custom-button'  {...rest} style={{
            backgroundColor: color,
            borderColor: `dark${color}`
        }}>
            <span className='custom-button__text'>{text}</span>
            <span className='custom-button__icon'>
                <FontAwesomeIcon icon={icon} />
            </span>
        </button>
    )
}
