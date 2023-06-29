'use client'

import { useState } from "react";
import { Cart } from "../api/commerce";

export const AddToCart=({item: item_id}:{item:string})=>{
    


    const handle_Click=async()=>{
        await Cart.add(item_id, quantity)

    }


    const handle_Change=(event: React.FormEvent<HTMLInputElement>)=>{
        
        const quantity = Number(event.currentTarget.value);
        if ( quantity < 11 ){
            if ( quantity == 0){
                setQuantity(1);
            }
            else{
                setQuantity(quantity);
            }
        }
    }

    const [quantity,setQuantity]=useState(1);

    return(

        <>
        <div className="
        py-2 
        text-lg
        flex 
        justify-between
        gap-x-5">
            <span className="text-white">
                Quantity:
            </span>
                    
            <input 
                type="number"
                className="
                    w-10 
                    rounded-md 
                    bg-white bg-opacity-[50%]
                    text-black text-center"
                max={10}
                min={1}
                onChange={handle_Change}
                value={quantity}
                name="quantity"
            />

        </div>

                 {/* peer should be before sibling */}
     
        <button 
            onClick={handle_Click}
            className="
                text-black
                w-full h-10 
                px-2
                bg-slate-300 rounded-md ">
                    ADD TO <b className="font-bold">CART</b>
        </button>
        
        </>
    )

}  