import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { DataLoader } from './data-loader.component';
import testStore from 'redux/testStore';

const mockResponseData = [
    [
        {id: 1, text: 'First todo'},
        {id: 2, text: 'Second todo'},
        {id: 3, text: 'Third todo'}
    ],
    [
        {id: 1, text: 'First reward'},
        {id: 2, text: 'Second reward'},
        {id: 3, text: 'Third reward'}
    ],
    [
        {id: 1, text: 'First requirement'},
        {id: 2, text: 'Second requirement'},
        {id: 3, text: 'Third requirement'}
    ],
    [
        {color: 'red'}
    ]
];

fetch.mockResponse(JSON.stringify(mockResponseData));

beforeEach(() => {
    render(
        <Provider store={testStore}>
            <DataLoader />
        </Provider>
    );
});

it('should render Preloader child component and not UserPage', () => {
    const preloader = screen.getByTestId('preloader');
    const userPage = screen.queryByTestId('user-page');

    expect(preloader).toBeInTheDocument();
    expect(userPage).not.toBeInTheDocument();
});