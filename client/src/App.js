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
	<div>
		<Nav currentUser={currentUser} />
		<Switch>
            <Route
                exact path='/'
                render={() => currentUser
                    ? <DataLoader currentUser={currentUser} />
                    : <HomePage />
                }
            />
            <Route
                path='/sign-up'
                render={() => currentUser
                    ? <Redirect to='/' />
                    : <SignIn type='sign-up' />
                }
            />
            <Route
                path='/sign-in'
                render={() => currentUser
                    ? <Redirect to='/' />
                    : <SignIn type='sign-in' />
                }
            />
		</Switch>
  </div>
);

const mapStateToProps = createStructuredSelector({
	currentUser: getCurrentUser
});

export default connect(mapStateToProps)(App);
