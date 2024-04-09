import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchData } from '../../utils';

import './menu.styles.scss';

import { Dispatch } from 'redux';
import { Action } from '../../../types';

import Submenu from '../submenu/submenu.component'

import { getSubmenuCategory } from '../../redux/menu/menu.selectors';
import { setSubmenuCategory } from '../../redux/menu/menu.actions'
import { clearAll } from '../../redux/user/user.actions';
import { setLoggedOutMessage } from '../../redux/temporary/temporary.actions';

interface StateProps {
    submenuCategory: string | null
}

interface DispatchProps {
    setSubmenuCategory: (category: string | null) => void,
    clearAll: () => void,
    setLoggedOutMessage: () => void
}

type Props = StateProps & DispatchProps;

const Menu: React.FC<Props> = ({ submenuCategory, clearAll, setLoggedOutMessage, setSubmenuCategory }) => {
    const logout = async () => {
        const isLoggedOut = await fetchData('/auth/logout', 'POST');
    
        if (isLoggedOut === true) {
            // Clear all redux data
            clearAll();

            setLoggedOutMessage();
        }
    }

    const clickMenuItem = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const el = event.target as HTMLElement;
        const category = el.getAttribute('data-name');
        setSubmenuCategory(category);
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

const mapStateToProps = createStructuredSelector({
   submenuCategory: getSubmenuCategory
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setSubmenuCategory: (category: string | null) => dispatch(setSubmenuCategory(category)),
    clearAll: () => dispatch(clearAll()),
    setLoggedOutMessage: () => dispatch(setLoggedOutMessage())
});

export default connect(mapStateToProps, mapDispatchToProps)(Menu);