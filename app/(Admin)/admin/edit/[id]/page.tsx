import {   fetchItemsADMIN, updateItem } from "@/app/(User)/(lib)/api/items";
import Link from "next/link";
import Image from "next/image";
import { fetchCategories } from "@/app/(User)/(lib)/api/categories";
import { CoolButton } from "@/app/(Shared)/components/Global";
import { ChangeItem } from "./ChangeItem";



const ItemsList = async({params}:{params:{id:string}}) => {




    const item= [...await fetchItemsADMIN({
        query:params.id,
    })][0];

    const categories = await fetchCategories();

    const update = await updateItem(item.id);




    return (
        <main className="
            w-full
            flex flex-col items-center 
            justify-start
            ">


            {JSON.stringify(update)}

            <div className="
            bg-slate-300 py-4 rounded-md
            dark:bg-slate-800
            w-3/4
            flex flex-col items-center 
            justify-start">

            
                <ChangeItem item={item} categories={categories}/>
                
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