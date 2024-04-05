import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Login, GetInfo } from '~/services/clientauth.service';
import { ToastContainer, toast } from 'react-toastify';
import { LOCAL_STORAGE_TOKEN_CLIENT } from '~/helpers/constants';
import setAuthToken from '~/helpers/setAuthToken';
import { useDispatch } from 'react-redux';

const clientAuthSlice = createSlice({
    name: 'clientAuth',
    initialState: { isLoadng: true, isAuthenticated: false, infoClient: null },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ClientLoadUser.pending, (state, action) => {
                state.isLoadng = true;
            })
            .addCase(ClientLoadUser.fulfilled, (state, action) => {
                state.infoClient = action.payload.infoClient;
                state.isLoadng = action.payload.isLoading;
                state.isAuthenticated = action.payload.isAuthenticated;
            })
            .addCase(ClientLogout.pending, (state, action) => {
                state.isLoadng = true;
            })
            .addCase(ClientLogout.fulfilled, (state, action) => {
                state.infoClient = action.payload.infoClient;
                state.isLoadng = action.payload.isLoading;
                state.isAuthenticated = action.payload.isAuthenticated;
            });
    },
});

export const ClientLoadUser = createAsyncThunk('client/loadUser', async () => {
    try {
        const response = await GetInfo();
        if (response.success) {
            return {
                isLoading: false,
                isAuthenticated: true,
                infoClient: response.data,
            };
        }
        return {
            isLoading: false,
            isAuthenticated: false,
            infoClient: null,
        };
    } catch (error) {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_CLIENT);
        return {
            isLoading: false,
            isAuthenticated: false,
            infoClient: null,
        };
    }
});
export const ClientLogout = createAsyncThunk('client/Logout', async () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_CLIENT);
    return {
        isLoading: false,
        isAuthenticated: false,
        infoClient: null,
    };
});
/*
  => Client/fetchTodos/pending
  => Client/fetchTodos/fullfilled
  => Client/fetchTodos/rejected
*/

export default clientAuthSlice;
