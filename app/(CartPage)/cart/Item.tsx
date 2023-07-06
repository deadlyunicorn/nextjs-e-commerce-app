import Image from "next/image";
import { LineItem } from "@chec/commerce.js/types/line-item";


const CartItem = ({item}:{item:LineItem}) => (
    <div 
        className="
            flex
            items-center justify-between">

            <div 
                className="w-[45%]
                items-center
                flex pl-2">
                    <div className="hidden sm:block">
                        <Image 
                        className="rounded-md"
                        src={item.image?.url || "/image.png"}
                        alt={item.name} 
                        width={50} 
                        height={50}/>
                    </div>
                    <div className="text-center w-full">
                        {item.name}
                    </div>
            </div>
            <div className="w-[45%] flex flex-col max-w-[150px]">
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
                        x
                    </span>    
                    
                    <span>
                        {item.quantity}
                    </span>
                </div>
            </div>
            
    </div>
)

export default CartItem;
