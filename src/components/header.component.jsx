import React from 'react'
import AuthForm from './authform.component'

export default function Header({...props}) {
    return (
        <header className='header'>
            <div className='header__background' />
            <div className='text-box'>
                <h1 className='header-primary'>
                    <span className='header-primary--title'>Snagged</span>
                    <span className='header-primary--span'>.......where native love meets</span>
                </h1>
            </div>
            <AuthForm {...props}/>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#046306" 
                    fillOpacity="1" 
                    d="M0,96L40,128C80,160,160,224,240,250.7C320,277,400,267,480,234.7C560,203,640,149,720,133.3C800,117,880,139,960,144C1040,149,1120,139,1200,112C1280,85,1360,43,1400,21.3L1440,0L1440,0L1400,0C1360,0,1280,0,1200,0C1120,0,1040,0,960,0C880,0,800,0,720,0C640,0,560,0,480,0C400,0,320,0,240,0C160,0,80,0,40,0L0,0Z"></path>            
            </svg>
        </header>
    )
}
