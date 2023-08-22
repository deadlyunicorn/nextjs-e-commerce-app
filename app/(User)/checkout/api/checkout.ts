import { CheckoutToken } from "@chec/commerce.js/types/checkout-token";
import { revalidatePath } from "next/cache";

type checkoutData  = {
    checkout_token_id:string,
    body:{
        payment:{
            gateway:string,
            card:{
                number:number,
                expiry_month:number,
                expiry_year:number,
                postal_zip_code:number
            }
        },
        customer:{
            email:string,
            firstname:string,
            lastname:string,
        },
        shipping:{
            name:string,
            country:string,
            town_city:string,
            street:string,
        }
    }

};

export const generateCheckoutToken = async(cart_id:string)=>{

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

export const getCheckoutToken = async(checkout_token:string):Promise<CheckoutToken>=>{
    const url = new URL(
        `https://api.chec.io/v1/checkouts/tokens/${checkout_token}`
    );
    
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

export const captureOrder = async(checkoutData:checkoutData) =>{
    const url = new URL(
        `https://api.chec.io/v1/checkouts/${checkoutData.checkout_token_id}`
    );
    
    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*" 
    };
    
    const res= await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(checkoutData.body)
    });

    if ( res.ok ){
        revalidatePath('/');
    }
 

    return res.json();
}