import { redirect } from "next/navigation";
import { getCartCookie } from "../(lib)/api/cookies"
import LoadingScreen from "../loader/page";


const RedirectToCart = async() => {

    const cart_id = await getCartCookie();
    cart_id?redirect(`/checkout/${cart_id}`):redirect('/');

    return (
        <>
            <LoadingScreen/>
        </>
    )
}

export default RedirectToCart;