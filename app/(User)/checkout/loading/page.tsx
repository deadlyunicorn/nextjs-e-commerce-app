import { ItemUpdateData, updateItem } from "@/app/(Admin)/api/items";
import LoadingScreen from "@/app/(User)/loader/page";
import { redirect } from "next/navigation";
import { captureOrder } from "../api/checkout";

const FormLoader = async({searchParams}:{searchParams:FormData}) => {

    const res = await handleSubmit(searchParams);

    return (
        <>
            <LoadingScreen/>
            {JSON.stringify(res)}
            
        </>
    )


}

const handleSubmit = async(formData:FormData)=>{
    "use server"


    
    const checkoutData = {
        checkout_token_id:"",
        payment:{
            gateway:"",
            card:{
                number:"",
                expiry_month:1,
                expiry_year:2022,
                postal_zip_code:100000
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
            postal_zip_code:"",
            street:"",
        }

    };
  

    for (const entry of Object.entries(formData)){


        const [key,value]
            :[key:string,value:FormDataEntryValue]
            = entry;


        if (key=="checkout_token_id"){
            checkoutData.checkout_token_id=String(value);
        }

        // else if(key.includes("category.cat")){

        //     data.properties.categories={
                
        //         ...data.properties.categories,
        //         [categoryIndex]:{
                
        //             id:String(key.slice(9))
                
        //         }
                
        //     }

        //     categoryIndex++;
        // }
    }
    let success = false;

    const res = await captureOrder(checkoutData.checkout_token_id)
    console.log(res)
    console.log("HELLO WORLD")
    console.log("HELLO WORLD")
    console.log("HELLO WORLD")


    return res;
    // .then(res=>{
    //     console.log(`Logging`)
    //     console.log(res)});
    // }

    try{
        // await captureOrder(checkoutData.checkout_token_id)
        // .then(res=>{
        //     console.log(`Logging`)
        //     console.log(res)});
        success=true;
      
    }
    catch(error){
        console.log(error)
        // redirect(`/admin/items/edit/${data.product_id}/fail?error=${error}`)
    }
    finally{
        const message=`Order placed successfully.`;
        if (success){
            // redirect(`/admin/items/edit/${data.product_id}/success?message=${message}`)
        }
    }

}

export default FormLoader;