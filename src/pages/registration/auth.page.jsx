import React, { Component } from 'react'
import About from '../../components/about.component';
import Header from '../../components/header.component';

export default class AuthPage extends Component {
    render() {
        return (
            <div className='auth-page'>
                <Header {...this.props}/>
                <About/>
            </div>
        )
    }
}
