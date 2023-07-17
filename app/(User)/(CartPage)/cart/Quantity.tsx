'use client'

import { getCart, updateCart } from "@/app/(User)/(lib)/api/cart";
import { Cart_Failure, Cart_Success } from "@/app/(User)/(lib)/components/cart/add_Cart";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useState, useTransition } from "react";
import { getCartCookie } from "@/app/(User)/(lib)/api/cookies";

const QuantityBox = ({item,cart_id}:{item:LineItem,cart_id:string}) => {

    
    const [quantity,setQuantity] = useState(item.quantity); 
    const maxQuantity = ( item.quantity && item.quantity > 10 ) ? item.quantity+1 : 11 ;
    const mockArray = [... new Array(maxQuantity)].map((item,index)=>index);


    useEffect(()=>{
        setQuantity(item.quantity)
    },[item.quantity])
    ////////////
    const [loading,setLoading] = useState(false);
    const router = useRouter();
    const [success,setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);
    const [error,setError] = useState (' ');
    ////////////

    useEffect(()=>{

        if(loading){
            setSuccess(true);
            setLoading(false);

            setTimeout(()=>{
                setSuccess(false);
            },7000)

        }
       

    },[quantity])
    
    useEffect(()=>{

        if (loading){
            setLoading(false);

            setTimeout(()=>{
                setFailure(false);
            },5000)
        }
       


    },[failure])

    const RemoveItemButton = () => (

        <button 
            onClick={async()=>{
                    try{

                        setLoading(true);
                        await updateCart(cart_id!,'0',item.id);
                        setQuantity(0)
                    
                    }
                    catch(error){
                    
                        setError(JSON.stringify(error));
                        setFailure(true);

                    
                    }
                    finally{

                        router.refresh();

                    }
        
            }}
            className="uppercase">
            <svg 
                viewBox="0 0 105 105"
                className="fill-none stroke-red-500 hover:stroke-red-400 stroke-[8px] w-5 h-5 ">

            <path
            // style="fill:none;stroke:#000000;stroke-width:3.77144;stroke-linecap:butt;stroke-linejoin:bevel;stroke-dasharray:none;paint-order:markers fill stroke"
            d="M 14.593557,10.83938 31.838958,94.993954 H 73.994379 L 91.239777,10.83938 c -25.54874,0 -51.09748,0 -76.64622,0 z"/>
            </svg>
        </button>
    )

    const SetQuantityField = () => (
        <div className="
            flex justify-end  
            gap-x-1">

            <span>Quantity</span>
            <select
                className="text-slate-900 rounded-lg"
                defaultValue={quantity}

                onChange={async(e)=>{
                        try{

                            setLoading(true);
                            await updateCart(cart_id!,e.target.value,item.id);
                            //update <option> only if successful!
                            setQuantity(+e.target.value)

                        }
                        catch(error){

                            setError(JSON.stringify(error));
                            setFailure(true);
                            
                        }
                        finally{
                            router.refresh();
                        }
            
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
    



    if (cart_id==undefined){

        return(
            <>Loading..</>
        )
    }
    else{

        switch(loading){
            
            case (false):
                return (
                    <div className="
                        flex justify-evenly relative">
                        

                        {success&&
                        <Cart_Success quantity={quantity} item_name={item.name}/>}

                        {failure&&
                        <Cart_Failure error={error}/>} 



                        <RemoveItemButton/>

                        <SetQuantityField/>

                        

                    </div>
                )
            case(true):
                return (
                    <>Updating cart...</>
                )

        }
    }
    
}



export default QuantityBox;