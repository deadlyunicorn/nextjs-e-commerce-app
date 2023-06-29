"use client"

import { Cart, commerce } from "../api/commerce";

export default async function CartElement(){

    const cart = await Cart.retrieve();

    console.log("Your cart is:"+cart.id);

    return(
        <div>
            Cart: {cart.total_items}
        </div>
    )
}