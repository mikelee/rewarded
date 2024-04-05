import React from 'react';

import './toggle-button.styles.scss';

import { CheckRounded } from '@mui/icons-material';

interface OwnProps {
    completed: boolean,
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
            <div className='toggle-button'>
                <button className={`${selected ? 'selected' : ''}`} onClick={event => click(event)} >
                    { completed
                    ? <CheckRounded data-testid='check' className={`check-icon ${selected ? 'selected' : ''}`} fontSize='large'/>
                    : null
                    }
                </button>
            </div>
        </div>
    );
}

export default ToggleButton;