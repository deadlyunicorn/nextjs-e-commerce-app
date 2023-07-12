import Image from "next/image";
import { LineItem } from "@chec/commerce.js/types/line-item";
import Link from "next/link";
import QuantityBox from "./Quantity";


const CartItem = async({item,cart_id}:{item:LineItem,cart_id:string}) => {


    return (
    <div 
        className="
            grid grid-cols-2
            ">


            <Link href={`/product/${item.permalink}`}

                className="
                rounded-md
                bg-slate-200
                hover:bg-slate-100
                dark:hover:bg-[#020617aa]
                dark:bg-slate-950
                items-center
                flex ml-2">


                    <div className="hidden sm:block">
                        <Image 
                        className="rounded-md aspect-square"
                        src={item.image?.url || "/image.png"}
                        alt={item.name} 
                        width={50} 
                        height={50}/>
                    </div>
                    <div className="text-center w-full">
                        {item.name}
                    </div>
            </Link>

            <div 
                className="
                    justify-self-end
                    flex flex-col 
                    max-w-[150px] ">
                {item.line_total.formatted_with_symbol}
                <div
                    className="
                        flex justify-between
                        text-xs 
                        px-8">
                    <span>
                        {item.price.formatted_with_symbol}
                    </span>
                    <span>
                        /
                    </span>    
                    
                    <span>
                        item
                    </span>
                </div>
            </div>

            <div className="
                    py-1 pr-1">
                <QuantityBox item={item} cart_id={cart_id}/>
            
            </div>
    </div>
    )
 
}

export default CartItem;
