import { createSlice } from "@reduxjs/toolkit";

export const accountSlice = createSlice({
  name: "account",
  initialState: {
    isOfficial: false,
    role: 0,
    userName: "",
    email: "",
    followid: 0,
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
    setFollowId: (state, action) => {
      state.followid = action.payload;
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

export const { resetAccount, setRole, setUserName, setEmail, setIsOfficial,setFollowId } =
  accountSlice.actions;
export default accountSlice.reducer;
