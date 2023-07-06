import Image from "next/image";
import { LineItem } from "@chec/commerce.js/types/line-item";
import Link from "next/link";


const CartItem = ({item}:{item:LineItem}) => {

    const quantity = item.quantity;
    let maxQuantity;
    // if (quantity < 10 )
    const mockArray = [...new Array(quantity+5)];

    return(
    <div 
        className="
            grid grid-cols-2
            ">


            <Link href={`product/${item.permalink}`}

                className="
                rounded-md
                hover:bg-opacity-5
                bg-black bg-opacity-10
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

            <div>
                <span>Quantity</span>
                <select>
                    {mockArray.map(
                        option=>
                        <option key={option}>{option}</option>
                    )}    
                </select> 
            </div>
            
    </div>
    )
}

export default CartItem;
