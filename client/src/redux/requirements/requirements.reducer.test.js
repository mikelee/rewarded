import requirementReducer from './requirements.reducer';
import { setRequirements } from './requirements.actions';

const requirements = [
    {reward_id: 1, todo_id: 2, text: 'requirement 1', completed: 1},
    {reward_id: 1, todo_id: 3, text: 'requirement 2', completed: 1},
    {reward_id: 1, todo_id: 4, text: 'requirement 3', completed: 0}
];

it('should not set the requirements', () => {
    expect(requirementReducer(undefined, {})).toEqual({ requirements: null});
});

it('should set the requirements', () => {
    const initialState = {
        requirements: null
    };

    expect(requirementReducer(initialState, setRequirements(requirements))).toEqual({ requirements: requirements});
});