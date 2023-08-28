import {   fetchItemsADMIN, updateItem } from "@/app/(Admin)/api/items";
import Link from "next/link";
import { fetchCategories } from "@/app/(User)/(lib)/api/categories";
import { ChangeItemServer } from "./ChangeItemServer";
import { Cart_Failure, Cart_Success } from "@/app/(User)/(lib)/components/cart/add_Cart";
import { redirect } from "next/navigation";
import { FailureMessage, SuccessMessage } from "@/app/(Shared)/components/UserAlert";
import { fetchCategoriesADMIN } from "@/app/(Admin)/api/categories";



const ItemsList = async({params,searchParams}:{params:{id:string},searchParams:{error:string,message:string}}) => {



    const id = params.id[0];
    const status = params.id[1];

    let item;

    try{
        item=[...await fetchItemsADMIN({
            query:id,
        })][0];
    }
    catch(error){
        redirect('/admin/items/1/default')        
    }


    const categories = await fetchCategoriesADMIN();

    return (
        <main className="
            w-full
            overflow-x-hidden
            flex flex-col items-center 
            justify-start relative
            ">

            <h1 className="text-2xl my-2">Edit {item.name}</h1>



            {status=="success" && 
            <SuccessMessage message={searchParams.message}/>}

            {status=="fail" && 
            <FailureMessage error={searchParams.error}/>}


            <div className="
            bg-slate-200 py-4 rounded-md
            dark:bg-slate-800
            w-full
            xs:w-3/4
            flex flex-col items-center 
            justify-start">

            
                <ChangeItemServer item={item} categories={categories}/>
                
            </div>

            <Link
                    className="hover:underline"
                    href="/admin">
                    Back to Dashboard
            </Link>

        </main>

    )
}


export default ItemsList;