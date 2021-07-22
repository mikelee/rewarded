import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import React from 'react';
import DataLoader from './data-loader.component';

configure({ adapter: new Adapter() });


// const mockUser = {
//     userId: 9,
//     username: 'Joe Smith'
// }

// it('should render DataLoader', () => {
//     const wrapper = shallow(<DataLoader currentUser={mockUser} />);

//     expect(shallowToJson(wrapper)).toMatchSnapshot();
// });