'use server'

import { Cart } from "@chec/commerce.js/types/cart";
import { getCartCookie } from "./cookies";
import { revalidatePath, revalidateTag } from "next/cache";


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
        next: {revalidate:0}

    })

    if (!res.ok) {
        throw new Error(`Fetch failed - (${res.status}) ${res.statusText}`);
    }

    return res.json();
}


export const getCart = async():Promise<Cart|undefined> =>{
    try{
        const cartCookie = await getCartCookie();
        if ( cartCookie == null ){
            throw new Error('No cookie');
        }

        const url = new URL(
            `https://api.chec.io/v1/carts/${cartCookie}`
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
            cache: "force-cache",
            next: {
                tags: ['cart'],
            }
        })

        if (!res.ok) {
            // if (res.status == 404){
                // old cart still used
            // }
            throw new Error(`Fetch failed - (${res.status}) ${res.statusText}`);
        }

        return res.json();
    }
   catch (error){
        return undefined;
   }

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
        next: {revalidate:0},
        body: JSON.stringify(body)
    })


    if (!res.ok) {
        throw new Error(`Fetch failed ${res.status}`);
    }
    else{
        revalidateTag('cart');
    }


    return res.json();

}


export const updateCart = async (cart_id:string,quantity:string,item_id:string) =>{
    "use server"
    const url = new URL(
        `https://api.chec.io/v1/carts/${cart_id}/items/${item_id}`
    )

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };

    const body = {
        line_item_id: item_id,
        quantity: quantity,
    }

    const res = await fetch(url, {
        method: "PUT",
        headers: headers,
        next: {revalidate:0},
        body: JSON.stringify(body)
    })


    if (!res.ok) {
        throw new Error(`Fetch failed ${res.status}`);
    }
    else{
        revalidateTag('cart');
    }


    return res.json();

}


