import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CSSTransitionGroup } from 'react-transition-group';

import './nav.styles.scss';
import Menu from '../menu/menu.component';
import { toggleMenuVisible } from '../../redux/menu/menu.actions';
import { selectMenuVisible } from '../../redux/menu/menu.selectors';

class Nav extends React.Component {

    render() {
        const { currentUser, visible, toggleMenuVisible, isTransparent } = this.props;

        return (
            <div className={`nav ${isTransparent ? 'nav-transparent' : ''}`}>
                {currentUser ?
                    <div className='nav-buttons'>
                        <h3 className='nav-username'>Hi, {currentUser.username}</h3>
                        <svg className='menu-icon' onClick={toggleMenuVisible} viewBox="0 0 150 65" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <title>menu_icon</title>
                            <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
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
                    <CSSTransitionGroup
                        transitionName='menu-slide-in'
                        transitionEnterTimeout={500}
                        transitionLeaveTimeout={500}
                    >
                        {visible ?
                            <Menu key={1}/>
                        :
                            null
                        }
                    </CSSTransitionGroup>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    visible: selectMenuVisible
});

const mapDispatchToProps = dispatch => ({
    toggleMenuVisible: () => dispatch(toggleMenuVisible())
});

export default connect(mapStateToProps, mapDispatchToProps)(Nav);