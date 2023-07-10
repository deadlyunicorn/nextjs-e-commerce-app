import { Cart } from "@chec/commerce.js/types/cart";
import { getCart } from "../../api/cart";
import Link from "next/link";
import Image from "next/image";

const CartComponent = async () => {

    const cart:Cart|undefined = await getCart();

    return (
        <>
            <div>
                <Link href="/cart" className="group">
                    <figure className="flex items-center gap-x-1">
                        
                        <svg 
                            viewBox="0 0 18 18"
                            className="
                            fill-none 
                            stroke-slate-900 group-hover:stroke-slate-600
                            dark:stroke-slate-300 dark:group-hover:stroke-slate-50 
                            w-8 h-8
                            aspect-square ">

                            <path
                                d="M 5.551206,9.9204978 5.6146856,3.6976653 11.551206,0.92049781 11.407884,9.3296041"/>
                            <path
                                d="M 1.551206,9.9204978 3.6374886,15.611381 H 13.168462 L 15.551206,8.9204978 Z"/>
                    
                        </svg>
                        
                        <figcaption className="
                        text-slate-900 group-hover:text-slate-600
                        dark:text-slate-300 dark:group-hover:text-slate-50
                        ">
                            {cart?.total_items||0} item(s)
                        </figcaption>
                    </figure>



                </Link>

                {/* Added: show 0 when cart hasn't loaded yet */}
            </div>
        </>
    )
}





export default CartComponent;