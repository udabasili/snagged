import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminLeftNav from '../../components/admin/admin-left-nav.component'
import AdminHome from './admin-home.page'
import AdminMessages from './admin-messages.page'
import UsersPage from './users.page'

export default function Admin({match}) {
    console.log(match.path)
    return (
        <React.Fragment>
            <AdminLeftNav/>
            <section className='admin'>
            <Switch>
                <Route exact path={`${match.url}`}  component={AdminHome}/>
                <Route  path={`${match.path}/users`} component={UsersPage}/>
                <Route  path={`${match.path}/messages`} component={AdminMessages}/>
            </Switch>
            </section>

        </React.Fragment>
    )
}
