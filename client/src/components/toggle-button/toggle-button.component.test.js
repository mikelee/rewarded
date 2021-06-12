import { shallow, configure }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json'
import React from 'react';
import ToggleButton from './toggle-button.component';

configure({ adapter: new Adapter() });

it('should render ToggleButton with CheckRoundedIcon', () => {
    const wrapper = shallow(<ToggleButton type='forTodo' completed={1} toggleTodoCompleted={jest.fn()} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('should render Toggle Button without CheckRoundedIcon', () => {
    const wrapper = shallow(<ToggleButton type='forTodo' completed={0} toggleTodoCompleted={jest.fn()} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot();
})