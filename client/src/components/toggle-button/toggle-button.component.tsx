import React from 'react';

import './toggle-button.styles.scss';

import { CheckRounded } from '@material-ui/icons';

interface OwnProps {
    completed: number,
    selected: boolean,
    onClick: () => void
}

type Props = OwnProps;

const ToggleButton: React.FC<Props> = ({ completed, selected, onClick }) => {

    const click = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (event.detail > 1) return;

        onClick();
    }

    return (
        <div className='toggle-button-container'>
            <button className={`toggle-button ${selected ? 'selected' : ''}`} onClick={event => click(event)} >
                { completed
                ? <CheckRounded className={`check-icon ${selected ? 'selected' : ''}`} fontSize='large'/>
                : null
                }
            </button>
        </div>
    );
}

export default ToggleButton;