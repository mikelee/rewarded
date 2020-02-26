import React from 'react';

import './requirement.styles.scss';

import { CheckRounded, Clear } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const Requirement = ({ to_do_id, text, completed, deleteRequirement }) => (
    <div className='requirement'>
        <div className='requirement-check-space'>
            {completed
                ? <CheckRounded fontSize='large' />
                : null
            }
        </div>
        <form className='requirement-form' key={to_do_id} onSubmit={deleteRequirement(to_do_id)}>
            <p className='requirement-form-text'>{text}</p>
            <IconButton type='submit'>
                <Clear className='requirement-form-clear-icon' />
            </IconButton>
        </form>
    </div>
);

export default Requirement;