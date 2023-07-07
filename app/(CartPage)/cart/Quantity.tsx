'use client'

import { getCart, updateCart } from "@/app/(lib)/api/cart";
import { Cart_Failure, Cart_Success } from "@/app/(lib)/components/cart/add_Cart";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { getCartCookie } from "@/app/(lib)/api/cookies";

const QuantityBox = ({item}:{item:LineItem}) => {

    const [cart_id,setCart] = useState<undefined|string>(undefined);

    useEffect(()=>{
        (async()=>{
            setCart (await getCartCookie());
        })()
    },[])

    
    
    
    
    
    const [quantity,setQuantity] = useState(item.quantity);

    const [pending,startTransition] = useTransition();
    const router = useRouter();
    //used to refresh the page after adding to cart.
    const [success,setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);
    const [error,setError] = useState (' ');


    


    const maxQuantity = ( quantity && quantity > 10 ) ? quantity+1 : 11 ;
    const mockArray = [... new Array(maxQuantity)].map((item,index)=>index);


    switch(pending){
        case (true):
            return (
                <>Updating cart...</>
            )
        case (false):
            return (
                <div className="relative">
                    {success&&
                    <Cart_Success/>}

                    {failure&&
                    <Cart_Failure error={error}/>} 

                    <span>Quantity</span>
                    <select
                        defaultValue={item.quantity}
                        onChange={(e)=>{
                            startTransition(async()=>{
                                try{
                                    await updateCart(cart_id!,e.target.value,item.id);
                                    setSuccess(true);
                                    setTimeout(()=>{
                                        setSuccess(false);
                                    },10000)
                                    
                                 }
                                 catch(error){
                                    setFailure(true);
                                    setError(JSON.stringify(error));
                                    setTimeout(()=>{
                                        setFailure(false);
                                    },10000)
                                }
                                finally{
                                    router.refresh();
                                }
                    
                            })
                        }}>
                        {mockArray.map(
                            option=>
                            <option 
                                className="text-black" 
                                key={option}>
                                {option}
                            </option>
                        )}    
                    </select> 
                </div>
            )

    }
    
}

export default QuantityBox;