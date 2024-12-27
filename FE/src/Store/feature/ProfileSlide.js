import { createSlice } from "@reduxjs/toolkit";

export const profileSlice = createSlice({
    name: "profile",
    initialState: {
        FirstName: "",
        LastName: "",
        Address: "",
        DoB: "",
        Phone: "",
        Rating: 0,
        IdentiticationNumber: "",
        Description: "",
        ImageURL: [""],
    },
    reducers:{
        setFirstName: (state, action) => {
            state.FirstName = action.payload;
        },
        setLastName: (state, action) => {
            state.LastName = action.payload;
        },
        setAddress: (state, action) => {
            state.Address = action.payload;
        },
        setImageURL: (state, action) => {
            state.ImageURL = action.payload;
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
        resetProfile: (state) => {
            return {
                FirstName: "",
                LastName: "",
                Address: "",
                DoB: "",
                Phone: "",
                Rating: 0,
                IdentificationNumber: "",
                Description: "",
                ImageURL: [],
            };
        },
    },
});

export const { resetProfile, setFirstName, setLastName, setAddress,setImageURL, setDoB, setPhone, setRating, setIdentiticationNumber, setDescription } = profileSlice.actions;
export default profileSlice.reducer;