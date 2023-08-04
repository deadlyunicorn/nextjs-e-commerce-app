import { ItemUpdateData, updateItem } from "@/app/(Admin)/api/items";
import { CoolButton } from "@/app/(Shared)/components/Global"
import { Category } from "@chec/commerce.js/types/category";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ReactNode } from "react";

export const ChangeItemServer = async({category}:{category:Category}) => {

    const session =  await getServerSession();

    return (
        <form 

            id="categoryForm"
            action={session?`/admin/categories/edit/loading`:"/admin/unauthorized"}
            className="
                    px-2
                    flex flex-col
                    text-lg 
                    gap-y-2">


                <input
                        readOnly
                        className="hidden"
                        value={category.id}
                        required
                        name="category_id"/>
            <div
                className="flex flex-wrap">
                Category Name:&ensp;
                <CoolInput>
                    <input
                        defaultValue={category.name}
                        required
                        minLength={4}
                        maxLength={20}
                        name="name"/>
                </CoolInput>
            </div>
            <div
                className="flex flex-wrap">
                Slug:&ensp;
                <CoolInput>
                    <input
                        defaultValue={category.slug}
                        required
                        pattern="([^ \W \s ]|-)+"
                        title="Slug shouldn't contain any whitespaces. You can use '_' or '-' e.g. 'cool_item'"
                        minLength={4}
                        name="slug"/>
                </CoolInput>
            </div>
            
            <div
                className="flex flex-wrap">
                Description:&ensp;
                <CoolInput>
                    <input
                        defaultValue={category.description}
                        minLength={10}
                        name="description"/>
                </CoolInput>

            </div>
            

            <div 
                className="flex flex-col flex-wrap items-center justify-center">
                
                <CoolButton>
                    <input 
                    defaultValue={"Submit"}
                    type="submit" 
                    className="
                    cursor-pointer
                    w-44 h-10 
                    bg-slate-200 hover:bg-slate-100 rounded-md
                    dark:bg-transparent
                    capitalize"/>
                        {/* {loading?"Loading":"Make Changes"} */}
                </CoolButton>
                <Link 
                    className="
                        bg-red-700 hover:bg-red-500
                        dark:bg-red-800 dark:hover:bg-red-600
                        rounded-md px-2 text-white
                        mt-2"
                    href={`/admin/categories/delete/${category.id}/loading/`}>
                    Delete 
                </Link>
                
                
            </div>
                


        </form>
    )

}

const CoolInput = ({children}:{children:ReactNode}) => (
    <div
    className="
    max-w-[100%]
    text-inherit px-1 rounded-md
    hover:bg-slate-50 bg-slate-200 
    dark:hover:bg-slate-950 dark:bg-slate-900">
        {children}
    </div>
)



