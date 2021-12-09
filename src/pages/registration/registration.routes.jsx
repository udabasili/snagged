import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import AuthPage from './auth.page';
import ImageUploadPage from './image-upload.page';
import PhoneNumberVerificationPage from './phone-number-verification.page';
import UserInfoPage from './user-info.page';
import UserPreferencePage from './user-preference.page';
const RegistrationRoutes = ({match, isAuthenticated}) => {
    return (
        <Switch>
            <Route exact path={`${match.path}/login`} render={(props) => (
                !isAuthenticated ?
                    <AuthPage authType='login' {...props} /> :
                    <Redirect to='/' />
            )} />
            <Route exact path={`${match.path}/register`} render={(props) => (
                !isAuthenticated ?
                <AuthPage authType='register' {...props} /> :
                    <Redirect to='/' />
            )} />
            <Route exact path={`${match.path}/image-upload/:userId/add-images`}  render={(props) => (
                <ImageUploadPage  {...props} />
            )} />
            <Route exact  path='/image-upload/:userId/edit-images' render={(props) => (
                <ImageUploadPage editing {...props} />
            )} />
            <Route exact path={`${match.path}/phone-number-verification/:userId`} component={PhoneNumberVerificationPage}/>
            <Route exact path={`${match.path}/user-info/:userId/add`}  render={(props) => (
                <UserInfoPage  {...props} />
            )} />
            <Route exact path={`${match.path}/user-info/:userId/edit`}  render={(props) => (
                <UserInfoPage editing {...props} />
            )} />
            <Route exact path={`${match.path}/user-preference/:userId/add`}   render={(props) => (
                <UserPreferencePage  {...props} />
            )} />
            <Route exact path={`${match.path}/user-preference/:userId/edit`}  render={(props) => (
                <UserPreferencePage editing {...props} />
            )} />
        </Switch>
    );
}

export default RegistrationRoutes;
