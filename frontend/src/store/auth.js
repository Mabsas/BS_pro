import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name:"auth",
    initialState: {isLoggedIn: false, role: "user"},
    reducers: {
        login(state) {
            state.isLoggedIn = true;

        },
        logout(state) {
            state.isLoggedIn = false;
        },
        changeRole(state, action) {
            const role =  action.payload; //role we are giving on frontend
            state.role = role;      //will update role in backkend
        },
    },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;