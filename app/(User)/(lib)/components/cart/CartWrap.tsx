'use client'
import { ReactNode, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCart } from "../redux/cartSlice";

export const CartButtonWrapper = ({children}:{children:ReactNode}) => {

    const cart = useSelector((state:RootState)=> state.cart.value);
    const dispatch = useDispatch();


    return (

        <div className="flex">
            <button onClick={()=>{dispatch(setCart(!cart))}}>
                {children}
            </button>

        </div>

    )
}
