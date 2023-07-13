import { Cart } from "@chec/commerce.js/types/cart";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState:{ value: boolean} = {
    value : false
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart : (state, action:PayloadAction<boolean>) =>{
            state.value = action.payload
        }
    }
})

export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;