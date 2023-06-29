'use client'

import { useState } from "react";
import { cart } from "../commerce";
import Commerce from "@chec/commerce.js";

export const AddToCart=({item}:{item:string})=>{
    
    const handle_Click=()=>{
        cart.refresh();
        alert(item +"aaa___" +quantity);
    }


    const commerce = new Commerce('pk_test_530304959aba3f191ed92e60373ec97da4de0981b5798'); 

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
        <div className="flex gap-x-5">
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