import { shallow,  configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import { DataLoader } from './data-loader.component';

configure({ adapter: new Adapter() });

const mockUser = {
    userId: 9,
    username: 'Mike Lee'
}

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