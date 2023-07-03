'use server'


import { cookies } from "next/headers";
import { NewForm } from "./test";

export default async function CookiesElement() {





    const cookieStore = getCookies();

    // const cart = await getCart();
    // console.log(cart.id);
    // await setCookie('very_cool')

    return (
        <div className="text-green-500">
            Cookie info:{
                cookieStore ?
                    JSON.stringify(cookieStore) //["cookie"]
                    : "loading"
            }

            <NewForm />
        </div>
    )
}

export const setCookie = async (cart_id: string) => {
    'use server'
    // cookieStore.set('cart_id',cart_id);
    cookies().set(
    { 
        name:'cart_id',
        value: cart_id,
        maxAge: 60 * 60 * 24 * 30,
        path: "/" 
    });

}

export const getCookies = () => {
    //Not async but requires await?!?! idk
    //Don't mark it as async however...
    return cookies().getAll();
}

export const getCartCookie = () => {
    return cookies().get('cart_id')?.value;
};

export const deleteCookie = async (cookie_name: string) => {
    'use server'
    cookies().set({
        name: cookie_name,
        value: "",
        maxAge: 0,
        path: "/"
    })
}