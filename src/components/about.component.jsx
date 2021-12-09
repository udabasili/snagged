import { GiDreamCatcher, GiLoveLetter } from 'react-icons/gi';
import { AiFillFilter } from 'react-icons/ai';
import React from 'react'


export default function About() {
    return (
        <section className='about'>
            <div className='u-margin-medium'>
                <h2 className='about__header'>
                    welcome to snagged
                </h2>
            </div>
            <div className='about__content'>
                <div className='about__box'>
                    <GiDreamCatcher className='icon' />
                    <div className='u-margin-small'>
                        <h3 className='header-tertiary'>
                            Connect with natives
                        </h3>
                    </div>       
                    <p className='paragraph'>
                        find the great people you have similar traits with
                    </p>
                </div>
                <div className='about__box'>
                    <GiLoveLetter className='icon' />
                    <div className='u-margin-small'>
                        <h3 className='header-tertiary'>
                            find your soulmate
                        </h3>
                    </div>
                    <p className='paragraph'>
                        Our matching system is based on geolocation and interests
                    </p>
                </div>
                <div className='about__box'>
                    <AiFillFilter className='icon' />
                    <div className='u-margin-small'>
                        <h3 className='header-tertiary'>
                            Filter through effectively
                        </h3>
                    </div>
                    
                    <p className='paragraph'>
                        Only permit users that match your preference effectively to contact you
                    </p>
                </div>
            </div>

            
        </section>
    )
}
