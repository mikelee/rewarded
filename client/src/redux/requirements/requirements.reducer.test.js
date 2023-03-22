import requirementsReducer from './requirements.reducer';
import { setRequirements } from './requirements.actions';

const requirements = [
    {rewardId: 1, todoId: 2, text: 'requirement 1', completed: 1, timestamp: '2023-03-08T06:49:33.913Z'},
    {rewardId: 1, todoId: 3, text: 'requirement 2', completed: 1, timestamp: '2023-03-08T06:49:43.318Z'},
    {rewardId: 1, todoId: 4, text: 'requirement 3', completed: 0, timestamp: '2023-03-08T06:49:47.183Z'}
];

it('should not set the requirements', () => {
    expect(requirementsReducer(undefined, {})).toEqual({ requirements: []});
});

it('should set the requirements', () => {
    const initialState = {
        requirements: []
    };

    expect(requirementsReducer(initialState, setRequirements(requirements))).toEqual({ requirements: requirements});
});