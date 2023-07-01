'use server'

import { Cart } from "@chec/commerce.js/types/cart";


export const getCart = async () : Promise<Cart> => {
    const url = new URL(
        "https://api.chec.io/v1/carts"
    )

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

    const res = await fetch(url, {
        method: "GET",
        headers: headers,
    })

    if (!res.ok) {
        throw new Error(`Fetch failed`);
    }

    return res.json();
}
