import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
    name: "token",
    initialState: {
        value: "",
    },
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload;
        },
        resetToken: (state) => {
            return {
                value: "",
            };
        }
    },
});

export const { setToken,resetToken } = tokenSlice.actions;
export default tokenSlice.reducer;