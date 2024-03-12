import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import './App.scss';

import { User } from '../types';

import ColorTheme from './components/color-theme/color-theme.component';
import Nav from './components/nav/nav.component';
import HomePage from './pages/homepage/homepage.page';
import SignIn from './pages/sign-in/sign-in.page';
import DataLoader from './components/data-loader/data-loader.component';

import { getCurrentUser } from './redux/user/user.selectors';

interface AppProps {
    currentUser: User | null
}

const App: React.FC<AppProps> = ({ currentUser }) => (
    <ColorTheme>
        <Routes>
            <Route
                path='/'
                element={currentUser
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
                element={currentUser
                    ?
                        <Navigate replace to='/' />
                    : 
                        <>
                            <Nav currentUser={currentUser} />
                            <SignIn type='sign-up' />
                        </>
                }
            />
            <Route
                path='/sign-in'
                element={currentUser
                    ?
                        <Navigate replace to='/' />
                    : 
                        <>
                            <Nav currentUser={currentUser} />
                            <SignIn type='sign-in' />
                        </>
                }
            />
        </Routes>
    </ColorTheme>
);

const mapStateToProps = createStructuredSelector({
	currentUser: getCurrentUser
});

export default connect(mapStateToProps)(App);
