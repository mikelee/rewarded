import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './nav.styles.scss';

import { Dispatch } from 'redux';
import { User, ReduxState } from '../../../types';

import Menu from '../menu/menu.component';
import { toggleMenuVisible } from '../../redux/menu/menu.actions';
import { selectMenuVisible } from '../../redux/menu/menu.selectors';
import { Action } from 'redux';

interface OwnProps {
    currentUser: User | null,
    isTransparent?: boolean
}

interface StateProps {
    visible: boolean
}

interface DispatchProps {
    toggleMenuVisible: () => void
}

type Props = OwnProps & StateProps & DispatchProps;

const Nav: React.FC<Props> = ({ currentUser, visible, toggleMenuVisible, isTransparent }) => (
    <div className={`nav ${isTransparent ? 'nav-transparent' : ''}`}>
        {currentUser ?
            <div className='nav-buttons'>
                <h3 className='nav-username'>Hi, {currentUser.username}</h3>
                <svg className='menu-icon' onClick={toggleMenuVisible} data-testid='menu-button' viewBox="0 0 150 65" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <title>menu_icon</title>
                    <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <rect id="top" fill="#FFFFFF" x="0" y="0" width="150" height="5" rx="2.5"></rect>
                        <rect id="middle" fill="#FFFFFF" x="25" y="30" width="125" height="5" rx="2.5"></rect>
                        <rect id="bottom" fill="#FFFFFF" x="0" y="60" width="150" height="5" rx="2.5"></rect>
                    </g>
                </svg>
            </div>
            :
            <div className={`nav-buttons ${isTransparent ? 'nav-transparent' : ''}`}>
                <Link to='/sign-up' className={`nav-item ${isTransparent ? 'nav-transparent' : ''}`}>Sign Up</Link>
                <Link to='/sign-in' className={`nav-item ${isTransparent ? 'nav-transparent' : ''}`}>Sign In</Link>
            </div>
        }
        <TransitionGroup className='menu-slide-in'>
            {visible ?
                <CSSTransition
                    classNames='menu-slide-in'
                    timeout={500}
                >
                    <Menu key={1}/>
                </CSSTransition>
            :
                null
            }
        </TransitionGroup>
    </div>
);

const mapStateToProps = createStructuredSelector<ReduxState, {visible: boolean}>({
    visible: selectMenuVisible
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    toggleMenuVisible: () => dispatch(toggleMenuVisible())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);