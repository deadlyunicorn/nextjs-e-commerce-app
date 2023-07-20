import { ItemUpdateData, createItem, deleteItem, updateItem } from "@/app/(Admin)/api/items";
import LoadingScreen from "@/app/(User)/loader/page";
import { redirect } from "next/navigation";
import { CoolInput } from "../../../create/[...status]/CreateItemForm";

const FormLoader = async({params}:{params:{product_id:string}}) => {

    const product_id = params.product_id;

    return (
        <>
        <div className="
        bg-slate-300 py-4 rounded-md
        dark:bg-slate-800
        w-full
        xs:w-3/4
        flex flex-col items-center 
        justify-start">

            <p className="my-4 pb-4 text-center">
                You are about to delete {product_id}. 
                <br/>Procceed with caution.
            </p>

            <form
                className="flex flex-col justify-center"
                action={handleSubmit}>
                <CoolInput>

                <input
                    placeholder="Product id"
                    title="Please type in exactly the product id."
                    name="product_id"
                    required
                    pattern={product_id} //type product id
                    />
                </CoolInput>
                <input
                    className="
                    cursor-pointer
                    bg-red-700 hover:bg-red-500
                    dark:bg-red-800 dark:hover:bg-red-600
                    rounded-md px-2 text-white
                    mt-2"
                    value={"PERMANENTLY DELETE"}
                    type="submit"
                    />
            </form>
            <LoadingScreen/>
        </div>

        </>
    )


}

const handleSubmit = async(formData:FormData)=>{
    "use server"

    let product_id;

    for (const entry of formData.entries()){
        const [key,value] = entry;
        if (key=="product_id"){
            product_id=value
        }
    }

    console.log(product_id)
    let success = false;

    try{
        await deleteItem(String(product_id))
        success=true;
    }
    catch(error){
        redirect(`/admin/items/edit/${product_id}/fail?error=${error}`)
    }
    finally{
        // const message=`Successfully deleted ${product_id}.`;
        if (success){
            redirect(`/admin/items/1/default`)
        }
    }

}

export default FormLoader;