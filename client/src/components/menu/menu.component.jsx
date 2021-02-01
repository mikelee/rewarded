import React from 'react';
import { connect } from 'react-redux';

import './menu.styles.scss';
import { toggleMenuVisible } from '../../redux/menu/menu.actions';
import { setCurrentUser } from '../../redux/user/user.actions';

class Menu extends React.Component {

    logout = () => {
        fetch('/logout', {
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

        this.props.toggleMenuVisible();

        document.body.style.setProperty('--color-primary', '#707eff');
        document.body.style.setProperty('--color-primary-faded', 'rgba(112, 126, 255, .7)');
        document.body.style.setProperty('--color-primary-dark', 'rgb(72, 86, 215)');
    }

    render() {
        return (
            <div className='menu'>
                <p className='menu-item menu-colors' name='colors'>Color Theme</p>
                <p className='menu-item menu-logout-button' onClick={this.logout}>Logout</p>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: user => dispatch(setCurrentUser(user)),
    toggleMenuVisible: () => dispatch(toggleMenuVisible())
});

export default connect(null, mapDispatchToProps)(Menu);