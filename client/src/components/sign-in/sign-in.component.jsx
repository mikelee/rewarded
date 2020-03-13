import React from 'react';
import { connect } from 'react-redux';

import './sign-in.styles.scss';

import { setCurrentUser } from '../../redux/user/user.actions';

class SignIn extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:4444/sign-in', {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Credentials' : true
                },
                body: JSON.stringify(this.state)
            });

            const responseData = await response.json();
            this.setState({
                email: '',
                password: ''
            });
            this.props.setCurrentUser(responseData.user);
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
        const { alreadySignedUp } = this.props;

        return (
            <div className='sign-in'>
                <h3 className='sign-in-message'>
                    {alreadySignedUp
                    ? 'Welcome Back!'
                    : 'Sign Up And Start Achieving!'
                    }
                </h3>
                <form className='sign-in-form' onSubmit={this.handleSubmit} >
                    <input type='text' name='username' onChange={this.handleChange} placeholder='username'></input>
                    <input type='password' name='password' onChange={this.handleChange} placeholder='password'></input>
                    { alreadySignedUp ? <button type='submit'>Sign In</button> : <button type='submit'>Sign Up</button> }
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(SignIn);