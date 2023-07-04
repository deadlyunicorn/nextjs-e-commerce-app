'use server'

import { Cart } from "@chec/commerce.js/types/cart";
import { getCartCookie } from "./cookies";


export const createCart = async () : Promise<Cart> => {
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

export const getCart = async () =>{
    const url = new URL(
        `https://api.chec.io/v1/carts/${await getCartCookie()}`
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
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error(`Fetch failed`);
    }

    return res.json();

}

export const addCart = async (id:string,quantity:string) =>{
    "use server"
    const url = new URL(
        `https://api.chec.io/v1/carts/${await getCartCookie()}`
    )

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

    const body = {
        id: id,
        quantity: quantity,
    }

    const res = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    })

    console.log(JSON.stringify(body))

    if (!res.ok) {
        throw new Error(`Fetch failed ${res.status}`);
    }

    return res.json();

}


