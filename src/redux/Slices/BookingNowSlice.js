import { createSlice } from '@reduxjs/toolkit';

export default createSlice({
    name: 'booking',
    initialState: {
        infoClientBooking: null,
        bookingDetails: null,
        note: null,
        isCheckOut: false,
    },
    reducers: {
        // IMMER
        addInfoBooking: (state, action) => {
            state.infoClientBooking = action.payload.infoClientBooking;
            state.bookingDetails = action.payload.bookingDetails;
            state.isCheckOut = false;
        },
        updateInfoBooking: (state, action) => {
            state.note = action.payload.note;
            state.infoClientBooking = action.payload.infoClientBooking;
            state.isCheckOut = false;
        },
        updateCheckOut: (state, action) => {
            state.isCheckOut = action.payload.isCheckOut;
        }, // action creators
    },
});
