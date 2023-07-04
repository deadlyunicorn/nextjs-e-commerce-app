import { Cart } from "@chec/commerce.js/types/cart";
import { getCart } from "../../api/cart";


const CartComponent = async () => {

    const cart:Cart = await getCart();

    return (
        <>
            <div className="text-white">
                You have {cart.total_items||0} items in cart.
                {/* Added: show 0 when cart hasn't loaded yet */}
            </div>
        </>
    )
}





export default CartComponent;