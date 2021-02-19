import { setCurrentUser } from './user.actions';
import { userActionTypes } from './user.types'

it('should create an action to set the current user', () => {
    const user = {
        id: 9,
        username: 'mike'
    };

    const expectedAction = {
        type: userActionTypes.SET_CURRENT_USER,
        payload: user
    };

    expect(setCurrentUser(user)).toEqual(expectedAction);
});