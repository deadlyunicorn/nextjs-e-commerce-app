import { Cart } from "@chec/commerce.js/types/cart";
import { getCart } from "../../api/cart";


const CartComponent = async () => {

    const cart:Cart = await getCart();

    return (
        <>
            <div className="text-white">
                Your cart is {JSON.stringify(cart.id)}
            </div>
        </>
    )
}





export default CartComponent;