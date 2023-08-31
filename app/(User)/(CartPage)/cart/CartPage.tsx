import { getCart } from "@/app/(User)/(lib)/api/cart";
import { Cart } from "@chec/commerce.js/types/cart";
import Checkout from "./Checkout";
import CartItem from "./Item";
import { getCartCookie } from "@/app/(User)/(lib)/api/cookies";

export const CartPage = async() => {

    const cart:Cart|undefined = await getCart();
    const cart_id=await getCartCookie();


    const items = cart?.line_items;

    

    return(
        <main className="
            pt-2
            flex flex-col
            justify-between
            bg-slate-50 rounded-md
            dark:bg-slate-900
            w-full">

            <div className="
              overflow-y-auto
              h-[50vh]
              py-2
                relative
                flex flex-col 
                gap-y-4 ">
                
                {cart_id
                ?(
                    (items&&items.length>0)
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
                            className="
                                dark:bg-black dark:bg-opacity-30
                                bg-slate-100 
                                px-1 rounded-md">
                            {cart.subtotal.formatted_with_symbol}
                        </span>
                    </span>
                    <div className="py-2">
                        {cart.total_items>0 
                        ?<Checkout url={`/checkout/${cart.id}`}/>
                        :"You cart is empty"}
                        
                    </div>
                </div>
                :<>Error no cart found, try refresing the page.. <br/> You might also need to enable cookies for this website..</>
                }
            </div>
        </main>
            
    )
}

export default CartPage;

