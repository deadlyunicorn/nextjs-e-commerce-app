'use client'


import { useEffect, useState, useTransition } from "react"
import {  deleteCookie, getCartCookie, getCookies, setCookie } from "./Cookies"
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { Cart } from "@chec/commerce.js/types/cart";
import { getCart } from "../../api/cart";

export const NewForm = () => {

    const [cart,setCart] = useState<undefined|string> (undefined);

    let [isPending, startTransition] = useTransition();
    //need this to set the cookie.
    //check those:

    //https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
    //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#custom-invocation-using-starttransition


    //actually I commented out the code and it works without it ??????? WTF.

      // startTransition(async()=>{
          
        //     setCookie();
        // })

    useEffect(()=>{

        (async()=>{
            const cartCookieArray = [...await getCookies()]
            .filter(cookie=>cookie.name=="cart_id")

            //get the value => cartCookieArray[0].value
            // await deleteCookie("cart_id");

            const tempCart = await getCart().then(
                cart=>cart.id
            )


            if (cartCookieArray.length == 0){
                cartCookieArray.length
                await setCookie(tempCart);
            }

            if (!cart){
                setCart(await getCartCookie());
            }
        })()

    },[cart])

    return(
          <>
          Your cart is:
            {cart}
          </>
    )
}
