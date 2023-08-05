import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";

export const getCheckoutToken = async(cart_id:string)=>{

    const url = new URL(
        `https://api.chec.io/v1/checkouts/${cart_id}`
    );

    const params = {
        "type": "cart",
    };

    Object.keys(params)
        //@ts-ignore
        .forEach(key => url.searchParams.append(key, params[key]));

    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
    };

    const res:Response=await fetch(url, {
        method: "GET",
        headers: headers,
    })
    if (!res.ok) {
       throw ` ${res.status}:  ${res.statusText}, ${res.url} `;
    }


    return res.json();


}