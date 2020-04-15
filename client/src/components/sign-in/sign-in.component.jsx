import React from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

import { setCurrentUser } from '../../redux/user/user.actions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            errorMessage: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password
        }

        try {
            const response = await fetch(`/${this.props.type}`, {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            const user = responseData.user;
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
                    email: '',
                    password: ''
                });
                this.props.setCurrentUser(user);
            }
        } catch(err) {
            console.log(err);
        }
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    render() {
        const { type } = this.props;
        const { errorMessage } = this.state;

        return (
            <div className='sign-in'>
                <h3 className='sign-in-message'>
                    {type === 'sign-in'
                    ? 'Welcome Back!'
                    : 'Sign Up And Start Achieving!'
                    }
                </h3>
                <form className='sign-in-form' onSubmit={this.handleSubmit} >
                    <input type='text' name='username' onChange={this.handleChange} placeholder='username'></input>
                    <input type='password' name='password' onChange={this.handleChange} placeholder='password'></input>
                    { type === 'sign-in' ? <button type='submit'>Sign In</button> : <button type='submit'>Sign Up</button> }
                </form>
                {errorMessage === ''
                ? null
                : <p className='sign-in-error-message'>{errorMessage}</p>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignIn);