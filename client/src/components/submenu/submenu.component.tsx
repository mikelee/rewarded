import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchData } from '../../utils';
import { applyColorTheme } from '../color-theme/color-theme.component';

import './submenu.styles.scss';

import { Dispatch } from 'redux';
import { User, ReduxState, Action, Color } from '../../../types';

import { getSubmenuCategory } from '../../redux/menu/menu.selectors';
import { setSubmenuCategory } from '../../redux/menu/menu.actions';
import { setColorTheme } from '../../redux/user/user.actions';
import { getCurrentUser } from '../../redux/user/user.selectors';

interface StateProps {
    submenuCategory: string | null,
    currentUser: User | null
}

interface DispatchProps {
    setSubmenuCategory: (category: string | null) => void,
    setColorTheme: (color: string) => void
}

type Props = StateProps & DispatchProps;

class Submenu extends React.Component<Props> {

    componentWillUnmount() {
        this.props.setSubmenuCategory(null);
    }

    getComponent() {
        const { submenuCategory } = this.props;

        switch (submenuCategory) {
            case 'Color Theme':
                return (
                    <div className='color-buttons'>
                        <button className='color-button red' onClick={this.toggleColor} name='red'/>
                        <button className='color-button blue' onClick={this.toggleColor} name='blue'/>
                        <button className='color-button green' onClick={this.toggleColor} name='green'/>
                        <button className='color-button purple' onClick={this.toggleColor} name='purple'/>                   
                    </div>
                );
            default:
                return null;
        }
    }

    goBackToMenu = () => {
        this.props.setSubmenuCategory(null);
    }

    toggleColor = async (event: React.MouseEvent<HTMLButtonElement>) => {
        const colorName = ((event.target as HTMLButtonElement).name as Color);

        const path = '/api/settings/color-theme/update';
        const method = 'PUT';
        const body = {
            color: colorName,
            userId: this.props.currentUser?.userId
        };

        await fetchData(path, method, body);

        this.props.setColorTheme(colorName);

        applyColorTheme(colorName);

        window.localStorage.setItem('colorTheme', colorName);
    }

    render() {
        const { submenuCategory, setSubmenuCategory } = this.props;

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
                {this.getComponent()}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector<ReduxState, { submenuCategory: string | null, currentUser: User | null }>({
    submenuCategory: getSubmenuCategory,
    currentUser: getCurrentUser
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => ({
    setSubmenuCategory: (category: string | null) => dispatch(setSubmenuCategory(category)),
    setColorTheme: (color: string) => dispatch(setColorTheme(color))
});

export default connect(mapStateToProps, mapDispatchToProps)(Submenu);