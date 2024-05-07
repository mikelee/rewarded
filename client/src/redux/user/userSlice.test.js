import userReducer, { currentUserSet } from './userSlice';

it('should set the current user', () => {
    const intitialState = {
        currentUser: null
    };

    const user = {
        id: 9,
        username: 'mike'
    };

    expect(userReducer(intitialState, currentUserSet(user))).toEqual({currentUser: user});
});