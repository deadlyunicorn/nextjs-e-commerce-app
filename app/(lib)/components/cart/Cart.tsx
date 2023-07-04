import { Cart } from "@chec/commerce.js/types/cart";
import { getCart } from "../../api/cart";


const CartComponent = async () => {

    const cart:Cart = await getCart();

    return (
        <>
            <div className="text-white">
                You have {cart.total_items} items in cart.
            </div>
        </>
    )
}





export default CartComponent;