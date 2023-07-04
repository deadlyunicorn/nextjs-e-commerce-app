'use client'

import { ReactNode } from "react"
import { Provider } from "react-redux"
import store from "./store"

const CartProvider = ({children}:{children:ReactNode}) => {


    return (
        <Provider store={store}>
            {children}
        </Provider>
    )

}

export default CartProvider;