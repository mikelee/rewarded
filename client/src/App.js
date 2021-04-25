import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './App.scss';

import Nav from './components/nav/nav.component';
import HomePage from './components/homepage/homepage.component';
import SignIn from './components/sign-in/sign-in.component';
import DataLoader from './components/data-loader/data-loader.component';

import { getCurrentUser } from './redux/user/user.selectors';

const App = ({ currentUser }) => (
    <Switch>
        <Route
            exact path='/'
            render={() => currentUser
                ? 
                    <>
                        <Nav currentUser={currentUser} />
                        <DataLoader currentUser={currentUser} />
                    </>
                :
                    <HomePage currentUser={currentUser} />
            }
        />
        <Route
            path='/sign-up'
            render={() => currentUser
                ?
                    <Redirect to='/' />
                : 
                    <>
                        <Nav currentUser={currentUser} />
                        <SignIn type='sign-up' />
                    </>
            }
        />
        <Route
            path='/sign-in'
            render={() => currentUser
                ?
                    <Redirect to='/' />
                : 
                    <>
                        <Nav currentUser={currentUser} />
                        <SignIn type='sign-in' />
                    </>
            }
        />
    </Switch>
);

const mapStateToProps = createStructuredSelector({
	currentUser: getCurrentUser
});

export default connect(mapStateToProps)(App);
