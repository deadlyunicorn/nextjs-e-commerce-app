'use client'
import { useEffect, useState  } from "react"
import { getCookies, setCookie } from "../../api/cookies"
import { createCart, getCart } from "../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCart } from "../redux/cartSlice";


//No async() on client components..!!!
export const CookieVerify = () => {

    const [retry,forceRetry] = useState(0);
    const cart = useSelector((state:RootState)=> state.cart.value);
    const dispatch = useDispatch();
    
    //check those:
    //https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
    //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#custom-invocation-using-starttransition



    useEffect(()=>{

        (async()=>{


            const cartCookieArray = [...await getCookies()]
            .filter(cookie=>(
                cookie.name=="cart_id")
            )

            //get the value => cartCookieArray[0].value
            // await deleteCookie("cart_id");

            if (cartCookieArray.length == 0){
                
                await createCart().then(
                    async(cart)=>{
                        await setCookie(cart.id)
                        forceRetry(retry+1);
                    }
                )
                
            }
            else{
                dispatch(setCart( cartCookieArray[0].value ) )
            }
            

        })()

    },[retry,cart,dispatch])


    return(
          <>
            {cart}
          </>
    )
}




