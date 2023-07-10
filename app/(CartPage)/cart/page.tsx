import { getCart } from "@/app/(lib)/api/cart";
import { Cart } from "@chec/commerce.js/types/cart";
import Checkout from "./Checkout";
import CartItem from "./Item";
import { getCartCookie } from "@/app/(lib)/api/cookies";

const CartPage = async() => {

    const cart:Cart|undefined = await getCart();
    const cart_id=await getCartCookie();


    const items = cart?.line_items;

    

    return(
        <main className="
            pt-2
            flex flex-col
            justify-between
            bg-white rounded-md
            dark:bg-black dark:bg-opacity-20
            w-full">

            <div className="
                relative
                flex flex-col 
                gap-y-2 ">
                
                {cart_id
                ?(
                    items
                    ?items.map((item)=>(
                            <CartItem key={item.id} item={item} cart_id={cart_id}/>
                    ))
                    :"No items found"
                )
                :<>Error no cart found, try refresing the page.. <br/> You might also need to enable cookies for this website..</>

                }
            </div>

            <div className="
                pt-2 
                flex flex-col 
                bg-slate-200 
                dark:bg-black dark:bg-opacity-20
                min-h-[80px]">
                {cart
                
                ?<div className="flex flex-col px-2">
               
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
                :<>Error no cart found, try refresing the page.. <br/> You might also need to enable cookies for this website..</>
                }
            </div>
        </main>
            
    )
}

export default CartPage;

