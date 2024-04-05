import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { HostLogin, HostGetInfo } from '~/services/hostauth.service';
import { ToastContainer, toast } from 'react-toastify';
import { LOCAL_STORAGE_TOKEN_HOST } from '~/helpers/constants';
import setAuthToken from '~/helpers/setAuthToken';
import { useDispatch } from 'react-redux';

const hostAuthSlice = createSlice({
    name: 'hostAuth',
    initialState: { isLoadng: true, isAuthenticated: false, infoHost: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(HostLoadUser.pending, (state, action) => {
                state.isLoadng = true;
            })
            .addCase(HostLoadUser.fulfilled, (state, action) => {
                state.infoHost = action.payload.infoHost;
                state.isLoadng = action.payload.isLoading;
                state.isAuthenticated = action.payload.isAuthenticated;
            })
            .addCase(HostLogout.pending, (state, action) => {
                state.isLoadng = true;
            })
            .addCase(HostLogout.fulfilled, (state, action) => {
                state.infoHost = action.payload.infoHost;
                state.isLoadng = action.payload.isLoading;
                state.isAuthenticated = action.payload.isAuthenticated;
            });
    },
});

export const HostLoadUser = createAsyncThunk('host/loadUser', async () => {
    try {
        const response = await HostGetInfo();
        if (response.success) {
            return {
                isLoading: false,
                isAuthenticated: true,
                infoHost: response.data,
            };
        }
        return {
            isLoading: false,
            isAuthenticated: false,
            infoHost: null,
        };
    } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_HOST);
        return {
            isLoading: false,
            isAuthenticated: false,
            infoHost: null,
        };
    }
});
export const HostLogout = createAsyncThunk('host/Logout', async () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_HOST);
    return {
        isLoading: false,
        isAuthenticated: false,
        infoHost: null,
    };
});
/*
  => Host/fetchTodos/pending
  => Host/fetchTodos/fullfilled
  => Host/fetchTodos/rejected
*/

export default hostAuthSlice;
