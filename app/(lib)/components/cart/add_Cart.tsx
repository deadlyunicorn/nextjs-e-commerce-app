'use client'

import { ReactNode, useEffect, useState, useTransition } from "react";
import { addCart } from "../../api/cart";
import { useRouter } from "next/navigation";
import "@/app/(lib)/styles/animations.scss"
import { Cart } from "@chec/commerce.js/types/cart";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { Product } from "@chec/commerce.js/types/product";

export const AddToCart = ({ price, item, cartItem }: { price: number,item : Product, cartItem: LineItem|undefined }) => {


    //cartItem can be undefined 
    //when the item is not in cart

    const [quantity, setQuantity] = useState(1);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const arr10 = [...Array(10).keys()];
    
    const router = useRouter();
    //used to refresh the page after adding to cart.
    const [loading,setLoading] = useState(false);
    const [success,setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);
    const [error,setError] = useState (' ');

   
    
    useEffect(()=>{

        if (loading){
            setLoading(false);

            setTimeout(()=>{
                setFailure(false);
            },5000)
        }
       


    },[failure])

    useEffect(()=>{
        setLoading(false); //this will prevent weird numbers from success status 
        //when router.refresh() happens, this runs..
    },[cartItem?.quantity])



    const handle_Change = (event: React.FormEvent<HTMLSelectElement>) => {


        // if (tempQuantity < 11) {

        //     if (tempQuantity == 0) {
        //         setQuantity(1);
        //     }
        //     else {
                setQuantity(Number(event.currentTarget.value));
            // }
        // }
    }

    

    const handle_AddToCart = async(item_id:string,quantity:string) => {
        
            setLoading(true);


            const requestedCartItems = (cartItem ? cartItem.quantity : 0)+Number(quantity)
            try{


                if ( requestedCartItems > 10){

                    throw (`Cart capacity for this item reached ${(cartItem ? cartItem.quantity : 0)+Number(quantity)}/10`)
                
                }

                else{
                    
                    await addCart(item_id, quantity);
                    setTotalQuantity(requestedCartItems)
                    setQuantity(1);
                    setSuccess(true);

                    setTimeout(()=>{
                        setSuccess(false);
                    },5000)

                }
            }
            catch(error){
                setError(JSON.stringify(error+""));
                setFailure(true);
            }
            finally{
                router.refresh();
            }
            
        }
                    

    const QuantityButton = ({ children }: { children: ReactNode }) => {

        const handle_QuantityButton = () => {
            if (children == "+") {

                if (quantity < 10) {

                    setQuantity(quantity + 1);

                }
            }
            else if (children == "-") {

                if (quantity > 1) {

                    setQuantity(quantity - 1);

                }


            }
        }

        return (
            <button
                className="
                    w-5
                    rounded-md 
                    bg-blue-500 hover:bg-sky-600 
                    bg-opacity-50
                    text-slate-200 hover:text-white
                    text-center
                    font-extrabold
                    "
                onClick={handle_QuantityButton}>

                {children}

            </button>
        )

    }
    return (

        <div className="relative">
            {success&&
            <Cart_Success quantity={totalQuantity} item_name={item.name}/>}

            {failure&&
            <Cart_Failure error={error}/>} 
            <div className="
        pt-2
        text-lg
        flex flex-wrap
        sm:justify-between
        justify-center
        gap-x-5">
                <span className="text-white">
                    Quantity:
                </span>

                <div className="
                flex gap-x-2">

                    <QuantityButton>
                        -
                    </QuantityButton>

                    <select
                        value={quantity}
                        onChange={handle_Change}
                        className="w-10 
                        rounded-md 
                        bg-white bg-opacity-[50%]
                        text-black text-center">

                        {arr10.map((item) => (
                            <option key={item}>{item + 1}</option>
                        ))}

                    </select>
                    <QuantityButton>
                        +
                    </QuantityButton>


                </div>




            </div>
            <p className="text-white text-right">
                {price * quantity} €
            </p>


            {/* peer should be before sibling */}
            <button
                onClick={()=>{
                    handle_AddToCart(item.id,JSON.stringify(quantity))
                }}
                // form is not needed.
                disabled={loading}
                type="submit"
                className="
                text-black
                w-full min-h-[10mm] 
                px-2
                bg-slate-300 rounded-md ">

                {loading 
                ?"Adding to cart..."
                :<>ADD TO <b className="font-bold">CART</b></>
                }
            </button>
        </div>
    )

}  


export const Cart_Success = ({quantity,item_name}:{quantity:number,item_name:string}) => {

    return (
        <CasualSpan>
            <div className="bg-blue-200 py-5">
                Successfully updated cart.
                You now have {quantity} of {item_name}. 
            </div>
        </CasualSpan>
    )
}

export const Cart_Failure = ({error}:{error:string}) => {

    return (
        <CasualSpan>
            <div className="bg-red-200 py-5">
                Failed: {error}
            </div>
        </CasualSpan>
        
    )
}

const CasualSpan = ({children}:{children:ReactNode}) => (


        <div className="
            z-10
            bottom-0 left-0 
            absolute w-fit
            xs:fixed xs:w-[100vw]
            text-black
            disappear"> 
            {children}
        </div>

)