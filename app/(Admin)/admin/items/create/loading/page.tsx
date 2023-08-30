import { setAsset } from "@/app/(Admin)/api/assets";
import { ItemUpdateData, createItem, updateItem } from "@/app/(Admin)/api/items";
import LoadingScreen from "@/app/(User)/loader/page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const FormLoader = async({searchParams}:{searchParams:FormData}) => {

    await handleSubmit(searchParams);

    return (
        <>
            <LoadingScreen/>
        </>
    )


}

const handleSubmit = async(formData:FormData)=>{
    "use server"

    const session =  await getServerSession();
    const email = session?.user?.email||"";
        
    const data:ItemUpdateData = formDataProccessor(formData);
    
    

    let success = false;

    try{
        await createItem(data.properties,email)
        .then(res=>{
            data.product_id=res.id
        })
        success=true;
        if (data.assetID){
            await setAsset(data.product_id,data.assetID,email);
        }
        
    }
    catch(error){
        redirect(`/admin/items/create/fail?error=${error}`)
    }
    finally{
        const message=`Successfully created ${data.properties.product.name}.`;
        if (success){
            redirect(`/admin/items/edit/${data.product_id}/success?message=${message}`)
        }
    }

}

export default FormLoader;


export const formDataProccessor = (formData:FormData) => {
    const data:ItemUpdateData = {
        product_id:"",
        assetID:undefined,
        properties:{
            product:{
                name:"",
                permalink:"",
                active:false,
                sku:null,
                description:"",
                price:0,
                inventory:{
                    managed:false,
                    available:0,
                }
            },
            categories:{}
        }

    };

    let categoryIndex=0;

    const BooleanFields = ["managed","active"] as const;
    const NumberFields = ["price","available"] as const;
    const StringFields = ["description","permalink","product_id","name","sku"] as const;
    // const NotCategoryKey = [...BooleanFields,...NumberFields,...StringFields];


    for (const entry of Object.entries(formData)){


        const [key,value]
            :[key:string,value:FormDataEntryValue]
            = entry;


        if (key=="product_id"){
            data.product_id=String(value);
        }
        else if (key == "assetID"){
            data.assetID = String(value);
        }

        else if(key.includes("category.cat")){

            data.properties.categories={
                
                ...data.properties.categories,
                [categoryIndex]:{
                
                    id:String(key.slice(9))
                
                }
                
            }

            categoryIndex++;
        }

        else{
            
            // @ts-ignore 
            if ( BooleanFields.includes(key) ){

                const fixedValue = value=="on"?true:value;
                
                
                if ( key == "managed" ) {
                    data.properties.product.inventory.managed = Boolean(fixedValue);
                }
                else{
                    
                    // @ts-ignore 
                    data.properties.product[key]=Boolean(fixedValue)
                } 
    
            }
            
            // @ts-ignore 
            else if ( NumberFields.includes(key) ){

                if ( key == "available") { 
                    data.properties.product.inventory.available = +value;
                }
                else{
                    
                    // @ts-ignore 
                    data.properties.product[key]=+value
                } 
            }
            
            // @ts-ignore 
            else if(StringFields.includes(key)){
                
                // @ts-ignore 
                data.properties.product[key]=String(value)
            }
        }
    }

    return data;
}