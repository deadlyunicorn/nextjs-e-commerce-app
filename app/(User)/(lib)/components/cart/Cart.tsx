import { Cart } from "@chec/commerce.js/types/cart";
import { getCart } from "../../api/cart";



const CartComponent = async () => {

    const cart:Cart|undefined = await getCart();

    return (
        <>
            <div className="group">
                <figure className="flex items-center gap-x-1">
                    
                    <svg 
                        viewBox="0 0 16 16"
                        className="
                        fill-none 
                        stroke-slate-900 group-hover:stroke-slate-600
                        dark:stroke-slate-300 dark:group-hover:stroke-slate-50 
                        w-7 h-7
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
                        <span>{cart?.total_items || '0'}</span>
                        <span className="hidden sm:inline">&nbsp;item(s)</span>
                    </figcaption>
                </figure>



            </div>

        </>
    )
}





export default CartComponent;