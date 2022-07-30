import { createSlice } from "@reduxjs/toolkit";

const defaultState = {
    registered: false
}

const userSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem('userAuth')) || defaultState,
    reducers: {
        signIn(state, action) {
            const userInfo = action.payload;
            state.registered = true;
            state.auth = userInfo;
            localStorage.setItem('userAuth', JSON.stringify(state));
        },
        signOut(state) {
            state.registered = false;
            localStorage.removeItem('userAuth');
        }
    }
});

export const { signIn, signOut } = userSlice.actions;
export default userSlice;
