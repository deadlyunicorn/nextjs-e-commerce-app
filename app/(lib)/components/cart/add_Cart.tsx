'use client'

import { ReactNode, useState, useTransition } from "react";
import { addCart } from "../../api/cart";
import { useRouter } from "next/navigation";

export const AddToCart = ({ price, item_id }: { price: number,item_id : string }) => {

    const [pending, startTransition] = useTransition();
    //Used for loading when submitting. I tried using useFormStatus() instead ? It didn't work tho. 
    const [quantity, setQuantity] = useState(1);
    const arr10 = [...Array(10).keys()];
    
    const router = useRouter();
    //used to refresh the page after adding to cart.




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

    const handle_CartButton = async(item_id:string,quantity:string) => {
                    startTransition(async()=>{
                        //For the loading effect
                        await addCart(item_id, quantity)
                        .then(()=>{router.refresh()})
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
