import { Cart } from "@chec/commerce.js/types/cart";
import { getCart } from "../../api/cart";
import Link from "next/link";


const CartComponent = async () => {

    const cart:Cart|undefined = await getCart();

    return (
        <>
            <div className="text-white">
                <Link href="/cart">
                    You have {cart?.total_items||0} items in cart.
                </Link>
                {/* Added: show 0 when cart hasn't loaded yet */}
            </div>
        </>
    )
}





export default CartComponent;