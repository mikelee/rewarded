import React, { useState } from 'react';
import { connect } from 'react-redux';
import { fetchData } from '../../utils';

import './sign-in.styles.scss';
import BenchSVG from '../../components/svg-components/bench-svg.component';

import { Dispatch } from 'redux';
import { User, Action } from '../../../types';

import { setCurrentUser } from '../../redux/user/user.actions';

interface OwnProps {
    type: string
}

interface DispatchProps {
    setCurrentUser: (user: User) => void
}

type Props = OwnProps & DispatchProps;

const SignIn: React.FC<Props> = ({ type, setCurrentUser }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const path = `/auth/${type}`;
            const body = {
                username: username,
                password: password
            }

            const responseData = await fetchData(path, 'POST', body);
            
            const user = {
                userId: responseData.user?.user_id,
                username: responseData.user?.username
            }
            const errorMessage = responseData.errorMessage;
            
            if (errorMessage) {
                setErrorMessage(errorMessage)
                setTimeout(() => {
                    setErrorMessage('')
                }, 3000);
            } else {
                setUsername('');
                setPassword('');
                setCurrentUser(user);
            }
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <div className='sign-in'>
            <div className='content'>
                <div className='shadow-container'>
                    <div className='sign-in-left'>
                        <div className='graphic-container'>
                            <div className='bench-graphic'>
                                <BenchSVG />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='sign-in-right'>
                    <h3 className='sign-in-title'>
                        {type === 'sign-in'
                        ? 'Welcome Back!'
                        : 'Start Achieving!'
                        }
                    </h3>
                    <form className='sign-in-form' onSubmit={handleSubmit} >
                        <input type='text' name='username' onChange={(e) => setUsername(e.target.value)} placeholder='username' autoFocus></input>
                        <input type='password' name='password' onChange={(e) => setPassword(e.target.value)} placeholder='password'></input>
                        { type === 'sign-in' ? <button type='submit'>Sign In</button> : <button type='submit'>Sign Up</button> }
                    </form>
                    {errorMessage === ''
                    ? null
                    : <p className='sign-in-error-message'>{errorMessage}</p>
                    }
                </div>
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setCurrentUser: (user: User) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignIn);