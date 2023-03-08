import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import testStore from '../../redux/testStore';
import Sort from './sort.component';

const sortOrders = [
    'A-Z',
    'Z-A',
    'Newest First',
    'Oldest First'
];

beforeEach(() => {
    render(
        <Provider store={testStore}>
            <Sort sortOrders={sortOrders} />
        </Provider>
    );
});

it('should display sort orders', () => {
    for (const sortOrder of sortOrders) {
        const sortOrderText = screen.getByRole('button', { name: sortOrder });
        expect(sortOrderText).toBeInTheDocument();
    }
});

it('should add .selected class to the selected sort order', () => {
    const sort = testStore.getState().menu.sort;

    const selectedSortOrder = screen.getByRole('button', { name: sort });
    expect(selectedSortOrder).toHaveClass('selected');
    
    sortOrders.forEach(sortOrder => {
        const sortOrderElement = screen.getByRole('button', { name: sortOrder });
        if (sortOrder !== sort) {
            expect(sortOrderElement).not.toHaveClass('selected');
        }
    });
});