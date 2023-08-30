import { CategoryPUT, editCategory } from "@/app/(Admin)/api/categories";
import { ItemUpdateData, updateItem } from "@/app/(Admin)/api/items";
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
    const email = session?.user?.email;
    
    const data:CategoryPUT = {
        category_id:"",
        properties:{
                name:"",
                slug:"",
                description:"",
        },

    };

    for (const entry of Object.entries(formData)){



        const [key,value]
            :[key:string,value:FormDataEntryValue]
            = entry;

        //@ts-ignore
        if (key=="category_id"){
            data.category_id=String(value);
        }
        else{
            //@ts-ignore
            data.properties[key]=String(value);
        }
    }

    let success = false;
    let category_id;

    try{
        await editCategory(data,email||"")
        .then(res=>{
            category_id=res.id
        })
        success=true;
        
    }
    catch(error){
        redirect(`/admin/categories/create/fail?error=${error}`)
    }
    finally{
        const message=`Successfully updated ${category_id}.`;
        if (success){
            redirect(`/admin/categories/edit/${category_id}/success?message=${message}`)
        }
    }

}

export default FormLoader;