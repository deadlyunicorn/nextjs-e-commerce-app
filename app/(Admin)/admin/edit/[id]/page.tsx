import {   fetchItemsADMIN, updateItem } from "@/app/(Admin)/api/items";
import Link from "next/link";
import { fetchCategories } from "@/app/(User)/(lib)/api/categories";
import { ChangeItemServer } from "./ChangeItemServer";



const ItemsList = async({params}:{params:{id:string}}) => {




    const item= [...await fetchItemsADMIN({
        query:params.id,
    })][0];

    const categories = await fetchCategories();

    return (
        <main className="
            w-full
            flex flex-col items-center 
            justify-start
            ">


            <div className="
            bg-slate-300 py-4 rounded-md
            dark:bg-slate-800
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