import { setRequirements } from './requirements.actions';
import { requirementsActionTypes } from './requirements.types'

it('should create an action to set the requirements', () => {
    const requirements = [
        {reward_id: 1, to_do_id: 2, text: 'requirement 1', completed: 1},
        {reward_id: 1, to_do_id: 3, text: 'requirement 2', completed: 1},
        {reward_id: 1, to_do_id: 4, text: 'requirement 3', completed: 0}
    ];

    const expectedAction = {
        type: requirementsActionTypes.SET_REQUIREMENTS,
        payload: requirements
    };

    expect(setRequirements(requirements)).toEqual(expectedAction);
});