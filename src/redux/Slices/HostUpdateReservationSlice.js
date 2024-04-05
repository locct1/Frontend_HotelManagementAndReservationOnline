import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

export default createSlice({
    name: 'hostUpdateReservation',
    initialState: {
        reservation: {},
        checkUpdateRoom: -1,
    },
    reducers: {
        // IMMER
        resetHostUpdateReservation: (state, action) => {
            state.reservation = {};
            state.checkRoom = -1;
        },
        loadReservation: (state, action) => {
            state.reservation = action.payload.reservation;
        },
        addCheckRoom: (state, action) => {
            state.checkUpdateRoom = action.payload;
        },
        roomMoved: (state, action) => {
            state.reservation.roomReservations = state.reservation.roomReservations.filter(
                (room) => room.id !== action.payload.roomMovedId,
            );
            state.reservation.roomReservations.push(action.payload.dataRoom);
            state.reservation.roomReservations.sort(function (a, b) {
                return a.id - b.id || a.name.localeCompare(b.name);
            });
        },
        addProductUpdate: (state, action) => {
            const room = state.reservation.roomReservations.find((room) => room.id === state.checkUpdateRoom);
            if (room) {
                let productInRoom = room.roomReservationProducts.find((item) => {
                    return item.productId === action.payload.product.id;
                });
                if (productInRoom) {
                    productInRoom.quantity += action.payload.quantity;
                    return;
                }
                action.payload.product.quantity = action.payload.quantity;
                room.roomReservationProducts.push(action.payload.product);
                state.reservation.roomReservations.sort(function (a, b) {
                    return a.id - b.id || a.name.localeCompare(b.name);
                });
            } else {
                toast.warning('Vui lòng chọn phong trước');
            }
        },
        removeProductInUpdateRoom: (state, action) => {
            const room = state.reservation.roomReservations.find((room) => room.id === action.payload.room.id);
            if (room) {
                let productInRoom = room.roomReservationProducts.find((item) => {
                    return item.id === action.payload.product.id;
                });
                if (productInRoom) {
                    if (productInRoom.quantity === 1) {
                        room.roomReservationProducts = room.roomReservationProducts.filter(
                            (product) => product.id !== productInRoom.id,
                        );
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
        addProductFromUpdateRoom: (state, action) => {
            const room = state.reservation.roomReservations.find((room) => room.id === action.payload.room.id);
            if (room) {
                let productInRoom = room.roomReservationProducts.find((item) => {
                    return item.id === action.payload.product.id;
                });
                if (productInRoom) {
                    productInRoom.quantity += action.payload.quantity;
                    return;
                }
                room.roomReservationProducts.push(action.payload.product);
                state.reservation.roomReservations.sort(function (a, b) {
                    return a.id - b.id || a.name.localeCompare(b.name);
                });
            } else {
                toast.warning('Vui lòng chọn phong trước');
            }
        },
    },
});
