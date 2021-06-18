import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './menu.styles.scss';

import { Dispatch } from 'redux';
import { ReduxState, Action } from '../../../types';

import Submenu from '../submenu/submenu.component'

import { getSubmenuCategory } from '../../redux/menu/menu.selectors';
import { setSubmenuCategory } from '../../redux/menu/menu.actions'
import { clearAll } from '../../redux/user/user.actions';
import { setLoggedOutMessage } from '../../redux/temporary/temporary.actions';

interface MenuProps extends StateProps, DispatchProps {
}

interface StateProps {
    submenuCategory: string | null
}

interface DispatchProps {
    setSubmenuCategory: (category: string | null) => void,
    clearAll: () => void,
    setLoggedOutMessage: () => void
}

class Menu extends React.Component<MenuProps> {

    logout = () => {
        fetch('/logout', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials' : 'true'
            },
            credentials: 'same-origin'
        })
        .then(res => res.json())
        .then(isLoggedOut => {
            if (isLoggedOut === true) {
                // Clear all redux data
                this.props.clearAll();

                document.body.style.setProperty('--color-primary', '#707eff');
                document.body.style.setProperty('--color-primary-faded', 'rgba(112, 126, 255, .7)');
                document.body.style.setProperty('--color-primary-dark', 'rgb(72, 86, 215)');

                this.props.setLoggedOutMessage();
            }
        })
        .catch(err => console.log(err));
    }

    clickMenuItem = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const el = event.target as HTMLElement;
        const category = el.getAttribute('data-name');
        this.props.setSubmenuCategory(category);
    }

    render() {
        const { submenuCategory } = this.props; 
        
        return (
            <div className='menu'>
                {
                !submenuCategory ? 
                    <div className='menu-items' onClick={event => this.clickMenuItem(event)}>
                        <p className='menu-item menu-colors' data-name='Color Theme'>Color Theme</p>
                        <p className='menu-item menu-logout-button' onClick={this.logout}>Logout</p>
                    </div>
                :
                    <Submenu />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector<ReduxState, { submenuCategory: string | null }>({
   submenuCategory: getSubmenuCategory
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setSubmenuCategory: (category: string | null) => dispatch(setSubmenuCategory(category)),
    clearAll: () => dispatch(clearAll()),
    setLoggedOutMessage: () => dispatch(setLoggedOutMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);