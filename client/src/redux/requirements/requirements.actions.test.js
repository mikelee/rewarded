import { setRequirements } from './requirements.actions';
import requirementsActionTypes from './requirements.types'

it('should create an action to set the requirements', () => {
    const requirements = [
        {rewardId: 1, todoId: 2, text: 'requirement 1', completed: 1},
        {rewardId: 1, todoId: 3, text: 'requirement 2', completed: 1},
        {rewardId: 1, todoId: 4, text: 'requirement 3', completed: 0}
    ];

    const expectedAction = {
        type: requirementsActionTypes.SET_REQUIREMENTS,
        payload: requirements
    };

    expect(setRequirements(requirements)).toEqual(expectedAction);
});