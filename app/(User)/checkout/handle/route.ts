import { NextResponse } from "next/server"
import { captureOrder } from "../api/checkout";

export async function POST(res: NextResponse) {

    const data: FormData = await res.formData();


    let cart_id;

    const checkoutData = {
        checkout_token_id:"",
        body:{
            payment:{
                gateway:"",
                card:{
                    number:0,
                    expiry_month:0,
                    expiry_year:0,
                    postal_zip_code:0
                }
            },
            customer:{
                email:"",
                firstname:"",
                lastname:"",
            },
            shipping:{
                name:"Receive Address",
                country:"",
                town_city:"",
                street:"",
            }
        }

    };
  

    for (const entry of data.entries()){

        const [key,value]
            :[key:string,value:FormDataEntryValue]
            = entry;


        if (key=="checkout_token_id"){
            checkoutData.checkout_token_id=String(value);
        }
        else if (key=="cart_id"){
            cart_id=String(value);
        }
        else if (key=="gateway"){
            checkoutData.body.payment.gateway=String(value);
        }
        else if (key.includes("card_")){
            const tempKey = key.slice("card_".length); 
            // @ts-ignore
            checkoutData.body.payment.card[tempKey] = +value;
        }
        else if (key.includes("customer_")){
            const tempKey = key.slice("customer_".length); 
            //@ts-ignore
            checkoutData.body.customer[tempKey] = String(value);
        
        }
        else if (key.includes("shipping_")){
            const tempKey = key.slice("shipping_".length); 
            //@ts-ignore
            checkoutData.body.shipping[tempKey] = String(value);
        }
     
    }

    const req=await captureOrder(checkoutData);
    try{
        if(JSON.stringify(req).includes("error")){
            console.log(req.error.message);
            if(JSON.stringify(req).includes("errors")){
                console.log(JSON.stringify(req.error.errors))
            }
        }
        else{}
    }
    finally{

    }

    return NextResponse.json(req);
}
