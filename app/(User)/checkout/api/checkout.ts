import { revalidateTag } from "next/cache";
import { deleteCookie, setCookie } from "../../(lib)/api/cookies";
import { createCart } from "../../(lib)/api/cart";
import { redirect } from "next/navigation";

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

export const captureOrder = async(checkout_token_id:string
    // ,body:{}
    ) =>{
    const url = new URL(
        `https://api.chec.io/v1/checkouts/${checkout_token_id}`
    );
    
    const headers = {
        "X-Authorization": `${process.env.NEXT_PUBLIC_CHEC_PUBLIC_API_KEY}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*" 
    };

    const body={
        customer:{
            email:"hello2312312@gmail.com"
        },
        shipping:{
            name:"House",
            street:"Cool street 442",
            town_city:"Athens",
            country:"GR",
        },
        payment:{
            gateway:"test_gateway",
            card:{
                number:"4242 4242 4242 4242",
                expiry_month:12,
                expiry_year:2027,
                cvc:444,
                postal_zip_code:10444
            }
        },
    }

    

    
    const res= await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body)
    });

    (async()=>{
        "use server"
        await setCookie("cart_id","");
        revalidateTag('cart');
        redirect('/') //order success page
    })()

    

    // if (!res.ok) {
    //     throw ` ${res.status}:  ${res.statusText}, ${res.url}, ${JSON.stringify(res.error.errors)} `;
    // }
    
    // else
    
  
 
 
    return res.json();
}