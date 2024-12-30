import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isOfficial: false,
    role: 0,
    userName: "",
    email: "",
  },
  reducers: {
    setRole: (state, action) => {
      state.role = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setIsOfficial: (state, action) => {
      state.isOfficial = action.payload;
    },
    resetAccount: (state) => {
      return {
        isOfficial: false,
        role: 1,
        userName: "",
        email: "",
      };
    },
  },
});

export const { resetAccount, setRole, setUserName, setEmail, setIsOfficial } =
  accountSlice.actions;
export default accountSlice.reducer;
