'use client'
import { useEffect, useState  } from "react"
import { createCookie, getCookies, setCookie } from "../../api/cookies"
import { createCart, getCart } from "../../api/cart";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setCart } from "../redux/cartSlice";
import { useRouter } from "next/navigation";


//No async() on client components..!!!
export const CookieVerify = () => {


    const router = useRouter();

    const [cart_id,setCart_id] = useState<undefined|string> (undefined);
    
    //check those:
    //https://nextjs.org/docs/app/api-reference/functions/cookies#cookiessetname-value-options
    //https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions#custom-invocation-using-starttransition



    useEffect(()=>{

        (async()=>{


            const cookies = await getCookies();
            
            const cartCookieArray = [...cookies]
            .filter(cookie=>(
                cookie.name=="cart_id")
            )

            const darkModeCookieArray = [...cookies]
            .filter(cookie=>(
                cookie.name=="darkMode")
            )

            //get the value => cartCookieArray[0].value
            // await deleteCookie("cart_id");

            if (cartCookieArray.length == 0){
                
                await createCart().then(
                    async(cart)=>{
                        await setCookie(cart.id)
                        .then(()=>{
                            router.refresh();
                        })
                        
                    }
                )
                
            }
            else{
                setCart_id(cartCookieArray[0].value); 
            }

            if(darkModeCookieArray.length == 0 ){
                await createCookie('darkMode','light')
                .then(()=>{
                    router.refresh();
                })
            }
            

        })()

    },[cart_id,router])


    return(
          <>
            <div className="hidden">
            </div>
          </>
    )
}




