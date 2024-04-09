import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchData } from '../../utils';
import { applyColorTheme } from '../color-theme/color-theme.component';

import './submenu.styles.scss';

import { Dispatch } from 'redux';
import { Action, Color } from '../../../types';

import Sort from '../sort/sort.component';

import { getSubmenuCategory } from '../../redux/menu/menu.selectors';
import { setSubmenuCategory } from '../../redux/menu/menu.actions';
import { setColorTheme } from '../../redux/user/user.actions';

interface StateProps {
    submenuCategory: string | null
}

interface DispatchProps {
    setSubmenuCategory: (category: string | null) => void,
    setColorTheme: (color: string) => void
}

type Props = StateProps & DispatchProps;

const Submenu: React.FC<Props> = ({ submenuCategory, setSubmenuCategory, setColorTheme }) => {

    useEffect(() => {
        return () => setSubmenuCategory(null);
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
        setSubmenuCategory(null);
    }

    const toggleColor = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const colorName = ((event.target as HTMLButtonElement).name as Color);

        const path = '/api/settings/color-theme/update';
        const method = 'PUT';
        const body = { color: colorName };

        await fetchData(path, method, body);

        setColorTheme(colorName);

        applyColorTheme(colorName);

        window.localStorage.setItem('colorTheme', colorName);
    }

    return (
        <div className='submenu'>
            <div className='submenu-top'>
                <svg className='back-button' onClick={() => setSubmenuCategory(null)} width="406px" height="238px" viewBox="0 0 406 238" version="1.1">
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

const mapStateToProps = createStructuredSelector({
    submenuCategory: getSubmenuCategory
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setSubmenuCategory: (category: string | null) => dispatch(setSubmenuCategory(category)),
    setColorTheme: (color: string) => dispatch(setColorTheme(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(Submenu);