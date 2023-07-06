'use client'

import { ReactNode, useEffect, useState, useTransition } from "react";
import { addCart } from "../../api/cart";
import { useRouter } from "next/navigation";
import "@/app/(lib)/styles/animations.scss"

export const AddToCart = ({ price, item_id }: { price: number,item_id : string }) => {

    const [pending, startTransition] = useTransition();
    //Used for loading when submitting. I tried using useFormStatus() instead ? It didn't work tho. 
    const [quantity, setQuantity] = useState(1);
    const arr10 = [...Array(10).keys()];
    
    const router = useRouter();
    //used to refresh the page after adding to cart.
    const [success,setSuccess] = useState(false);
    const [failure,setFailure] = useState(false);
    const [error,setError] = useState (' ');





    const handle_Change = (event: React.FormEvent<HTMLSelectElement>) => {

        const quantity = Number(event.currentTarget.value);
        if (quantity < 11) {
            if (quantity == 0) {
                setQuantity(1);
            }
            else {
                setQuantity(quantity);
            }
        }
    }

    const handle_CartButton = (item_id:string,quantity:string) => {
                    startTransition(async()=>{
                        //For the loading effect
                        try{
                            await addCart(item_id, quantity);
                            router.refresh();
                            setSuccess(true);
                            setQuantity(1);
                            setTimeout(()=>{
                                setSuccess(false);
                            },5000)
                        }
                        catch(error){
                            router.refresh();
                            setError(JSON.stringify(error));
                            setFailure(true);
                            setQuantity(1);
                            setTimeout(()=>{
                                setFailure(false);
                            },5000)
                        }
                        
                    })
                    
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

        <>
            {success&&
            <Cart_Success/>}

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
                onClick={async()=>{
                    await handle_CartButton(item_id,JSON.stringify(quantity))
                }}
                // form is not needed.
                disabled={pending}
                type="submit"
                className="
                text-black
                w-full min-h-[10mm] 
                px-2
                bg-slate-300 rounded-md ">

                {pending 
                ?"Adding to cart..."
                :<>ADD TO <b className="font-bold">CART</b></>
                }
            </button>
        </>
    )

}  


const Cart_Success = () => {

    return (
        <CasualSpan>
            <div className="bg-blue-200">
                Successfully added to cart
            </div>
        </CasualSpan>
    )
}

const Cart_Failure = ({error}:{error:string}) => {

    return (
        <CasualSpan>
            <div className="bg-red-200">
                Failed: {error}
            </div>
        </CasualSpan>
        
    )
}

const CasualSpan = ({children}:{children:ReactNode}) => (

    <div className="relative">
        <div className="
            absolute w-full
            -translate-y-20
            text-black
            disappear"> 
            {children}
        </div>
    </div>
)