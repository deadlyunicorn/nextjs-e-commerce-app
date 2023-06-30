import { cookies } from "next/headers";
import { getCart } from "./Cart";

export default async function CookiesElement(){

    const cookieStore:any = cookies();


    const setCookie = async(form:any) =>{
    'use server'


    // cookieStore.set('cart_id',cart_id);
    cookies().set('cool_cookie',`${form.get('cookieName')}`);

}

    const getFormData = async(form:any) => {
        'use server'
        console.log(form.get('cookieName'));
    }
    const cart = await getCart();
    console.log(cart.id);

    return(
    <div className="text-green-500">
        Cookie info:{
            cookieStore["_headers"]["headers"]?
            cookieStore["_headers"]["headers"]["cookie"]
            :"loading"
        }

        <form action={setCookie}>
            <button type="submit">
                setCookie
            </button>
            <input name="cookieName" value={cart.id}>
            </input>
        </form>
    </div>
)
}
