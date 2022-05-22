import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import cartItems from "../../Mock/CartItems";
import axios from "axios"
import { openModal } from "../modal/modalSlice";

const initialState = {
    cartItems: [],
    amount: 3,
    total: 0,
    isLoading: true,
};

const url = "https://course-api.com/react-useReducer-cart-project";
export const getcartItems = createAsyncThunk("cart/getCartItems", async (name, thunkAPI) => {
    try {
        // console.log(name);
        //  console.log(thunkAPI.getState());
        thunkAPI.dispatch(openModal())
        const res = await axios(url)
        return res.data

    } catch (error) {
        return thunkAPI.rejectWithValue('something is wrong')



    }
});

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItem: (state, action) => {
            const ItemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== ItemId);
        },
        Increase: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount + 1;
        },
        decrease: (state, { payload }) => {
            const cartItem = state.cartItems.find((item) => item.id === payload.id);
            cartItem.amount = cartItem.amount - 1;
        },
        calculateTotals: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price;
            });
            state.amount = amount;
            state.total = total;
        },
    },
    extraReducers: {
        [getcartItems.pending]: (state) => {
            state.isLoading = true;
        },
        [getcartItems.fulfilled]: (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload;
        },
        [getcartItems.rejected]: (state,action) => {
            state.isLoading = false;
            console.log(action);
        },
    },
});

export const { clearCart, removeItem, Increase, decrease, calculateTotals } =
    cartSlice.actions;

export default cartSlice.reducer;
