import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

export default function AdminLeftNav() {
    const location = useLocation();

    return (
        <nav className='admin-nav'>
            <ul className='admin-nav__list'>
                <li className='admin-nav__item'>
                    <NavLink exact to='/admin' 
                    activeClassName='admin-nav__active'
                     className='admin-nav__link'>
                            Dashboard
                    </NavLink>
                </li>
                <li className='admin-nav__item'>
                    <NavLink to='/admin/users'
                        activeClassName='admin-nav__active'
                        className='admin-nav__link'>
                        Users
                    </NavLink>
                </li>
                <li className='admin-nav__item'>
                    <NavLink to='/admin/messages'
                        activeClassName='admin-nav__active'
                        className='admin-nav__link'>
                        Messages
                    </NavLink>
                </li>
            </ul>
        </nav>
    )
}
