import { shallow, configure }  from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { shallowToJson } from 'enzyme-to-json'
import React from 'react';
import ToDoItem from './to-do-item.component';

configure({ adapter: new Adapter() });

it('should render ToDoItem', () => {
    const wrapper = shallow(<ToDoItem type='forTodo' id={1} text={'first'} completed={1} selectedReward={null}/>)

    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('should change ToDoItem text to "hi"', () => {
    const wrapper = shallow(<ToDoItem type='forTodo' id={1} text={'first'} completed={1} selectedReward={null} />)

    wrapper.find('.todo-edit-form-textfield').simulate('change', { target: { name: 'text', value: 'hi' } });

    expect(wrapper.state()).toEqual({text: 'hi'});
});