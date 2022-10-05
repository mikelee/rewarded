import { ReactElement, useEffect } from 'react';
import { Color } from '../../../types';

interface Props {
    children: ReactElement<any, any> | null
}

export const applyColorTheme = (colorName: Color | null) => {
    if (colorName) {
        document.body.style.setProperty('--color-primary', `rgb(var(--rgb-${colorName}))`);
        document.body.style.setProperty('--color-primary-faded', `rgba(var(--rgb-${colorName}), .7)`);
        document.body.style.setProperty('--color-primary-superfaded', `rgba(var(--rgb-${colorName}), .1)`);
        document.body.style.setProperty('--color-primary-dark', `rgb(var(--rgb-${colorName}-dark))`);
    }
}

const ColorTheme: React.FC<Props> = ({ children }) => {

    useEffect(() => {
        const colorName: Color = window.localStorage.colorTheme;

        applyColorTheme(colorName);
    }, []);

    return children;
}

export default ColorTheme;