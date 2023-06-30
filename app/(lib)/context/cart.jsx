import { ReactNode, createContext, useReducer } from "react";
import { commerce } from "../api/commerce";
import { Cart } from "@chec/commerce.js/types/cart";


const CartStateContext = createContext({});
const CartDispatchContext = createContext({});

const SET_CART = "SET_CART";

const initialState = {
    total_items:0,
    total_unique_items:0,
    line_items: []
};


const cart_Reducer = ( state, action ) =>{
    switch(action.type){
        case "SET_CART":
            return {...state, ...action.newCart}
        default:
            throw new Error(`Uknown action.`)
    }
}

export const CartProvider = ({children}) =>{

    const [cart, cartDispatch] = useReducer( cart_Reducer , initialState)

    const setCart = (newCart) =>  cartDispatch({action:SET_CART,newCart})

    const getCart = async()=>{
        try{
            const cart = await commerce.cart.retrieve();
            setCart(cart);
        }
        catch (error){
            console.error(error);
        }
    }

    return (
        <CartDispatchContext.Provider value={{setCart}}>
            <CartStateContext.Provider value={getCart}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
} 