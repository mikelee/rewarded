import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { DataLoader } from './data-loader.component';

const mockUser = {
    userId: 9,
    username: 'Mike Lee'
}

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

it('should render Preloader child component', () => {
    const wrapper = shallow(<DataLoader currentUser={mockUser} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('should render UserPage child component', () => {
    const wrapper = shallow(<DataLoader currentUser={mockUser} />);

    wrapper.setState({ dataLoaded: true });

    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('should call componentDidMount and then fetchUserData', () => {
    const wrapper = shallow(<DataLoader currentUser={mockUser} />);
    const instance = wrapper.instance();

    jest.spyOn(instance, 'componentDidMount');
    jest.spyOn(instance, 'fetchUserData');
    instance.componentDidMount();

    expect(instance.componentDidMount).toHaveBeenCalledTimes(1);
    expect(instance.fetchUserData).toHaveBeenCalledTimes(1);
});

it('should return userData from fetchUserData()', async () => {
    const mockUserData = {
        todos: [
            {id: 1, text: 'First todo'},
            {id: 2, text: 'Second todo'},
            {id: 3, text: 'Third todo'}
        ],
        rewards: [
            {id: 1, text: 'First reward'},
            {id: 2, text: 'Second reward'},
            {id: 3, text: 'Third reward'}
        ],
        requirements: [
            {id: 1, text: 'First requirement'},
            {id: 2, text: 'Second requirement'},
            {id: 3, text: 'Third requirement'}
        ],
        settings: [
            {color: 'red'}
        ]
    };

    const wrapper = shallow(<DataLoader currentUser={mockUser} />);
    const instance = wrapper.instance();

    jest.spyOn(instance, 'fetchUserData');
    const userData = await instance.fetchUserData();

    expect.assertions(2);
    expect(instance.fetchUserData).toHaveBeenCalledTimes(1);
    return expect(userData).toEqual(mockUserData);
});