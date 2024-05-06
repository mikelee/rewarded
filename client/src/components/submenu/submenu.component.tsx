import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../utils';
import { applyColorTheme } from '../color-theme/color-theme.component';

import './submenu.styles.scss';

import { Color } from '../../../types';

import Sort from '../sort/sort.component';

import { getSubmenuCategory } from '../../redux/menu/menu.selectors';
import { submenuCategorySet } from '../../redux/menu/menuSlice';
import { colorThemeSet } from '../../redux/user/userSlice';

const Submenu: React.FC = () => {
    const submenuCategory = useSelector(getSubmenuCategory);

    const dispatch = useDispatch();

    useEffect(() => {
        return () => goBackToMenu();
    }, []);

    const getComponent = () => {
        switch (submenuCategory) {
            case 'Color Theme':
                return (
                    <div className='color-buttons'>
                        <button className='color-button red' onClick={toggleColor} name='red'/>
                        <button className='color-button blue' onClick={toggleColor} name='blue'/>
                        <button className='color-button green' onClick={toggleColor} name='green'/>
                        <button className='color-button purple' onClick={toggleColor} name='purple'/>                   
                    </div>
                );
            case 'Sort':
                return <Sort sortOrders={['Newest First', 'Oldest First', 'A-Z', 'Z-A']} />;
            default:
                return null;
        }
    }

    const goBackToMenu = () => {
        dispatch(submenuCategorySet(null));
    }

    const toggleColor = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const colorName = ((event.target as HTMLButtonElement).name as Color);

        const path = '/api/settings/color-theme/update';
        const method = 'PUT';
        const body = { color: colorName };

        await fetchData(path, method, body);

        colorThemeSet(colorName);

        applyColorTheme(colorName);

        window.localStorage.setItem('colorTheme', colorName);
    }

    return (
        <div className='submenu'>
            <div className='submenu-top'>
                <svg className='back-button' onClick={() => dispatch(submenuCategorySet(null))} width="406px" height="238px" viewBox="0 0 406 238" version="1.1">
                    <title>Back Button</title>
                    <g id="back-button" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                        <g id="back-arrow" fill="#000000">
                            <rect id="top-line" transform="translate(91.000000, 70.000000) rotate(-35.000000) translate(-91.000000, -70.000000) " x="-9" y="55" width="200" height="30" rx="15"></rect>
                            <rect id="middle-line" x="6" y="104" width="400" height="30" rx="15"></rect>
                            <rect id="bottom-line" transform="translate(91.000000, 168.000000) rotate(35.000000) translate(-91.000000, -168.000000) " x="-9" y="153" width="200" height="30" rx="15"></rect>
                        </g>
                    </g>
                </svg>
                <p className='category'>{submenuCategory}</p>
            </div>
            {getComponent()}
        </div>
    );
}

export default Submenu;