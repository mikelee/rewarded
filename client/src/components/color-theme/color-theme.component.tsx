import { ReactElement, useEffect } from 'react';

interface Props {
    children: ReactElement<any, any> | null
}

const ColorTheme: React.FC<Props> = ({ children }) => {

    useEffect(() => {
        const colorName = window.localStorage.colorTheme;
        
        if (colorName) {
            let color;
    
            switch (colorName) {
                case 'red':
                    color = '#f0654f';
                    break;
                case 'blue':
                    color = '#4195f0';
                    break;
                case 'green':
                    color = '#2db92d';
                    break;
                case 'purple':
                    color = '#707eff';
                    break;
            }
    
            if (color) document.body.style.setProperty('--color-primary', color);
        }
    }, []);

    return children;
}

export default ColorTheme;