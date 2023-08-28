import {   fetchItemsADMIN, updateItem } from "@/app/(Admin)/api/items";
import Link from "next/link";
import { fetchCategories } from "@/app/(User)/(lib)/api/categories";
import { EditCategory } from "./ChangeCategoryServer";
import { Cart_Failure, Cart_Success } from "@/app/(User)/(lib)/components/cart/add_Cart";
import { redirect } from "next/navigation";
import { FailureMessage, SuccessMessage } from "@/app/(Shared)/components/UserAlert";
import { fetchCategoriesADMIN } from "@/app/(Admin)/api/categories";
import { Category } from "@chec/commerce.js/types/category";



const CategoryEdit = async({params,searchParams}:{params:{id:string},searchParams:{error:string,message:string}}) => {



    const id = params.id[0];
    const status = params.id[1];

    let category:Category;

    try{
        category=   [...await fetchCategoriesADMIN()]
                        .filter(res=>res.id==id)[0];
        if(!category){
            throw "fetch failed"
        }
    }
    catch(error){
        redirect('/admin/categories/')        
    }

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


            <h1 className="text-2xl my-2">Edit {category.name}</h1>



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

            
                <EditCategory category={category}/>
                
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


export default CategoryEdit;