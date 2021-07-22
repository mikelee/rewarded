import requirementsReducer from './requirements.reducer';
import { setRequirements } from './requirements.actions';

const requirements = [
    {rewardId: 1, todoId: 2, text: 'requirement 1', completed: 1},
    {rewardId: 1, todoId: 3, text: 'requirement 2', completed: 1},
    {rewardId: 1, todoId: 4, text: 'requirement 3', completed: 0}
];

it('should not set the requirements', () => {
    expect(requirementsReducer(undefined, {})).toEqual({ requirements: null});
});

it('should set the requirements', () => {
    const initialState = {
        requirements: null
    };

    expect(requirementsReducer(initialState, setRequirements(requirements))).toEqual({ requirements: requirements});
});