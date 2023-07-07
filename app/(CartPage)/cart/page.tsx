import { getCart } from "@/app/(lib)/api/cart";
import { Cart } from "@chec/commerce.js/types/cart";
import Checkout from "./Checkout";
import CartItem from "./Item";

const CartPage = async() => {

    const cart:Cart|undefined = await getCart();

    const items = cart?.line_items;

    
    return(
        <main className="
            pt-2
            flex flex-col
            justify-between
            bg-white rounded-md
            w-full">

            <div className="
                flex flex-col 
                gap-y-2 ">
                {
                items
                ?items.map((item)=>(
                        <CartItem key={item.id} item={item}/>
                ))
                :"No items found"
                }
            </div>

            <div className="mt-2 flex flex-col ">
                <div className="bg-slate-200 flex flex-col px-2">
                    <span className="uppercase text-right">
                        Cart Total: 
                        <span 
                            className="bg-slate-400 px-1 rounded-md">
                            {cart.subtotal.formatted_with_symbol}
                        </span>
                    </span>
                    <div className="py-2">
                        <Checkout url={cart.hosted_checkout_url}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default CartPage;

