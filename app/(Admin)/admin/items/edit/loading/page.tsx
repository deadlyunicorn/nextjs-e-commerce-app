import { ItemUpdateData, updateItem } from "@/app/(Admin)/api/items";
import LoadingScreen from "@/app/(User)/loader/page";
import { redirect } from "next/navigation";
import { formDataProccessor } from "../../create/loading/page";
import { setAsset } from "@/app/(Admin)/api/assets";
import { getServerSession } from "next-auth";

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
    
    const data = formDataProccessor(formData);

    let success = false;

    try{
        await updateItem(data.product_id,data.properties,email);
        success=true;
        if (data.assetID){
            await setAsset(data.product_id,data.assetID,email);
        }
      
    }
    catch(error){
        redirect(`/admin/items/edit/${data.product_id}/fail?error=${error}`)
    }
    finally{
        const message=`Successfully updated ${data.properties.product.name}.`;
        if (success){
            redirect(`/admin/items/edit/${data.product_id}/success?message=${message}`)
        }
    }

}

export default FormLoader;