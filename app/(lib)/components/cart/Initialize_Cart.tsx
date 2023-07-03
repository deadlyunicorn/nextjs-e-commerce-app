'use client'


import { useEffect  } from "react"
import { getCookies, setCookie } from "../../api/cookies"
import { createCart, getCart } from "../../api/cart";

//No async() on client components..
export const CookieVerify = () => {

    
    //check those:
    //https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
    //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#custom-invocation-using-starttransition



    useEffect(()=>{

        (async()=>{


            const cartCookieArray = [...await getCookies()]
            .filter(cookie=>{
                if(cookie.name=="cart_id"){
                    return true;
                }})

            //get the value => cartCookieArray[0].value
            // await deleteCookie("cart_id");

            if (cartCookieArray.length == 0){
                
                await createCart().then(
                    async(cart)=>{
                        await setCookie(cart.id)
                    }
                )
                
            }
            

        })()

    },[])


    return(
          <>
            
          </>
    )
}
