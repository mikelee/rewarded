import React from 'react';
import { render, screen } from '@testing-library/react';
import ToggleButton from './toggle-button.component';

it('should render ToggleButton with CheckRounded icon', () => {
    render(<ToggleButton completed={true} selected={false} onClick={jest.fn()} />);

    const check = screen.getByTestId('check');

    expect(check).toBeInTheDocument();
});

it('should render Toggle Button without CheckRounded icon', () => {
    render(<ToggleButton completed={false} selected={false} onClick={jest.fn()} />);

    const check = screen.queryByTestId('check');
    
    expect(check).not.toBeInTheDocument();
});