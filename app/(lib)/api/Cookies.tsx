import { cookies } from "next/headers";

export default async function CookiesElement(){

    const cookieStore = cookies();


    const setCookie = async(cart_id:any) =>{
    'use server'


    // cookieStore.set('cart_id',cart_id);
    cookies().set('test_cookie',"123123");
    console.log('success!!!')
    console.log('success!!!')
    console.log('success!!!')

}


    return(
        <div>
            Cookie info:{JSON.stringify(
                cookieStore,
            )}

            <form action={setCookie}>
                <button type="submit">
                    setCookie
                </button>
            </form>
        </div>
    )
}
