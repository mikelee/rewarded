import userReducer from './user.reducer';
import { setCurrentUser } from './user.actions'

it('should set the current user', () => {
    const intitialState = {
        currentUser: null
    };

    const user = {
        id: 9,
        username: 'mike'
    };

    expect(userReducer(intitialState, setCurrentUser(user))).toEqual({currentUser: user});
});