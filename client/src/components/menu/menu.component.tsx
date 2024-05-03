import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../utils';

import './menu.styles.scss';

import { ReduxState } from 'redux/root-reducer';

import Submenu from '../submenu/submenu.component'

import { getSubmenuCategory } from '../../redux/menu/menu.selectors';
import { submenuCategorySet } from '../../redux/slices/menuSlice';
import { stateCleared } from '../../redux/extraActions';
import { loggedOutMessageSet } from '../../redux/slices/temporarySlice';

const Menu: React.FC = () => {
    const submenuCategory = useSelector((state: ReduxState) => getSubmenuCategory(state));

    const dispatch = useDispatch();

    const logout = async () => {
        const isLoggedOut = await fetchData('/auth/logout', 'POST');
    
        if (isLoggedOut === true) {
            // Clear all redux data
            dispatch(stateCleared());

            dispatch(loggedOutMessageSet());
        }
    }

    const clickMenuItem = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const el = event.target as HTMLElement;
        const category = el.getAttribute('data-name');
        dispatch(submenuCategorySet(category));
    }
        
    return (
        <div className='menu'>
            {
            !submenuCategory ? 
                <div className='menu-items' onClick={event => clickMenuItem(event)}>
                    <p className='menu-item menu-sort' data-name='Sort'>Sort</p>
                    <p className='menu-item menu-colors' data-name='Color Theme'>Color Theme</p>
                    <p className='menu-item menu-logout-button' onClick={logout}>Logout</p>
                </div>
            :
                <Submenu />
            }
        </div>
    );
}

export default Menu;