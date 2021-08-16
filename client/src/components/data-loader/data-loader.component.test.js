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