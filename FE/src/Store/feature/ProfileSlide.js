import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        FisrtName: "",
        LastName: "",
        Address: "",
        DoB: "",
        Phone: "",
        Rating: 0,
        IdentiticationNumber: "",
        Description: "",
    },
    reducers:{
        setFirstName: (state, action) => {
            state.FisrtName = action.payload;
        },
        setLastName: (state, action) => {
            state.LastName = action.payload;
        },
        setAddress: (state, action) => {
            state.Address = action.payload;
        },
        setDoB: (state, action) => {
            state.DoB = action.payload;
        },
        setPhone: (state, action) => {
            state.Phone = action.payload;
        },
        setRating: (state, action) => {
            state.Rating = action.payload;
        },
        setIdentiticationNumber: (state, action) => {
            state.IdentiticationNumber = action.payload;
        },
        setDescription: (state, action) => {
            state.Description = action.payload;
        },
    },
});

export const { setFirstName, setLastName, setAddress, setDoB, setPhone, setRating, setIdentiticationNumber, setDescription } = profileSlice.actions;
export default profileSlice.reducer;