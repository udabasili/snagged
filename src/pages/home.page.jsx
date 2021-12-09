import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CustomHeader from '../components/custom-header.component'

export class HomePage extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div className='home-page'>
                <CustomHeader title='Home' link='home/home' />
            </div>
        )
    }
}

export default HomePage
