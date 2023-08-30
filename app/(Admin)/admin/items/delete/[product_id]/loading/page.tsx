import { ItemUpdateData, createItem, deleteItem, updateItem } from "@/app/(Admin)/api/items";
import LoadingScreen from "@/app/(User)/loader/page";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { CoolInput } from "@/app/(Shared)/components/CoolInput";

const FormLoader = async({params}:{params:{product_id:string}}) => {

    const product_id = params.product_id;
    const session =  await getServerSession();


    return (
        <main>

            <h1 className="text-2xl my-2 pb-4 text-center">
                
            You are about to delete {product_id}. 
                <p className="text-lg">Procceed with caution.</p>
            </h1>



        <div className="
        w-full
        bg-slate-200 py-4 rounded-md
        dark:bg-slate-800
        flex flex-col items-center 
        justify-around">



            <form
                className="flex flex-col justify-center mt-4"
                action={session?handleSubmit:"/admin/unauthorized"}>
                <CoolInput>

                <input
                    className="placeholder:text-center"
                    placeholder="Enter the product id"
                    title="Please type in exactly the product id."
                    name="product_id"
                    required
                    pattern={product_id} //type product id
                    />
                </CoolInput>
                <input
                    className="
                    cursor-pointer
                    bg-red-600 hover:bg-red-500
                    dark:bg-red-800 dark:hover:bg-red-600
                    rounded-md px-2 text-white
                    mt-2"
                    value={"PERMANENTLY DELETE"}
                    type="submit"
                    />
            </form>
            <LoadingScreen/>

        </div>
        <Link
                    className="hover:underline"
                    href="/admin">
                    Back to Dashboard
        </Link>

        </main>
    )


}

const handleSubmit = async(formData:FormData)=>{
    "use server"

    const session =  await getServerSession();
    const email = session?.user?.email||"";

    let product_id;

    for (const entry of formData.entries()){
        const [key,value] = entry;
        if (key=="product_id"){
            product_id=value
        }
    }

    let success = false;

    try{
        await deleteItem(String(product_id),email)
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