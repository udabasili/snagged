import React,{useEffect} from 'react'
import { Redirect, Route } from 'react-router-dom'
import { auth, firestore } from '../services/firebase';

export function ProtectedRoute({ component: Component, fullyRegistered, isAuthenticated, currentUser,  ...rest}) {

    return (
        <Route {...rest} render={(props) => (
             isAuthenticated ?
                <Component currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} /> :
                <Redirect to='/auth/register' />
        )
        } />
    )
}

export function AdminRoute({ component: Component, isAdmin, isAuthenticated, currentUser,  ...rest}) {
    return (
        <Route {...rest} render={(props) => (
            <Component isAdmin={isAdmin} currentUser={currentUser} isAuthenticated={isAuthenticated} {...props} /> 
        )
        } />
    )
}

