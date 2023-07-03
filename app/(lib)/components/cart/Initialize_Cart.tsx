'use client'


import { useEffect, useState, useTransition } from "react"
import {  deleteCookie, getCartCookie, getCookies, setCookie } from "../../api/cookies"
import { getCart } from "../../api/cart";

//No async() on client components..
export const CookieVerify = () => {

    const [cart,setCart] = useState<undefined|string> (undefined);

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
            .filter(cookie=>{
                if(cookie.name=="cart_id"){
                    setCart(cookie.value);
                    return true;
                }})

            //get the value => cartCookieArray[0].value
            // await deleteCookie("cart_id");

            if (cartCookieArray.length == 0){
                
                await getCart().then(
                    async(cart)=>{
                        await setCookie(cart.id)
                    }
                )
                
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
