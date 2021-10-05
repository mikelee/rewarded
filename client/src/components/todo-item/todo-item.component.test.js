import { shallow }  from 'enzyme';
import { shallowToJson } from 'enzyme-to-json'
import React from 'react';
import TodoItem from './todo-item.component';

it('should render TodoItem', () => {
    const wrapper = shallow(<TodoItem type='forTodo' id={1} text={'first'} completed={1} selectedRewardId={null}/>)

    expect(shallowToJson(wrapper)).toMatchSnapshot();
});

it('should change TodoItem text to "hi"', () => {
    const wrapper = shallow(<TodoItem type='forTodo' id={1} text={'first'} completed={1} selectedRewardId={null} />)

    wrapper.find('.todo-edit-form-textfield').simulate('change', { target: { name: 'text', value: 'hi' } });

    expect(wrapper.state()).toEqual({text: 'hi'});
});