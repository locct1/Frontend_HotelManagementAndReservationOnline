import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export default createSlice({
    name: 'hostReservation',
    initialState: {
        listRooms: [],
        checkRoom: -1,
    },
    reducers: {
        // IMMER
        resetHostReservation: (state, action) => {
            state.listRooms = [];
            state.checkRoom = -1;
        },
        addRoom: (state, action) => {
            state.listRooms.push(action.payload);
            state.listRooms.sort(function (a, b) {
                return a.id - b.id || a.name.localeCompare(b.name);
            });
        },
        addCheckRoom: (state, action) => {
            state.checkRoom = action.payload;
        },
        removeRoom: (state, action) => {
            state.listRooms = state.listRooms.filter((room) => room.id !== action.payload.id);
            state.listRooms.sort(function (a, b) {
                return a.id - b.id || a.name.localeCompare(b.name);
            });
        },
        addProduct: (state, action) => {
            const room = state.listRooms.find((room) => room.id === state.checkRoom);
            if (room) {
                let productInRoom = room.listProducts.find((item) => {
                    return item.id === action.payload.product.id;
                });
                if (productInRoom) {
                    productInRoom.quantity += action.payload.quantity;
                    return;
                }
                action.payload.product.quantity = action.payload.quantity;
                room.listProducts.push(action.payload.product);
                state.listRooms.sort(function (a, b) {
                    return a.id - b.id || a.name.localeCompare(b.name);
                });
            } else {
                toast.warning('Vui lòng chọn phong trước');
            }
        },
        removeProductInRoom: (state, action) => {
            const room = state.listRooms.find((room) => room.id === action.payload.room.id);
            if (room) {
                let productInRoom = room.listProducts.find((item) => {
                    return item.id === action.payload.product.id;
                });
                if (productInRoom) {
                    if (productInRoom.quantity === 1) {
                        room.listProducts = room.listProducts.filter((product) => product.id !== productInRoom.id);
                    } else {
                        productInRoom.quantity = productInRoom.quantity - 1;
                    }
                    return;
                }

                state.listRooms.sort(function (a, b) {
                    return a.id - b.id || a.name.localeCompare(b.name);
                });
            } else {
                toast.warning('Không tìm thấy phòng');
            }
        },
        addProductFromRoom: (state, action) => {
            const room = state.listRooms.find((room) => room.id === action.payload.room.id);
            if (room) {
                let productInRoom = room.listProducts.find((item) => {
                    return item.id === action.payload.product.id;
                });
                if (productInRoom) {
                    productInRoom.quantity += action.payload.quantity;
                    return;
                }
                action.payload.product.quantity = action.payload.quantity;
                room.listProducts.push(action.payload.product);
                state.listRooms.sort(function (a, b) {
                    return a.id - b.id || a.name.localeCompare(b.name);
                });
            } else {
                toast.warning('Vui lòng chọn phong trước');
            }
        },
    },
});
