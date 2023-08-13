'use client'
import { useEffect, useState  } from "react"
import {  getCookies, setCartCookie } from "../../api/cookies"
import { createCart, getCart } from "../../api/cart";
import { usePathname, useRouter } from "next/navigation";


//No async() on client components..!!!
export const CookieVerify = () => {


    const router = useRouter();
    const pathname = usePathname();

    const [cart_id,setCart_id] = useState<undefined|string> (undefined);
    
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
                        await setCartCookie(cart.id)
                        .then(()=>{
                            router.refresh();
                        })
                        
                    }
                )
                
            }
            else{
                // consider checking  cartCookieArray[0].value!="" ??
                setCart_id(cartCookieArray[0].value); 
            }
            

        })()

    },[cart_id,router,pathname])


    return(
          <>
            <div className="hidden">
            </div>
          </>
    )
}




