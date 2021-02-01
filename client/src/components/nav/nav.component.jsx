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

    toggleColor = event => {
        const colorName = event.target.name;
        let color;
        let colorRGB;
        let colorDark;

        switch (colorName) {
            case 'red':
                color = '#f0654f';
                colorRGB = '240, 101, 79';
                colorDark = '#c83c27';
                break;
            case 'blue':
                color = '#4195f0';
                colorRGB = '65, 149, 240';
                colorDark = '#196ec8';
                break;
            case 'green':
                color = '#2db92d';
                colorRGB = '45, 185, 45';
                colorDark = '#059105';
                break;
            case 'purple':
                color = '#707eff';
                colorRGB = '112, 126, 255';
                colorDark = '#4856d7'
                break;
        }

        document.body.style.setProperty('--color-primary', color);
        document.body.style.setProperty('--color-primary-faded', `rgba(${colorRGB}, .7)`);
        document.body.style.setProperty('--color-primary-superfaded', `rgba(${colorRGB}, .1)`);
        document.body.style.setProperty('--color-primary-dark', colorDark);
    }

    render() {
        const { currentUser, visible, toggleMenuVisible } = this.props;

        return (
            <div className='nav'>
                {currentUser ?
                    <div className='nav-buttons'>
                        <h3 className='nav-username'>Hi, {currentUser.username}</h3>
                        <button onClick={this.toggleColor} name='red'>red</button>
                        <button onClick={this.toggleColor} name='blue'>blue</button>
                        <button onClick={this.toggleColor} name='green'>green</button>
                        <button onClick={this.toggleColor} name='purple'>purple</button>
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
                    <div className='nav-buttons'>
                        <Link to='/sign-up' className='nav-item'>Sign Up</Link>
                        <Link to='/sign-in' className='nav-item'>Sign In</Link>
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