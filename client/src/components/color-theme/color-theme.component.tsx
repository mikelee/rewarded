import { ReactElement, useEffect } from 'react';

interface Props {
    children: ReactElement<any, any> | null
}

const ColorTheme: React.FC<Props> = ({ children }) => {

    useEffect(() => {
        const colorName: string = window.localStorage.colorTheme;

        if (colorName) {
            document.body.style.setProperty('--color-primary', `rgb(var(--rgb-${colorName}))`);
            document.body.style.setProperty('--color-primary-faded', `rgba(var(--rgb-${colorName}), .7)`);
            document.body.style.setProperty('--color-primary-superfaded', `rgba(var(--rgb-${colorName}), .1)`);
            document.body.style.setProperty('--color-primary-dark', `rgb(var(--rgb-${colorName}-dark))`);
        }
    }, []);

    return children;
}

export default ColorTheme;