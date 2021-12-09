import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 *
 * Custom Header for each page
 * @export
 * @param {String, String, String} {title, link=null, path=null}
 * @return {JSX.Element} 
 */
export default function CustomHeader({title, link=null, path=null}) {
    return (
        <header className='custom-header'>
            <div className='custom-header__content'>
                <h2 className='custom-header__title'>
                    {title}
                </h2>
                <ul className='custom-header__list'>
                        <li className='custom-header__item'>
                            <NavLink  to='/' exact className='custom-header__link ' activeClassName='active-class'>
                                Home
                            </NavLink>
                        </li>
                        {link &&
                        <NavLink to={`/${path}`} className='custom-header__link' activeClassName='active-class'>
                                {link.split('*').map((d, index) => (
                                    <li className='custom-header__item' key={index}>
                                        {d}
                                    </li>
                                ))
                                }
                            </NavLink>
                        }
                </ul>
            </div>
        </header>
    )
}
