'use client'

import { ReactNode, useEffect, useState, useTransition } from "react";
import { addCart } from "../../api/cart";
import "@/app/(User)/(lib)/styles/animations.scss"
import { Cart } from "@chec/commerce.js/types/cart";
import { LineItem } from "@chec/commerce.js/types/line-item";
import { Product } from "@chec/commerce.js/types/product";

export const AddToCart = ({ price, item, cartItem }: { price: number,item : Product, cartItem: LineItem|undefined }) => {


    //cartItem can be undefined 
    //when the item is not in cart

    const [quantity, setQuantity] = useState(1);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const arr10 = [...Array(item.inventory.managed?(Math.min(item.inventory.available,10)):10).keys()];
    
    //used to refresh the page after adding to cart.

    const [isPending,startTransition] = useTransition();

    const [success,setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);
    const [error,setError] = useState (' ');


   
    



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

    

    const handle_AddToCart = (item_id:string,quantity:string) => {
        

            const requestedCartItems = (cartItem ? cartItem.quantity : 0)+Number(quantity)

            setTotalQuantity(requestedCartItems);

            startTransition(async()=>{

                try{


                    
                    if ( item.inventory.managed && ( requestedCartItems > item.inventory.available ) ){

                        const errorMessage = `There are only ${item.inventory.available} available.${cartItem?.quantity? ` You have ${cartItem.quantity} in cart..`:""}`;
                        throw (errorMessage);
                    
                    }
                    else if( requestedCartItems > 10 ){

                        throw (`Cart capacity for this item reached ${(cartItem ? cartItem.quantity : 0)+Number(quantity)}/10`)
                    
                    }

                    else{
                        
                        setTotalQuantity(requestedCartItems);
                        await addCart(item_id, quantity);

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

                    setTimeout(()=>{
                        setFailure(false);
                    },5000)
        
                }
                
            })

        }
                    

    const QuantityButton = ({ children }: { children: ReactNode }) => {

        const handle_QuantityButton = () => {
            if (children == "+") {

                if (quantity < Math.min(item.inventory.available,10)) {

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
                    bg-slate-800 hover:bg-slate-600
                    hover:text-slate-600
                    dark:bg-slate-300 dark:hover:bg-slate-50 
                    bg-opacity-20 hover:bg-opacity-20
                    dark:text-slate-500 dark:hover:text-slate-400
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
            <Cart_Success 
            inCart={false}
            quantity={totalQuantity} item_name={item.name}/>}

            {failure&&
            <Cart_Failure 
                inCart={false}
                error={error}/>} 

            <div className="
        w-full
        pt-2 px-4
        text-lg
        flex flex-col
        sm:justify-between
        items-center
        justify-center
        gap-x-5">
                

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
                        hover:bg-opacity-[60%]
                        text-black text-center">

                        {arr10.map((item) => (
                            <option key={item}>{item + 1}</option>
                        ))}

                    </select>
                    <QuantityButton>
                        +
                    </QuantityButton>


                </div>

                <span>
                    Quantity
                </span>




            </div>
            <p className="text-right">
                {Math.round(price * quantity*100)/100} €
            </p>


            {/* peer should be before sibling */}
            <button
                onClick={()=>{
                        handle_AddToCart(item.id,JSON.stringify(quantity))
                    
                }}
                // form is not needed.
                disabled={isPending}
                type="submit"
                className="
                w-full min-h-[10mm] 
                px-2
                
                dark:text-slate-200
                dark:hover:text-slate-50
                
                text-slate-800
                hover:text-slate-900
                
                dark:bg-black dark:bg-opacity-30
                dark:hover:bg-slate-600
                hover:bg-slate-50
                bg-slate-300 rounded-b-md ">

                {isPending
                ?"Updating cart..."
                :<>ADD TO <b className="font-bold">CART</b></>
                }
            </button>
        </div>
    )

}  


export const Cart_Success = ({quantity,item_name,inCart}:{quantity:number,item_name:string,inCart:boolean}) => {

    return (
        <CasualSpan>
            <div className={`
                dark:bg-opacity-90
                dark:bg-green-900
                bg-green-600
                text-slate-200
                bg-opacity-90
                px-2

                ${inCart&&`z-40 absolute
                w-[100vw] bottom-0`}

                py-5 
                rounded-md md:rounded-none`}>
                Successfully updated cart.
                You now have {quantity} of {item_name}. 
            </div>
        </CasualSpan>
    )
}

export const Cart_Failure = ({error,inCart}:{error:string,inCart:boolean}) => {

    return (
        <CasualSpan>
            <div className={`
            bg-opacity-90
            dark:bg-opacity-90

            ${inCart&&`z-40 absolute
                w-[100vw] bottom-0`}

            dark:bg-red-900
            bg-red-600 
            
            text-slate-200
            py-5 
            rounded-md md:rounded-none `}>
                Failed: {error}
            </div>
        </CasualSpan>
        
    )
}

const CasualSpan = ({children}:{children:ReactNode}) => (

// On mobile fixed will not work as expected (the component might be behind browser navbar..)
        <div className="
            z-30
            rounded-md
            bottom-0 left-0 
            absolute w-full
            md:fixed md:w-[100vw]
            backdrop-blur-md
            disappear "> 
            {children}
        </div>

)

export const MockAddToCart = ()=>{

        const QuantityButton = ({ children }: { children: ReactNode }) => {
    
            return (
                <button
                    className="
                        w-5
                        rounded-md
                        bg-slate-800 hover:bg-slate-600
                        hover:text-slate-600
                        dark:bg-slate-300 dark:hover:bg-slate-50 
                        bg-opacity-20 hover:bg-opacity-20
                        dark:text-slate-500 dark:hover:text-slate-400
                        text-center
                        font-extrabold
                        ">
    
                    {children}
    
                </button>
            )
    
        }
        return (
    
            <div className="relative">
                <div className="
            pt-2
            text-lg
            flex flex-wrap
            sm:justify-between
            justify-center
            gap-x-5">
                    <span>
                        Quantity:
                    </span>
    
                    <div className="
                    flex gap-x-2">
    
                        <QuantityButton>
                            -
                        </QuantityButton>
    
                        <select
                            className="w-10 
                            rounded-md 
                            bg-white bg-opacity-[50%]
                            hover:bg-opacity-[60%]
                            text-black text-center">
    
    
                        </select>
                        <QuantityButton>
                            +
                        </QuantityButton>
    
    
                    </div>
    
    
    
    
                </div>
                <p className="text-right">
                    XX €
                </p>
    
    
                {/* peer should be before sibling */}
                <button
                    // form is not needed.
                    disabled={true}
                    type="submit"
                    className="
                    w-full min-h-[10mm] 
                    px-2
                    
                    dark:text-slate-200
                    dark:hover:text-slate-50
                    
                    text-slate-900
                    hover:text-slate-600
                    
                    dark:bg-black dark:bg-opacity-30
                    dark:hover:bg-slate-600
                    hover:bg-slate-200
                    bg-slate-300 rounded-b-md ">
    
                    {<>ADD TO <b className="font-bold">CART</b></>
                    }
                </button>
            </div>
        )
    
}  
