import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './nav.styles.scss';
import { setCurrentUser } from '../../redux/user/user.actions';

class Nav extends React.Component {

    logout = () => {
        fetch('http://localhost:4444/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : true
            },
            credentials: 'same-origin'
        });

        this.props.setCurrentUser(null);
    }

    render() {
        const { currentUser } = this.props;

        return (
            <div className='nav'>
                {currentUser ?
                    <button className='nav-item logout-button' onClick={this.logout}>Logout</button>
                    :
                    <div className='sign-in-buttons'>
                        <Link to='/sign-up' className='nav-item'>Sign Up</Link>
                        <Link to='/sign-in' className='nav-item'>Sign In</Link>
                    </div>
                }
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(null, mapDispatchToProps)(Nav);