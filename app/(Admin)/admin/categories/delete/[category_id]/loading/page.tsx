import LoadingScreen from "@/app/(User)/loader/page";
import { redirect } from "next/navigation";
import { CoolInput } from "@/app/(Shared)/components/CoolInput";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { deleteCategory } from "@/app/(Admin)/api/categories";

const FormLoader = async({params}:{params:{category_id:string}}) => {

    const category_id = params.category_id;
    const session =  await getServerSession();


    return (
        <main className="
        w-full
        flex flex-col items-center 
        justify-start
        text-center
        overflow-x-hidden

        ">

            <div className="
            xs:w-3/4 w-full
            min-h-[60vh]
            flex flex-col items-center 
            justify-start">


            <h1 className="text-2xl my-2 pb-4 text-center">
                
            You are about to delete &apos;{category_id}&apos;. 
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
                    placeholder="Enter the category id"
                    title="Please type in exactly the product id."
                    name="category_id"
                    required
                    pattern={category_id} //type product id
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
        <div className="w-full flex justify-center">

            <Link
                        className="hover:underline"
                        href="/admin/categories">
                        Back to Categories
            </Link>
        </div>

        </div>

        </main>
    )


}

const handleSubmit = async(formData:FormData)=>{
    "use server"

    //actually this might not be vulnerable?

    const session =  await getServerSession();
    const email = session?.user?.email;


    let category_id;

    for (const entry of formData.entries()){
        const [key,value] = entry;
        if (key=="category_id"){
            category_id=value
        }
    }

    let success = false;

    try{
        await deleteCategory(String(category_id),email||"")
        success=true;
    }
    catch(error){
        redirect(`/admin/categories/edit/${category_id}/fail?error=${error}`)
    }
    finally{
        // const message=`Successfully deleted ${category_id}.`;
        if (success){
            redirect(`/admin/categories/`)
        }
    }


}

export default FormLoader;