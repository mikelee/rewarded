import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './App.css';

import Nav from './components/nav/nav.component';
import ToDoContainer from './components/to-do-container/to-do-container.component';
import SignIn from './components/sign-in/sign-in.component';

import { selectCurrentUser } from './redux/user/user.selectors';
import { setCurrentUser } from './redux/user/user.actions';

const App = ({ currentUser }) => (
	<div>
		<Nav currentUser={currentUser} />
		<Switch>
            <Route
                exact path='/'
                render={() => currentUser
                    ? <ToDoContainer currentUser={currentUser} />
                    : <h2>No currentUser in app.js</h2>
                }
            />
            <Route
                path='/sign-up'
                render={() => currentUser
                    ? <Redirect to='/' />
                    : <SignIn alreadySignedUp={false} />
                }
            />
            <Route
                path='/sign-in'
                render={() => currentUser
                    ? <Redirect to='/' />
                    : <SignIn alreadySignedUp={true} />
                }
            />
		</Switch>
  </div>
);

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
	setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
