import React from 'react';
import { connect } from 'react-redux';

import './menu.styles.scss';
import { toggleMenuVisible } from '../../redux/menu/menu.actions';


const Menu = () => (
    <div className='menu'>
        <p className='menu-item menu-colors' name='colors'>Color Theme</p>
    </div>
);

const mapDispatchToProps = dispatch => ({
    toggleMenuVisible: () => dispatch(toggleMenuVisible())
});

export default connect(null, mapDispatchToProps)(Menu);