import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState:{ value: undefined|string} = {
    value : undefined
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart : (state, action:PayloadAction<string>) =>{
            state.value = action.payload
        }
    }
})

export const {setCart} = cartSlice.actions;

export default cartSlice.reducer;