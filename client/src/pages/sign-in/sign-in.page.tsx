import React from 'react';
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

interface State {
    username: string,
    password: string,
    errorMessage: string
}

class SignIn extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const path = `/auth/${this.props.type}`;
            const body = {
                username: this.state.username,
                password: this.state.password
            }

            const responseData = await fetchData(path, 'POST', body);
            
            const user = {
                userId: responseData.user?.user_id,
                username: responseData.user?.username
            }
            const errorMessage = responseData.errorMessage;
            
            if (errorMessage) {
                this.setState({
                    errorMessage
                });
                setTimeout(() => {
                    this.setState({errorMessage: ''});
                }, 3000);
            } else {
                this.setState({
                    username: '',
                    password: ''
                });
                this.props.setCurrentUser(user);
            }
        } catch(err) {
            console.log(err);
        }
    }

    handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value } as any);
    }

    render() {
        const { type } = this.props;
        const { errorMessage } = this.state;

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
                        <form className='sign-in-form' onSubmit={this.handleSubmit} >
                            <input type='text' name='username' onChange={this.handleChange} placeholder='username' autoFocus></input>
                            <input type='password' name='password' onChange={this.handleChange} placeholder='password'></input>
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
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setCurrentUser: (user: User) => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignIn);