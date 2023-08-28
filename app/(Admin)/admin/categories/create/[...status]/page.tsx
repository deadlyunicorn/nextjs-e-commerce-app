import {   fetchItemsADMIN, updateItem } from "@/app/(Admin)/api/items";
import Link from "next/link";
import { FailureMessage, SuccessMessage } from "@/app/(Shared)/components/UserAlert";
import { CreateCategoryForm } from "./CreateCategoryForm";



const CategoryCreation = async({params,searchParams}:{params:{status:string},searchParams:{error:string,message:string}}) => {



    const status = params.status;

    return (
        <main className="
            w-full
            overflow-x-hidden
            flex flex-col items-center 
            justify-start relative
            ">

            <div className="
            xs:w-3/4 w-full
            min-h-[60vh]
            flex flex-col items-center 
            justify-start">



            <h1 className="text-2xl my-2">Create new category</h1>

            {status=="success" && 
            <SuccessMessage message={searchParams.message}/>}

            {status=="fail" && 
            <FailureMessage error={searchParams.error}/>}


            <div className="
            bg-slate-200 py-4 rounded-md
            dark:bg-slate-800
            w-full
            flex flex-col items-center 
            justify-start">


            
                <CreateCategoryForm/>
                
            </div>

            <Link
                    className="hover:underline"
                    href="/admin/categories">
                    Back to Categories
            </Link>

            </div>


        </main>

    )
}


export default CategoryCreation;