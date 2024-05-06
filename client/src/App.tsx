import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './App.scss';

import { User } from '../types';
import { ReduxState } from 'redux/root-reducer';

import ColorTheme from './components/color-theme/color-theme.component';
import Nav from './components/nav/nav.component';
import HomePage from './pages/homepage/homepage.page';
import SignIn from './pages/sign-in/sign-in.page';
import DataLoader from './components/data-loader/data-loader.component';

import { getCurrentUser } from './redux/selectors/user.selectors';

interface AppProps {
    currentUser: User | null
}

const App: React.FC<AppProps> = () => {
    const currentUser = useSelector((state: ReduxState) => getCurrentUser(state));

    return (
        <ColorTheme>
            <Routes>
                <Route
                    path='/'
                    element={currentUser
                        ? 
                            <>
                                <Nav currentUser={currentUser} />
                                <DataLoader />
                            </>
                        :
                            <HomePage currentUser={currentUser} />
                    }
                />
                <Route
                    path='/sign-up'
                    element={currentUser
                        ?
                            <Navigate to='/' />
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
                            <Navigate to='/' />
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
}

export default App;
