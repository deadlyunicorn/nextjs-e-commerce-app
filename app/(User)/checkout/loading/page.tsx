import { ItemUpdateData, updateItem } from "@/app/(Admin)/api/items";
import LoadingScreen from "@/app/(User)/loader/page";
import { redirect } from "next/navigation";
import { captureOrder } from "../api/checkout";

const FormLoader = async({searchParams}:{searchParams:FormData}) => {

    const res = await handleSubmit(searchParams);

    return (
        <>
            {JSON.stringify(res)}
            <LoadingScreen/>
            
        </>
    )


}

const handleSubmit = async(formData:FormData)=>{
    "use server"


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
  

    for (const entry of Object.entries(formData)){


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
    let success = false;

    return checkoutData;


    // redirect('./success')
/*
    try{
        // await captureOrder(checkoutData);
        success=true;
    }
    catch(error){
        redirect(`/checkout/${cart_id}/fail?error=${error}`)
    }
    finally{
        const message=`Order placed successfully.`;
        if (success){
            // redirect(`/admin/items/edit/${data.product_id}/success?message=${message}`)
        }
    }
    */

}

export default FormLoader;