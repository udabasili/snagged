import { faList, faTh } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState , useEffect} from 'react'


export default function Sort({ displayType='grid', sortValue, setCardType, setSortOption }) {
    const [state, setState] = useState(displayType)
    const onChangeValue = function (event) {
        setState(event.target.value)
        setCardType(event.target.value)
    }

    return (
        <div className="sort">
            <div className='display-type__btn-group' onChange={onChangeValue} value={state}>
                <label className='display-type__btn grid' style={{
                    backgroundColor: state === 'grid' ? '#046306' : ' rgb(206, 203, 203)',

                }} >
                    <input type='radio' value='grid' name='display-button' id='display-button' />
                    <FontAwesomeIcon icon={faList} className='icon' />
                </label>
                <label className='display-type__btn flex' style={{
                    backgroundColor: state === 'flex' ? '#046306' : ' rgb(206, 203, 203)'
                }}>
                    <input type='radio' value='flex' name='display-button' id='display-button' />
                    <FontAwesomeIcon icon={faTh} className='icon' />
                </label>
            </div>
            <div className='sort__options'>
                <label className='sort__options--label'>
                    Sort By
                </label>
                <select 
                    className='sort__options--dropdown'
                    onChange={e => setSortOption(e.target.value) }
                    value={sortValue}
                    >
                        <option value='education'>Last Online</option>
                        <option value='distanceFromCurrentUser'>Nearest</option>
                        <option value='secondsAgo'>Newest Joined</option>
                        <option value='age'>Age</option>


                    </select>
            </div>
        </div>
    )
}
