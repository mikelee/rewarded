import { setCurrentUser } from './user.actions';
import { UserActionTypes } from './user.types'

it('should create an action to set the current user', () => {
    const user = {
        id: 9,
        username: 'mike'
    };

    const expectedAction = {
        type: UserActionTypes.SET_CURRENT_USER,
        payload: user
    };

    expect(setCurrentUser(user)).toEqual(expectedAction);
});