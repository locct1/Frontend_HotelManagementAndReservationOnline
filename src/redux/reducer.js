import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import hostAuthSlice from './Slices/HostAuthSlice';
import adminAuthSlice from './Slices/AdminAuthSlice';
import clientAuthSlice from './Slices/ClientAuthSlice';
import bookingNowSlice from './Slices/BookingNowSlice';
import hostReservationSlice from './Slices/HostReservationSlice';
import { combineReducers } from 'redux';
import HostUpdateReservationSlice from './Slices/HostUpdateReservationSlice';
const rootReducer = combineReducers({
    hostAuth: hostAuthSlice.reducer,
    adminAuth: adminAuthSlice.reducer,
    clientAuth: clientAuthSlice.reducer,
    bookingNow: bookingNowSlice.reducer,
    hostReservation: hostReservationSlice.reducer,
    hostUpdateReservation: HostUpdateReservationSlice.reducer,
});

export default rootReducer;
