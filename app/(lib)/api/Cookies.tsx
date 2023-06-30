import { cookies } from "next/headers";
import { getCart } from "./Cart";

export default async function CookiesElement(){

    const cookieStore = cookies();


    const setCookie = async(cart_id:any) =>{
    'use server'


    // cookieStore.set('cart_id',cart_id);
    cookies().set('test_cookie',`${JSON.stringify(cart_id)}`);

}
const cart = await getCart();
console.log(cart.id);

    return(
        <div>
            Cookie info:{JSON.stringify(
                cookieStore,
            )}

            <form action={setCookie}>
                <button type="submit" value={cart.id}>
                    setCookie
                </button>
            </form>
        </div>
    )
}
