import { CategoryPOST, createCategory } from "@/app/(Admin)/api/categories";
import { ItemUpdateData, createItem, updateItem } from "@/app/(Admin)/api/items";
import LoadingScreen from "@/app/(User)/loader/page";
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


    
    const data:CategoryPOST = {
        slug:"",
        name:"",
        description:"",
    };


    for (const entry of Object.entries(formData)){


        const [key,value]
            :[key:string,value:FormDataEntryValue]
            = entry;

        //@ts-ignore
        data[key]=String(value)
    }

    let success = false;
    let category_id;

    try{
        await createCategory(data)
        .then(res=>{
            category_id=res.id
        })
        success=true;
        
    }
    catch(error){
        redirect(`/admin/categories/create/fail?error=${error}`)
    }
    finally{
        const message=`Successfully created ${category_id}.`;
        if (success){
            redirect(`/admin/categories/edit/${category_id}/success?message=${message}`)
        }
    }

}

export default FormLoader;